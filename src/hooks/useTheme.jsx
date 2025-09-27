import { useState, useEffect, useCallback } from "react";

// Constants
const DEFAULT_COLOR = "#010924";
const DEFAULT_THEME = "light";
const LIGHTNESS_THRESHOLD = 20;
const MAX_HISTORY_SIZE = 10;

// Storage keys
const STORAGE_KEYS = {
  THEME: "theme-preference",
  COLOR: "base-color",
  HISTORY: "color-history",
};

// CSS variable names
const CSS_VARIABLES = {
  BASE_COLOR: "--base-color",
  TEXT_COLOR: "--text-color",
  SURFACE_COLOR: "--surface-color",
};

/**
 * Color utility functions
 */
const colorUtils = {
  /**
   * Validates if a string is a valid hex color
   * @param {string} hex - The hex color string to validate
   * @returns {boolean} True if valid hex color
   */
  isValidHex(hex) {
    if (!hex || typeof hex !== "string") return false;
    const cleanHex = hex.replace("#", "");
    return /^[0-9A-Fa-f]{3}$|^[0-9A-Fa-f]{6}$/.test(cleanHex);
  },

  /**
   * Calculates perceived lightness using WCAG relative luminance formula
   * @param {string} hex - The hex color string
   * @returns {number} Lightness value (0-100)
   */
  getLightness(hex) {
    if (!hex || typeof hex !== "string") return 50;

    const cleanHex = hex.replace("#", "").padEnd(6, "0").substring(0, 6);

    if (!/^[0-9A-Fa-f]{6}$/.test(cleanHex)) {
      console.warn(`Invalid hex color: ${hex}, using fallback`);
      return 50;
    }

    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);

    const sRGB = [r, g, b].map((c) => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });

    const luminance = 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
    return luminance * 100;
  },

  /**
   * Converts hex color to RGB object
   * @param {string} hex - The hex color string
   * @returns {Object} RGB object with r, g, b properties
   */
  hexToRgb(hex) {
    const cleanHex = hex.replace("#", "");
    if (cleanHex.length === 3) {
      const [r, g, b] = cleanHex.split("").map((c) => c + c);
      return {
        r: parseInt(r, 16),
        g: parseInt(g, 16),
        b: parseInt(b, 16),
      };
    }
    return {
      r: parseInt(cleanHex.substring(0, 2), 16),
      g: parseInt(cleanHex.substring(2, 4), 16),
      b: parseInt(cleanHex.substring(4, 6), 16),
    };
  },

  /**
   * Converts RGB values to hex string
   * @param {number} r - Red value (0-255)
   * @param {number} g - Green value (0-255)
   * @param {number} b - Blue value (0-255)
   * @returns {string} Hex color string
   */
  rgbToHex(r, g, b) {
    return (
      "#" +
      [r, g, b]
        .map((x) => {
          const hex = Math.round(x).toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        })
        .join("")
    );
  },

  /**
   * Generates complementary color
   * @param {string} hex - The hex color string
   * @returns {string} Complementary hex color
   */
  getComplementary(hex) {
    const rgb = colorUtils.hexToRgb(hex);
    return colorUtils.rgbToHex(255 - rgb.r, 255 - rgb.g, 255 - rgb.b);
  },

  /**
   * Adjusts color brightness
   * @param {string} hex - The hex color string
   * @param {number} percent - Brightness adjustment percentage (-100 to 100)
   * @returns {string} Adjusted hex color
   */
  adjustBrightness(hex, percent) {
    const rgb = colorUtils.hexToRgb(hex);
    const factor = percent > 0 ? (100 - percent) / 100 : (100 + percent) / 100;

    return colorUtils.rgbToHex(
      Math.min(255, Math.max(0, rgb.r + (255 - rgb.r) * (1 - factor))),
      Math.min(255, Math.max(0, rgb.g + (255 - rgb.g) * (1 - factor))),
      Math.min(255, Math.max(0, rgb.b + (255 - rgb.b) * (1 - factor)))
    );
  },
};

/**
 * Local storage utility functions
 */
const storageUtils = {
  /**
   * Gets a value from localStorage with error handling
   * @param {string} key - Storage key
   * @param {*} defaultValue - Default value if key doesn't exist
   * @returns {*} Stored value or default
   */
  get(key, defaultValue = null) {
    try {
      const value = localStorage.getItem(key);
      return value !== null ? value : defaultValue;
    } catch (error) {
      console.warn(`Failed to get ${key} from localStorage:`, error);
      return defaultValue;
    }
  },

  /**
   * Sets a value in localStorage with error handling
   * @param {string} key - Storage key
   * @param {*} value - Value to store
   */
  set(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.warn(`Failed to set ${key} in localStorage:`, error);
    }
  },

  /**
   * Removes a value from localStorage with error handling
   * @param {string} key - Storage key
   */
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn(`Failed to remove ${key} from localStorage:`, error);
    }
  },

  /**
   * Gets parsed JSON from localStorage
   * @param {string} key - Storage key
   * @param {*} defaultValue - Default value if parsing fails
   * @returns {*} Parsed value or default
   */
  getJSON(key, defaultValue = null) {
    try {
      const value = this.get(key);
      return value ? JSON.parse(value) : defaultValue;
    } catch (error) {
      console.warn(`Failed to parse JSON for ${key}:`, error);
      return defaultValue;
    }
  },

  /**
   * Sets JSON value in localStorage
   * @param {string} key - Storage key
   * @param {*} value - Value to stringify and store
   */
  setJSON(key, value) {
    try {
      this.set(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Failed to stringify and set ${key}:`, error);
    }
  },
};

/**
 * CSS variable management utilities
 */
const cssUtils = {
  /**
   * Sets a CSS custom property on document.body
   * @param {string} property - CSS property name
   * @param {string} value - CSS property value
   */
  setProperty(property, value) {
    document.body.style.setProperty(property, value);
  },

  /**
   * Updates all theme-related CSS variables based on color
   * @param {string} color - Base hex color
   */
  updateThemeVariables(color) {
    const lightness = colorUtils.getLightness(color);
    const isLight = lightness > LIGHTNESS_THRESHOLD;

    this.setProperty(CSS_VARIABLES.BASE_COLOR, color);
    this.setProperty(CSS_VARIABLES.TEXT_COLOR, isLight ? "black" : "white");
    
    const surfaceColorFormula = isLight
      ? "oklch(from var(--base-color) calc(l * 0.8) c h)"
      : "oklch(from var(--base-color) calc(l + 0.2) c h)";
    
    this.setProperty(CSS_VARIABLES.SURFACE_COLOR, surfaceColorFormula);
  },

  /**
   * Resets CSS variables to default values
   */
  resetToDefaults() {
    this.setProperty(CSS_VARIABLES.BASE_COLOR, DEFAULT_COLOR);
    this.setProperty(CSS_VARIABLES.TEXT_COLOR, "white");
  },
};

/**
 * Custom hook for theme management
 * @returns {Object} Theme management functions and state
 */
export default function useTheme() {
  const [theme, setTheme] = useState(DEFAULT_THEME);
  const [currentColor, setCurrentColor] = useState(DEFAULT_COLOR);
  const [colorHistory, setColorHistory] = useState([]);

  /**
   * Initialize theme from localStorage on mount
   */
  useEffect(() => {
    const savedTheme = storageUtils.get(STORAGE_KEYS.THEME);
    const savedColor = storageUtils.get(STORAGE_KEYS.COLOR, DEFAULT_COLOR);
    const savedHistory = storageUtils.getJSON(STORAGE_KEYS.HISTORY, []);

    if (savedTheme) {
      setTheme(savedTheme);
    }

    if (savedColor) {
      setCurrentColor(savedColor);
      cssUtils.updateThemeVariables(savedColor);
    }

    if (savedHistory) {
      setColorHistory(savedHistory);
    }
  }, []);

  /**
   * Updates color with validation and history tracking
   * @param {Object|string} input - Input element with value property or hex string
   */
  const updateColor = useCallback((input) => {
    const newColor = typeof input === 'string' ? input : input.value;

    if (!colorUtils.isValidHex(newColor)) {
      console.warn(`Invalid color format: ${newColor}`);
      return;
    }

    // Update state
    setCurrentColor(newColor);

    // Update color history
    setColorHistory((prevHistory) => {
      const newHistory = [
        newColor,
        ...prevHistory.filter((color) => color !== newColor),
      ].slice(0, MAX_HISTORY_SIZE);
      
      storageUtils.setJSON(STORAGE_KEYS.HISTORY, newHistory);
      return newHistory;
    });

    // Persist color
    storageUtils.set(STORAGE_KEYS.COLOR, newColor);

    // Update CSS variables
    cssUtils.updateThemeVariables(newColor);
  }, []);

  /**
   * Updates theme with persistence
   */
  const updateTheme = useCallback((newTheme) => {
    setTheme(newTheme);
    storageUtils.set(STORAGE_KEYS.THEME, newTheme);
  }, []);

  /**
   * Resets theme to default values
   */
  const resetTheme = useCallback(() => {
    setCurrentColor(DEFAULT_COLOR);
    setTheme(DEFAULT_THEME);

    // Clear localStorage
    storageUtils.remove(STORAGE_KEYS.COLOR);
    storageUtils.remove(STORAGE_KEYS.THEME);

    // Reset CSS variables
    cssUtils.resetToDefaults();
  }, []);

  /**
   * Applies a color from history
   * @param {string} color - Hex color from history
   */
  const applyHistoryColor = useCallback((color) => {
    if (colorUtils.isValidHex(color)) {
      updateColor(color);
    }
  }, [updateColor]);

  return {
    // State
    theme,
    currentColor,
    colorHistory,

    // Actions
    setColor: updateColor, // Maintained for backward compatibility
    setTheme: updateTheme,
    resetTheme,
    applyColorFromHistory: applyHistoryColor,

    // Utility functions (exposed for advanced usage)
    getLightnessFromHex: colorUtils.getLightness,
    isValidHexColor: colorUtils.isValidHex,
    rgbToHex: colorUtils.rgbToHex,
    hexToRgb: colorUtils.hexToRgb,
    getComplementaryColor: colorUtils.getComplementary,
    adjustColorBrightness: colorUtils.adjustBrightness,
  };
}

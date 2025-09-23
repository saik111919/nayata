import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Create the Theme Context
const ThemeContext = createContext();

// Theme Provider Component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('system');

  // Function to get system theme preference
  const getSystemTheme = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  // Function to apply theme to document
  const applyTheme = (themeToApply) => {
    const root = document.documentElement;
    if (themeToApply === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  // Function to determine effective theme
  const getEffectiveTheme = (currentTheme) => {
    if (currentTheme === 'system') {
      return getSystemTheme();
    }
    return currentTheme;
  };

  // Load theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      setTheme(savedTheme);
    } else {
      // Default to 'system' if no saved theme or invalid theme
      setTheme('system');
      localStorage.setItem('theme', 'system');
    }
  }, []);

  // Apply theme to document root and save to localStorage
  useEffect(() => {
    const effectiveTheme = getEffectiveTheme(theme);
    applyTheme(effectiveTheme);
    
    // Listen for system theme changes when theme is set to 'system'
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e) => {
      if (theme === 'system') {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    };

    if (theme === 'system') {
      mediaQuery.addEventListener('change', handleSystemThemeChange);
    }

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [theme]);

  // Toggle theme function - cycles through light -> dark -> system
  const toggleTheme = () => {
    const themeOrder = ['light', 'dark', 'system'];
    const currentIndex = themeOrder.indexOf(theme);
    const nextTheme = themeOrder[(currentIndex + 1) % themeOrder.length];
    
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
  };

  const value = {
    theme,
    toggleTheme,
    isDark: getEffectiveTheme(theme) === 'dark',
    isLight: getEffectiveTheme(theme) === 'light',
    isSystem: theme === 'system',
    setTheme: (newTheme) => {
      if (['light', 'dark', 'system'].includes(newTheme)) {
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
      }
    }
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeContext;
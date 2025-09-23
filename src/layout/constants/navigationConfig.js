/**
 * Navigation configuration
 * Centralized configuration for all navigation items
 * Follows separation of concerns by keeping data separate from components
 */

export const NAVIGATION_ITEMS = [
  {
    path: "/",
    label: "Home",
  },
  {
    path: "/about",
    label: "About",
  },
  {
    path: "/contact",
    label: "Contact",
  },
];

export const BRAND_CONFIG = {
  name: "Nayata",
  // Future: Add logo URL, alt text, etc.
};

// Export default for easier importing
export default {
  navigationItems: NAVIGATION_ITEMS,
  brand: BRAND_CONFIG,
};
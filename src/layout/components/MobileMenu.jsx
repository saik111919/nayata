import { useState } from "react";
import PropTypes from "prop-types";
import NavLinkItem from "./NavLinkItem";

/**
 * Mobile navigation menu component with toggle functionality
 * Handles mobile-specific navigation behavior and styling
 */
const MobileMenu = ({ navigationItems }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="md:hidden">
      {/* Mobile menu button */}
      <button
        type="button"
        onClick={toggleMenu}
        className="inline-flex items-center justify-center p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200"
        aria-controls="mobile-menu"
        aria-expanded={isMenuOpen}
        aria-label={isMenuOpen ? "Close main menu" : "Open main menu"}
      >
        <span className="sr-only">
          {isMenuOpen ? "Close main menu" : "Open main menu"}
        </span>
        
        {/* Hamburger icon with animation */}
        <svg
          className={`h-6 w-6 transition-transform duration-200 ${
            isMenuOpen ? "rotate-90" : "rotate-0"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          {isMenuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          )}
        </svg>
      </button>

      {/* Mobile menu panel */}
      <div
        className={`fixed top-16 left-0 right-0 md:hidden transition-all duration-300 ease-in-out z-50 ${
          isMenuOpen
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 -translate-y-2 invisible"
        }`}
        id="mobile-menu"
      >
        <div className="mx-4 px-4 pt-4 pb-4 space-y-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-lg mt-2 border border-slate-200/50 dark:border-slate-700/50 shadow-lg">
          {navigationItems.map((item) => (
            <div key={item.path} onClick={closeMenu}>
              <NavLinkItem
                to={item.path}
                isMobile={true}
              >
                {item.label}
              </NavLinkItem>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

MobileMenu.propTypes = {
  navigationItems: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default MobileMenu;
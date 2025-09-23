import { NavLink } from "react-router";
import PropTypes from "prop-types";

/**
 * Reusable navigation link component that handles active states and styling
 * Follows DRY principle by centralizing navigation link logic
 */
const NavLinkItem = ({ 
  to, 
  children, 
  isMobile = false, 
  showActiveIndicator = false,
  className: additionalClasses = "" 
}) => {
  // Base classes for both mobile and desktop
  const baseClasses = "font-medium transition-all duration-200 rounded-lg";
  
  // Mobile-specific classes
  const mobileClasses = "block px-4 py-3 text-base w-full text-left";
  
  // Desktop-specific classes
  const desktopClasses = "relative px-3 py-2 text-sm";
  
  // Active state classes
  const activeClasses = "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20";
  
  // Inactive state classes
  const inactiveClasses = "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800";

  const getClassName = ({ isActive }) => {
    const sizeClasses = isMobile ? mobileClasses : desktopClasses;
    const stateClasses = isActive ? activeClasses : inactiveClasses;
    
    return `${baseClasses} ${sizeClasses} ${stateClasses} ${additionalClasses}`.trim();
  };

  return (
    <NavLink to={to} className={getClassName}>
      {children}
      {/* Active indicator for desktop navigation */}
      {showActiveIndicator && !isMobile && (
        <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-blue-500/0 via-blue-500/70 to-blue-500/0"></span>
      )}
    </NavLink>
  );
};

NavLinkItem.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  isMobile: PropTypes.bool,
  showActiveIndicator: PropTypes.bool,
  className: PropTypes.string,
};

export default NavLinkItem;
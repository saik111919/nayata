import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { Menu, X, Home, Info, Mail, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import ThemeToggle from "./ThemeToggle";
import { cn } from "../lib/utils";

/**
 * Enhanced mobile menu component optimized for touch interactions
 * Features smooth animations, touch-friendly design, and responsive layout
 */
const MobileMenu = ({
  brandName = "Nayata",
  navigationItems = [],
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Icon mapping for navigation items
  const getIcon = (path) => {
    switch (path) {
      case "/":
        return <Home className="h-5 w-5" />;
      case "/about":
        return <Info className="h-5 w-5" />;
      case "/contact":
        return <Mail className="h-5 w-5" />;
      default:
        return <ChevronRight className="h-4 w-4" />;
    }
  };

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMenu}
        className={cn(
          "relative z-50 md:hidden h-10 w-10 rounded-lg transition-all duration-200 hover:bg-accent",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
          isOpen && "bg-accent",
          className
        )}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
      >
        <div className="relative">
          <Menu 
            className={cn(
              "h-5 w-5 transition-all duration-300 transform",
              isOpen && "rotate-180 opacity-0"
            )} 
          />
          <X 
            className={cn(
              "h-5 w-5 absolute inset-0 transition-all duration-300 transform",
              isOpen ? "rotate-0 opacity-100" : "rotate-180 opacity-0"
            )} 
          />
        </div>
      </Button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Panel - Responsive across screen sizes */}
      <div
        className={cn(
          "fixed top-0 right-0 z-50 h-full bg-background/95 backdrop-blur-md",
          "border-l border-border shadow-2xl md:hidden",
          "transform transition-transform duration-300 ease-in-out",
          // Responsive width: larger on bigger screens, full width on very small screens
          "w-80 max-w-[85vw] sm:w-96 sm:max-w-[75vw]",
          // For very small screens (< 480px), use more width
          "max-[480px]:w-full max-[480px]:max-w-[95vw]",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Menu Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
              <span className="text-sm font-bold">{brandName.charAt(0)}</span>
            </div>
            <span className="font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent text-lg">
              {brandName}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={closeMenu}
            className="h-8 w-8 rounded-lg hover:bg-accent"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 sm:px-6 py-4 sm:py-6 mobile-menu-content overflow-y-auto">
          <div className="space-y-2">
            {navigationItems.map((item, index) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeMenu}
                className={({ isActive }) =>
                  cn(
                    "group flex items-center justify-between w-full px-4 py-4 rounded-xl text-left touch-item",
                    "transition-all duration-200 hover:bg-accent hover:scale-[1.02] active:scale-[0.98]",
                    "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus-visible",
                    "touch-manipulation select-none min-h-[48px]",
                    // Better spacing on smaller screens
                    "max-[480px]:px-3 max-[480px]:py-3 max-[480px]:min-h-[44px]",
                    isActive 
                      ? "bg-primary text-primary-foreground shadow-md" 
                      : "text-foreground hover:text-accent-foreground"
                  )
                }
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: isOpen ? "slideInRight 0.3s ease-out forwards" : "none"
                }}
              >
                <div className="flex items-center space-x-3">
                  {getIcon(item.path)}
                  <span className="font-medium text-base max-[480px]:text-sm">{item.label}</span>
                </div>
                <ChevronRight className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Menu Footer */}
        <div className="p-4 sm:p-6 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* CSS Animations and Touch Optimizations */}
      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Enhanced touch interactions for mobile devices */
        @media (hover: none) and (pointer: coarse) {
          .touch-item {
            min-height: 48px;
            padding: 16px;
          }
          
          .touch-item:active {
            transform: scale(0.98);
            background-color: hsl(var(--accent));
          }

          /* Larger touch targets on very small screens */
          @media (max-width: 480px) {
            .touch-item {
              min-height: 44px;
              padding: 12px;
            }
          }
        }

        /* Smooth scrolling for mobile menu */
        .mobile-menu-content {
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
        }

        /* Focus styles for accessibility */
        .focus-visible {
          outline: 2px solid hsl(var(--primary));
          outline-offset: 2px;
        }

        /* Prevent text selection on touch devices */
        @media (hover: none) and (pointer: coarse) {
          .touch-item {
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            -webkit-tap-highlight-color: transparent;
          }
        }
      `}</style>
    </>
  );
};

MobileMenu.propTypes = {
  brandName: PropTypes.string,
  navigationItems: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  className: PropTypes.string,
};

export default MobileMenu;
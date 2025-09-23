import PropTypes from "prop-types";
import { useState } from "react";
import { NavLink } from "react-router";
import { Menu, X } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "../../components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "../../components/ui/navigation-menu";
import ThemeToggle from "../../components/ThemeToggle";
import { cn } from "../../lib/utils";

/**
 * Modern navigation component using shadcn/ui components
 * Features improved design, accessibility, and mobile experience
 */
const Navbar = ({
  brandName = "Nayata",
  navigationItems = [],
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 right-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
    >
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand/Logo Section */}
        <BrandLogo brandName={brandName} />

        {/* Desktop Navigation - Centered */}
        <div className="hidden md:flex flex-1 justify-center">
          <NavigationMenu>
            <NavigationMenuList className="flex items-center space-x-1">
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.path}>
                  <NavigationMenuLink asChild>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        cn(
                          "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                          isActive && "bg-accent text-accent-foreground"
                        )
                      }
                    >
                      {item.label}
                    </NavLink>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right Section - Theme Toggle and Mobile Menu */}
        <div className="flex items-center space-x-3">
          <ThemeToggle />

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Toggle navigation menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="text-left">{brandName}</SheetTitle>
              </SheetHeader>
              <MobileNavigation
                navigationItems={navigationItems}
                onItemClick={() => setIsOpen(false)}
              />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

/**
 * Enhanced brand logo component with improved styling
 * Features modern gradient design and better typography
 */
const BrandLogo = ({ brandName }) => (
  <div className="mr-4 flex items-center space-x-2">
    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
      <span className="text-sm font-bold">{brandName.charAt(0)}</span>
    </div>
    <span className="hidden font-bold sm:inline-block bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent text-lg">
      {brandName}
    </span>
  </div>
);

/**
 * Mobile navigation component using shadcn/ui Sheet
 * Provides smooth slide-out navigation for mobile devices
 */
const MobileNavigation = ({ navigationItems, onItemClick }) => (
  <div className="mt-6 flow-root">
    <div className="-my-6 divide-y divide-border">
      <div className="space-y-2 py-6">
        {navigationItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onItemClick}
            className={({ isActive }) =>
              cn(
                "block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                isActive && "bg-accent text-accent-foreground"
              )
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </div>
  </div>
);

// PropTypes for type checking and documentation
Navbar.propTypes = {
  brandName: PropTypes.string,
  navigationItems: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  className: PropTypes.string,
};

BrandLogo.propTypes = {
  brandName: PropTypes.string.isRequired,
};

MobileNavigation.propTypes = {
  navigationItems: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onItemClick: PropTypes.func.isRequired,
};

export default Navbar;

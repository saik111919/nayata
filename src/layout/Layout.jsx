import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "@/hooks/useTheme";
import router from "@/router";
import { Laptop2, Moon, Sun, Menu, X } from "lucide-react";
import { NavLink } from "react-router";
import { useState } from "react";

const Layout = () => {
  const { setTheme, theme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="layout-header">
      <div
        className={`layout-header__container  ${
          isMobileMenuOpen ? "rounded-b-none" : ""
        }`}
      >
        {/* Logo/Brand Section */}
        <div className="flex items-center">
          <NavLink
            to={router.routes[0].path}
            className="text-xl font-bold text-primary hover:text-primary/80 transition-colors duration-200"
          >
            {router?.routes[0]?.name}
          </NavLink>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex">
          <ul className="flex items-center gap-1">
            {router?.routes[0]?.children?.map((child) => (
              <li key={child.path || "home"}>
                <NavLink
                  to={child.index ? "/" : child.path} // Use "/" for index routes
                  end={child.index} // Add end prop for exact matching on index routes
                  className={({ isActive }) =>
                    `inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:rounded-sm ${
                      isActive
                        ? "bg-primary text-white shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    }`
                  }
                >
                  {child?.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Section - Theme Selector & Mobile Menu Button */}
        <div className="flex items-center gap-2">
          {/* Theme Selector */}
          <Select onValueChange={setTheme} defaultValue={theme}>
            <SelectTrigger className="w-auto border-0 bg-transparent hover:bg-accent">
              <SelectValue placeholder="Select a theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="system" className="flex items-center gap-2">
                <Laptop2 className="h-4 w-4" />
                System
              </SelectItem>
              <SelectItem value="dark" className="flex items-center gap-2">
                <Moon className="h-4 w-4" />
                Dark
              </SelectItem>
              <SelectItem value="light" className="flex items-center gap-2">
                <Sun className="h-4 w-4" />
                Light
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full right-0 w-full px-4">
          <nav className="backdrop-blur-lg border border-border rounded-t-none rounded-lg shadow-lg p-2">
            <ul className="space-y-1">
              {router?.routes[0]?.children?.map((child) => (
                <li key={child?.path || "home"}>
                  <NavLink
                    to={child.index ? "/" : child.path} // Use "/" for index routes
                    end={child.index} // Add end prop for exact matching on index routes
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-primary text-white"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent"
                      }`
                    }
                  >
                    {child?.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Layout;

import { Outlet } from "react-router";
import navigationConfig from "./constants/navigationConfig";
import { Navbar } from "./components";
// import Navbar from "@/components/Navbar";
// import navigationConfig from "@/constants/navigationConfig";

/**
 * Main layout component that provides the overall page structure
 * Follows Single Responsibility Principle by focusing on layout structure
 * Uses composition pattern with extracted components
 */
const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-x-hidden">
      {/* Navigation Section */}
      <Navbar
        brandName={navigationConfig.brand.name}
        navigationItems={navigationConfig.navigationItems}
      />

      {/* Main Content Section */}
      <MainContent>
        <Outlet />
      </MainContent>
    </div>
  );
};

/**
 * Main content wrapper component
 * Provides consistent spacing and responsive container
 */
const MainContent = ({ children }) => (
  <main className="flex-1 w-full">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {children}
    </div>
  </main>
);

export default Layout;

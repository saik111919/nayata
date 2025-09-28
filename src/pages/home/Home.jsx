import { Card, CardContent } from "@/components/ui/card";
import ExpenseCards from "../common/ExpenseCards";
import { Plus, Wallet, Receipt, PieChart, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div className="flex flex-col gap-3 sm:gap-4 lg:gap-6 py-2 sm:py-4 lg:py-6 px-3 md:px-4 lg:px-6 xl:px-6 mx-auto">
      {/* Top section with two cards */}
      <div className="flex flex-col xl:flex-row gap-4 w-full">
        {/* Left card - Welcome section with optimized proportions */}
        <ExpenseCards />
        {/* Right card - Expense List with enhanced layout */}
        <Card className="flex-1 xl:flex-[3]">
          <CardContent className="flex flex-col">
            {/* Header section */}
            <div className="text-left py-3 border-b border-border/50 mb-4">
              <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Expense List
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Recent transactions and expenses
              </p>
            </div>

            {/* Content area - optimized for future expense list */}
            <Card className="border-dashed border-2 border-muted-foreground/20 bg-muted/20">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-4">
                <div className="p-4 rounded-full bg-muted/50 border border-border/50">
                  <Wallet className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">
                    Expense Tracking
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Your detailed transaction history and expense categories
                    will appear here. Start adding expenses to see your spending
                    patterns.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 justify-center mt-4">
                  <div className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20">
                    Categories
                  </div>
                  <div className="px-3 py-1 bg-secondary/10 text-secondary-foreground text-xs rounded-full border border-secondary/20">
                    Analytics
                  </div>
                  <div className="px-3 py-1 bg-accent/10 text-accent-foreground text-xs rounded-full border border-accent/20">
                    Reports
                  </div>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>

      {/* Bottom section - Full width expense summary */}
      <Card className="w-full min-h-[16rem] sm:min-h-[20rem] lg:min-h-[24rem]">
        <CardContent className="p-3 sm:p-4 lg:p-6 h-full">
          <div className="flex flex-col h-full gap-3 sm:gap-4 lg:gap-6">
            <div className="flex flex-col items-center justify-center py-2 sm:py-4">
              <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-center">
                Expense Summary
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mt-1 text-center">
                Comprehensive financial overview and analytics
              </p>
            </div>
            <Card className="flex-1">
              <CardContent className="p-3 sm:p-4 lg:p-6 h-full">
                <div className="flex flex-col items-center justify-center h-full min-h-[6rem] sm:min-h-[8rem] lg:min-h-[10rem]">
                  <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-center">
                    Expense Summary Cards
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-2 text-center max-w-2xl">
                    Charts, graphs, and detailed breakdowns of your spending
                    patterns
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;

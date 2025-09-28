import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  IndianRupee,
  Plus,
  Receipt,
  PieChart,
} from "lucide-react";
import { useState, useEffect } from "react";

const ExpenseCards = ({ className = "flex" }) => {
  const [api, setApi] = useState();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div
      className={`${className} sm:grid-cols-2 grid-cols-1 flex-col gap-2 flex-1`}
    >
      <Card className="flex-1 xl:flex-[2] h-full min-h-96">
        <CardContent className="h-full flex flex-col">
          {/* Header section - more compact */}
          <div className="text-center py-3 border-b border-border/50 mb-4">
            <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Welcome to Nayata
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Your personal expense tracking companion
            </p>
          </div>

          {/* Carousel section - optimized for space */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-sm">
              <Carousel
                className="w-full"
                opts={{ align: "start", loop: true }}
                setApi={setApi}
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  <CarouselItem className="pl-2 md:pl-4">
                    <Card className="border-green-200 dark:border-green-800 bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/50 dark:to-green-900/30">
                      <CardContent className="p-4">
                        <div className="text-center space-y-3">
                          <div className="flex items-center justify-center gap-2">
                            <div className="p-2.5 rounded-full bg-green-500/10 border border-green-200 dark:border-green-800">
                              <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-green-700 dark:text-green-300">
                              Income
                            </h3>
                          </div>
                          <div>
                            <div className="flex items-center justify-center text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
                              <IndianRupee className="h-7 w-7" />
                              <span>5,24,000</span>
                            </div>
                            <p className="text-xs text-green-600/70 dark:text-green-400/70 font-medium">
                              This month
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>

                  <CarouselItem className="pl-2 md:pl-4">
                    <Card className="border-red-200 dark:border-red-800 bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-950/50 dark:to-red-900/30">
                      <CardContent className="p-4">
                        <div className="text-center space-y-3">
                          <div className="flex items-center justify-center gap-2">
                            <div className="p-2.5 rounded-full bg-red-500/10 border border-red-200 dark:border-red-800">
                              <TrendingDown className="h-5 w-5 text-red-600 dark:text-red-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-red-700 dark:text-red-300">
                              Expenses
                            </h3>
                          </div>
                          <div>
                            <div className="flex items-center justify-center text-3xl font-bold text-red-600 dark:text-red-400 mb-1">
                              <IndianRupee className="h-7 w-7" />
                              <span>3,18,000</span>
                            </div>
                            <p className="text-xs text-red-600/70 dark:text-red-400/70 font-medium">
                              This month
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>

                  <CarouselItem className="pl-2 md:pl-4">
                    <Card className="border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/50 dark:to-blue-900/30">
                      <CardContent className="p-4">
                        <div className="text-center space-y-3">
                          <div className="flex items-center justify-center gap-2">
                            <div className="p-2.5 rounded-full bg-blue-500/10 border border-blue-200 dark:border-blue-800">
                              <Wallet className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                              Balance
                            </h3>
                          </div>
                          <div>
                            <div className="flex items-center justify-center text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                              <IndianRupee className="h-7 w-7" />
                              <span>2,06,000</span>
                            </div>
                            <p className="text-xs text-blue-600/70 dark:text-blue-400/70 font-medium">
                              Remaining
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                </CarouselContent>

                {/* Enhanced dot indicators */}
                <div className="flex justify-center mt-4 gap-2">
                  <div className=" bg-background/50 flex items-center gap-2 py-2 px-4 rounded-full">
                    {Array.from({ length: count }, (_, index) => (
                      <button
                        key={index}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          index + 1 === current
                            ? "bg-primary w-8 shadow-md"
                            : "bg-muted-foreground/30 hover:bg-muted-foreground/50 w-2"
                        }`}
                        onClick={() => api?.scrollTo(index)}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </Carousel>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex flex-row justify-around p-4">
          <Button className="text-white flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 cursor-pointer">
            <Plus className="h-4 w-4" />
            <span className="sm:inline-block hidden">Add Income</span>
            <span className="sm:hidden inline-block">Income</span>
          </Button>
          <Button className="text-white flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 cursor-pointer">
            <Receipt className="h-4 w-4" />
            <span className="sm:inline-block hidden">Add Expense</span>
            <span className="sm:hidden inline-block">Expense</span>
          </Button>
          <Button className="text-white flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 cursor-pointer">
            <PieChart className="h-4 w-4" />
            <span className="sm:inline-block hidden">View Reports</span>
            <span className="sm:hidden inline-block">Reports</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpenseCards;

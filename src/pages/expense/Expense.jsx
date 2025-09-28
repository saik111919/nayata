import { Card, CardHeader } from "@/components/ui/card";
import ExpenseCards from "../common/ExpenseCards";

const Expense = () => {
  return (
    <div className="flex flex-col sm:gap-5 gap-3 sm:py-4 py-2 sm:px-6 px-4">
      <ExpenseCards className="grid" />
      <Card className="min-h-60">
        <CardHeader>Expense List</CardHeader>
      </Card>
      <Card className="min-h-20">
        <CardHeader>Expense Summary</CardHeader>
      </Card>
    </div>
  );
};

export default Expense;

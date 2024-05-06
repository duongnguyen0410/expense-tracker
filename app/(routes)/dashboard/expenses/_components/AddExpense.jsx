import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import db from "@/utils/dbConfig";
import { Expenses } from "@/utils/schema";
import moment from "moment";
import React from "react";
import { Toaster, toast } from "sonner";

function AddExpense({ budgetId, user, refreshData }) {
  const [expenseName, setExpenseName] = React.useState("");
  const [expenseAmount, setExpenseAmount] = React.useState("");

  const addNewExpense = async () => {
    const result = await db
      .insert(Expenses)
      .values({
        name: expenseName,
        amount: expenseAmount,
        budgetId: budgetId,
        createdAt: moment().format("DD/MM/yyyy"),
      })
      .returning({ insertedId: Expenses.id });

    console.log(result);

    if (result) {
      setExpenseName("");
      setExpenseAmount("");
      toast.success("Expense has been added.");
      setExpenseName("");
      setExpenseAmount("");
      refreshData();
    }
  };

  return (
    <div className="border p-5 rounded-lg">
      <h2 className="font-bold text-lg">Add Expense</h2>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Name</h2>
        <Input
          placeholder="e.g Bedroom Decor"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
        />
      </div>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Amount</h2>
        <Input
          placeholder="e.g 1000"
          value={expenseAmount}
          onChange={(e) => setExpenseAmount(e.target.value)}
        />
      </div>
      <Button
        disabled={!(expenseName && expenseAmount)}
        className="mt-3 w-full"
        onClick={() => addNewExpense()}
      >
        Add New Expense
      </Button>
    </div>
  );
}

export default AddExpense;

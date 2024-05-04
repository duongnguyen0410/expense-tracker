import { Button } from "@/components/ui/button";
import db from "@/utils/dbConfig";
import { Expenses } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Trash2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";

function ExpenseListTable({ expenseList, refreshBudget, refreshExpenseTable }) {
  const deleteExpense = async (expense) => {
    const result = await db
      .delete(Expenses)
      .where(eq(Expenses.id, expense.id))
      .returning();
    if (result) {
      toast.error("Expense has been deleted.");
      refreshBudget();
      refreshExpenseTable();
    }
  };

  return (
    <div className="mt-3">
      <div className="grid grid-cols-4 bg-slate-200 p-2">
        <h2 className="font-bold">Name</h2>
        <h2 className="font-bold">Amount</h2>
        <h2 className="font-bold">Date</h2>
        <h2 className="font-bold">Action</h2>
      </div>
      {expenseList.map((expense) => (
        <div className="grid grid-cols-4 bg-slate-100 p-2 items-center">
          <h2>{expense.name}</h2>
          <h2>{expense.amount}</h2>
          <h2>{expense.createdAt}</h2>
          <Button
            className="bg-red-500 hover:bg-red-600 text-white text-sm py-1 px-2 rounded w-8 h-8"
            onClick={() => deleteExpense(expense)}
          >
            <Trash2 size={18} />
          </Button>
        </div>
      ))}
    </div>
  );
}

export default ExpenseListTable;

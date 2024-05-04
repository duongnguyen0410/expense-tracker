"use client";

import db from "@/utils/dbConfig";
import { Budgets } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { getTableColumns, sql, eq, desc } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { Expenses } from "@/utils/schema";
import BudgetItem from "@/app/(routes)/dashboard/budgets/_components/BudgetItem";
import AddExpense from "../_components/AddExpense";
import ExpenseListTable from "../_components/ExpenseListTable";
import { ArrowLeft, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import EditBudget from "../_components/EditBudget";

function MyExpenses({ params }) {
  const user = useUser();
  const [budgetInfo, setBudgetInfo] = useState();
  const [expenseList, setExpenseList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    console.log(params);
    getBudgetInfo();
  }, [user?.id]);

  // Get Budget Infomation
  const getBudgetInfo = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`SUM(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`COUNT(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .where(eq(Budgets.id, params.id))
      .groupBy(Budgets.id);

    if (result) {
      getExpenseList();
      setBudgetInfo(result[0]);
    }
  };

  // Delete Budget
  const deleteBudget = async () => {
    const deleteExpenseResult = await db
      .delete(Expenses)
      .where(eq(Expenses.budgetId, params.id))
      .returning();

    if (deleteExpenseResult) {
      const result = await db
        .delete(Budgets)
        .where(eq(Budgets.id, params.id))
        .returning();

      if (result) {
        toast.error("Budget has been deleted.");
        setTimeout(() => {
          router.back("/dashboard/budgets");
        }, 1000);
      }
    }
  };

  // Get Expense List
  const getExpenseList = async () => {
    const result = await db
      .select()
      .from(Expenses)
      .where(eq(Expenses.budgetId, params.id))
      .orderBy(desc(Expenses.id));

    if (result) {
      setExpenseList(result);
      console.log(result);
    }
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold flex justify-between items-center">
        <span className="flex gap-2 items-center">
          <ArrowLeft
            onClick={() => router.back("/dashboard/budgets")}
            className="cursor-pointer hover:bg-slate-200 rounded"
          />
          My Expenses
        </span>
        <div className="flex gap-2 items-center">
          <EditBudget
            budgetInfo={budgetInfo}
            refreshData={() => getBudgetInfo()}
          />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="flex gap-2" variant="destructive" size="sm">
                <Trash2 /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your budget along with expenses and remove your data from our
                  servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteBudget()}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-5">
        {budgetInfo ? (
          <BudgetItem budget={budgetInfo} />
        ) : (
          <div className="h-[150px] w-full bg-slate-200 rounded-lg animate-pulse"></div>
        )}
        <AddExpense
          budgetId={params.id}
          user={user}
          refreshData={() => getBudgetInfo()}
        />
      </div>
      <div className="mt-4">
        <h2 className="font-bold text-lg">Latest Expenses</h2>
        <ExpenseListTable
          expenseList={expenseList}
          refreshBudget={() => getBudgetInfo()}
          refreshExpenseTable={() => getExpenseList()}
        />
      </div>
    </div>
  );
}

export default MyExpenses;

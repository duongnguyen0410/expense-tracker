"use client";

import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import CardInfo from "./_components/CardInfo";
import db from "@/utils/dbConfig";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses } from "@/utils/schema";
import BarChartDashboard from "./_components/BarChartDashboard";
import BudgetItem from "@/app/(routes)/dashboard/budgets/_components/BudgetItem";
import ExpenseListTable from "@/app/(routes)/dashboard/expenses/_components/ExpenseListTable";

function Dashboard() {
  const { user } = useUser();

  const [budgetList, setBudgetList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);

  useEffect(() => {
    user && getBudgetList();
  }, [user?.id]);

  const getBudgetList = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`SUM(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`COUNT(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));

    if (result) {
      console.log(result);
      setBudgetList(result);
      getExpenseList();
    }
  };

  const getExpenseList = async () => {
    const result = await db
      .select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        createdAt: Expenses.createdAt,
      })
      .from(Budgets)
      .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(Expenses.id));

    if (result) {
      console.log(result);
      setExpenseList(result);
    }
  };

  return (
    <div className="p-8">
      <h2 className="font-bold text-3xl">Hi, {user?.fullName}</h2>
      <p className="text-gray-400 mt-3">
        Here's what happenning with your money. Let's manage your expense!
      </p>

      <CardInfo budgetList={budgetList} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
        <div className="lg:col-span-2">
          <BarChartDashboard budgetList={budgetList} />
          <ExpenseListTable
            expenseList={expenseList}
            refreshBudget={getBudgetList}
            refreshExpenseTable={getExpenseList}
          />
        </div>
        <div>
          <h2 className="font-bold text-lg mb-3">Latest Budgets</h2>
          <div className="grid gap-5">
            {budgetList.map((budget) => (
              <BudgetItem key={budget.id} budget={budget} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

"use client";

import React from "react";
import CreateBudget from "./CreateBudget";
import db from "@/utils/dbConfig";
import { eq, getTableColumns, sql, desc } from "drizzle-orm";
import { Budgets, Expenses } from "@/utils/schema";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import BudgetItem from "./BudgetItem";
import Loading from "./Loading";

function BudgetList() {
  const { user } = useUser();
  const [budgetList, setBudgetList] = useState([]);

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
    }
  };

  return (
    <div className="mt-7">
      {budgetList?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <CreateBudget
            refreshData={() => {
              getBudgetList();
            }}
          />
          {budgetList.map((budget) => {
            return <BudgetItem budget={budget} />;
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center mt-10">
          <Loading />
        </div>
      )}
    </div>
  );
}

export default BudgetList;

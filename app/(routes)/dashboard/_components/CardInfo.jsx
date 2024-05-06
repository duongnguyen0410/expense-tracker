import { BadgeDollarSign, ReceiptText, Wallet } from "lucide-react";
import React, { useEffect, useState } from "react";

function CardInfo({ budgetList }) {
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);

  useEffect(() => {
    callculateCardInfo();
  }, [budgetList]);

  const callculateCardInfo = () => {
    console.log(budgetList);
    let _totalBudget = 0;
    let _totalSpend = 0;
    budgetList.forEach((budget) => {
      _totalBudget += Number(budget.amount);
      _totalSpend += budget.totalSpend;
    });
    setTotalBudget(_totalBudget);
    setTotalSpend(_totalSpend);
    console.log(_totalBudget, _totalSpend);
  };

  return (
    <div>
      {budgetList?.length > 0 ? (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="p-7 border rounded-lg flex items-center justify-between bg-primary">
            <div>
              <h2 className="text-sm text-white">Total Budget</h2>
              <h2 className="font-bold text-2xl text-white">${totalBudget}</h2>
            </div>
            <Wallet className="bg-primary p-3 h-12 w-12 rounded-full text-white" />
          </div>
          <div className="p-7 border rounded-lg flex items-center justify-between bg-primary">
            <div>
              <h2 className="text-sm text-white">Total Spend</h2>
              <h2 className="font-bold text-2xl text-white">${totalSpend}</h2>
            </div>
            <ReceiptText className="bg-primary p-3 h-12 w-12 rounded-full text-white" />
          </div>
          <div className="p-7 border rounded-lg flex items-center justify-between bg-primary">
            <div>
              <h2 className="text-sm text-white">No. Of Budget</h2>
              <h2 className="font-bold text-2xl text-white">{budgetList?.length}</h2>
            </div>
            <BadgeDollarSign className="bg-primary p-3 h-12 w-12 rounded-full text-white" />
          </div>
        </div>
      ) : (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map(() => (
            <div className="h-[109.8px] w-full bg-slate-200 animate-pulse rounded-lg"></div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CardInfo;

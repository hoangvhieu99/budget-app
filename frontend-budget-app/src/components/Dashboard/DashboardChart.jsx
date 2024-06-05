import React from "react";
import { useSelector } from "react-redux";
export default function DashboardChart() {
  const {
    incomes,
    expenses,
    calculateTotalIncome,
    calculateTotalExpenses,
    getIncomesSuccess,
    getExpensesSuccess,
  } = useSelector((state) => state.transaction);

  return (
    <div className="dashboard-right">
      <div className="inner-layout">
        <h1>All Transactions</h1>
        <div className="stats-con">
          <div className="chart-con">
            {/* <Chart /> */}
            <div className="amount-con">
              <div className="income">
                <h2>Total Income</h2>
                <p>{calculateTotalIncome}</p>
              </div>
              <div className="expense">
                <h2>Total Expense</h2>
                <p>{calculateTotalExpenses}</p>
              </div>
              <div className="balance">
                <h2>Total Balance</h2>
                <p>{calculateTotalIncome - calculateTotalExpenses}</p>
              </div>
            </div>
          </div>
          <div className="history-con">
            {/* <History /> */}
            <h2 className="salary-title">
              Min <span>Salary</span>Max
            </h2>
            <div className="salary-item">
              {/* <p>${Math.min(...incomes.map((item) => item.amount))}</p>
              <p>${Math.max(...incomes.map((item) => item.amount))}</p> */}
            </div>
            <h2 className="salary-title">
              Min <span>Expense</span>Max
            </h2>
            <div className="salary-item">
              {/* <p>${Math.min(...expenses.map((item) => item.amount))}</p>
              <p>${Math.max(...expenses.map((item) => item.amount))}</p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

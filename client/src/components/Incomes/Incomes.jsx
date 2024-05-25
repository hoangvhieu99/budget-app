import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getIncomes,
  deleteIncome,
  selectTotalIncome,
} from "../../redux/slides/incomeSlice";
import Form from "../Form/Form";
import IncomeItem from "../IncomeItems/IncomeItems";
export default function Incomes() {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser._id);
  const { incomes, error, loading } = useSelector((state) => state.income);
  console.log(incomes);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIncomes(currentUser._id));
  }, [dispatch]);
  // const totalIncome = incomes.reduce(
  //   (sum, transaction) => sum + transaction.amount,
  //   0
  // );
  return (
    <div className="income-style">
      <div className="inner-layout">
        <h1>Incomes</h1>
        <h2 className="total-income">
          {/* Total Income: <span>${totalIncome}</span> */}
        </h2>
        <div className="income-content">
          {/* <div className="form-container">
            <Form />
          </div> */}
          {/* <div className="incomes">
            {incomes.map((income) => {
              const { _id, title, amount, date, category, description, type } =
                income;
              return (
                <IncomeItem
                  key={_id}
                  id={_id}
                  title={title}
                  description={description}
                  amount={amount}
                  date={date}
                  type={type}
                  category={category}
                  indicatorColor="var(--color-green)"
                  deleteItem={deleteIncome}
                />
              );
            })}
          </div> */}
        </div>
      </div>
    </div>
  );
}

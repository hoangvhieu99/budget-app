import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Form from "../Form/Form";
import IncomeItem from "../IncomeItems/IncomeItems";
import {
  addIncome,
  deleteIncome,
  getIncomes,
} from "../../redux/slides/incomeSlice";
import { toast } from "react-toastify";
import { formatAmount } from "./../../utils/formatAmount";

export default function Incomes() {
  const { currentUser } = useSelector((state) => state.user);
  const { incomes, loading, getTotalIncome } = useSelector(
    (state) => state.income
  );
  const dispatch = useDispatch();
  const AuthStr = "Bearer ".concat(currentUser.token);

  useEffect(() => {
    dispatch(getIncomes(AuthStr));
  }, []);

  const handleAddIncome = async (incomeData) => {
    try {
      await dispatch(addIncome({ ...incomeData, token: AuthStr }));
      dispatch(getIncomes(AuthStr));
      toast.success("Thêm thành công");
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleDeleteIncome = async (id) => {
    try {
      await dispatch(deleteIncome({ ...id, token: AuthStr }));
      dispatch(getIncomes(AuthStr));
      toast.success("Đã xoá item");
    } catch (error) {
      toast.error(error.message);
    }
  };
  // const totalIncome = incomes.reduce(
  //   (sum, transaction) => sum + transaction.amount,
  //   0
  // );
  return (
    <div className="income-style">
      <div className="inner-layout">
        <h1>Thu nhập</h1>
        <h2 className="total-income">
          Tổng thu nhập: <span> {formatAmount(getTotalIncome)}</span>
        </h2>
        <div className="income-content">
          <div className="form-container">
            <Form onAddIncome={handleAddIncome} />
          </div>
          {loading ? (
            "Loading..."
          ) : (
            <div className="incomes">
              {incomes.map((income) => {
                const {
                  _id,
                  title,
                  amount,
                  date,
                  category,
                  description,
                  type,
                } = income;
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
                    deleteItem={handleDeleteIncome}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

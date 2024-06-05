import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Form from "../Form/Form";
import IncomeItem from "../IncomeItems/IncomeItems";
import { toast } from "react-toastify";
import axios from "axios";
import { getIncomes } from "../../redux/slides/incomeSlice";
export default function Incomes() {
  const { currentUser } = useSelector((state) => state.user);
  const { incomes } = useSelector((state) => state.income);
  console.log(incomes);
  const dispatch = useDispatch();
  // const url = "/api/income/get-incomes";
  // const [incomes, setIncomes] = useState([]);
  const AuthStr = "Bearer ".concat(currentUser.token);
  useEffect(() => {
    dispatch(getIncomes(AuthStr));
  }, []);
  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(url, {
  //       headers: { Authorization: AuthStr },
  //     });

  //     // if (!response.ok) {
  //     //   throw new Error("Network response was not ok");
  //     // }
  //     console.log(response.data);
  //     return response.data;
  //     // const data = await response.json();
  //   } catch (error) {
  //     toast.error("error");
  //   }
  // };
  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const totalIncome = incomes.reduce(
  //   (sum, transaction) => sum + transaction.amount,
  //   0
  // );
  return (
    <div className="income-style">
      <div className="inner-layout">
        <h1>Incomes</h1>
        {/* <h2 className="total-income">
          Total Income: <span>${selectTotalIncome}</span>
        </h2> */}
        <div className="income-content">
          {/* <div className="form-container">
            <Form />
          </div> */}
          <div className="incomes">
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
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addIncome } from "../../redux/slides/incomeSlice";
import { plus } from "../../utils/Icons";
import Button from "../Button/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export default function Form() {
  const { incomes, error, loading } = useSelector((state) => state.income);
  const dispatch = useDispatch();
  const [inputError, setInputError] = useState(error);
  const [inputState, setInputState] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
    description: "",
  });

  const { title, amount, date, category, description } = inputState;
  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
    setInputError("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addIncome(inputState));
      setInputState({
        title: "",
        amount: "",
        date: "",
        category: "",
        description: "",
      });
    } catch (error) {
      console.error("Error adding income:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-style">
      {inputError && <p className="error">{inputError}</p>}
      <div className="input-control">
        <input
          type="text"
          value={title}
          name={"title"}
          placeholder="Salary Title"
          onChange={handleInput("title")}
        />
      </div>
      <div className="input-control">
        <input
          value={amount}
          type="text"
          name={"amount"}
          placeholder={"Salary Amount"}
          onChange={handleInput("amount")}
        />
      </div>
      <div className="input-control">
        <DatePicker
          id="date"
          placeholderText="Enter A Date"
          selected={date}
          dateFormat="dd/MM/yyyy"
          onChange={(date) => {
            setInputState({ ...inputState, date: date });
          }}
        />
      </div>
      <div className="selects input-control">
        <select
          required
          value={category}
          name="category"
          id="category"
          onChange={handleInput("category")}
        >
          <option value="" disabled>
            Select Option
          </option>
          <option value="salary">Salary</option>
          <option value="freelancing">Freelancing</option>
          <option value="investments">Investiments</option>
          <option value="stocks">Stocks</option>
          <option value="bitcoin">Bitcoin</option>
          <option value="bank">Bank Transfer</option>
          <option value="youtube">Youtube</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="input-control">
        <textarea
          name="description"
          value={description}
          placeholder="Add A Reference"
          id="description"
          cols="30"
          rows="4"
          onChange={handleInput("description")}
        ></textarea>
      </div>
      <div className="submit-btn">
        <Button
          name={"Add Income"}
          icon={plus}
          bPad={".8rem 1.6rem"}
          bRad={"30px"}
          bg={"var(--color-accent"}
          color={"#fff"}
        />
      </div>
    </form>
  );
}

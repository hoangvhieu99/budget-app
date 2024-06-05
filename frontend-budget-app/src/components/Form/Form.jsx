import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { plus } from "../../utils/Icons";
import Button from "../Button/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export default function Form() {
  // const { incomes, error, loading } = useSelector((state) => state.income);
  // const dispatch = useDispatch();
  const [inputError, setInputError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
    description: "",
  });
  // console.log(inputError);
  // const [inputState, setInputState] = useState({
  //   title: "",
  //   amount: "",
  //   date: "",
  //   category: "",
  //   description: "",
  // });

  const { title, amount, date, category, description } = formData;
  const handleInput = (name) => (e) => {
    // setInputState({ ...inputState, [name]: e.target.value });
    setFormData({ ...formData, [name]: e.target.value });
    setInputError("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const yourToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTU0OTNiMmU5NzdlM2IxY2VjMjQzMSIsImlhdCI6MTcxNjk1MzkyMCwiZXhwIjoxNzE3MDQwMzIwfQ.C-Mqa_SDonLPANR7A9-W_Df5JieKrx5mue0Mj5XwsxM";
      // await dispatch(addIncome(inputState));
      const res = await fetch("/api/income/add-income", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${yourToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        toast.error("added Failed");
        return;
      }
      toast.success("added Success");
    } catch (error) {
      toast.error("added Failed");
      console.log(error);
    }

    // setInputState({
    //   title: "",
    //   amount: "",
    //   date: "",
    //   category: "",
    //   description: "",
    // });
    // } catch (error) {
    //   console.error("Error adding income:", error);
    // }
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
            setFormData({ ...formData, date: date });
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

import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./income.css";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DataTable from "../../components/table/DataTable";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addIncome, fetchIncomeData } from "../../features/income/incomeSlice";
import { useFormik } from "formik";
const Income = () => {
  const incomeData = useSelector((state) => state.income.incomeData);
  const status = useSelector((state) => state.income.status);
  const error = useSelector((state) => state.income.error);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchIncomeData());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      title: "",
      amount: "",
      date: "",
      category: "",
      note: "",
    },

    onSubmit: async (values) => {
      try {
        await dispatch(addIncome(values)).unwrap();
        dispatch(fetchIncomeData());
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <div className="mainbar">
      <h1>Income</h1>
      <h2 className="total-income">Total Income</h2>
      <div className="income-container">
        <form onSubmit={formik.handleSubmit}>
          <input
            type="text"
            placeholder="Salary Title"
            className="income-input"
            value={formik.values.title}
            onChange={formik.handleChange}
            name="title"
          />
          <input
            type="text"
            placeholder="Salary Amount"
            className="income-input"
            value={formik.values.amount}
            onChange={formik.handleChange}
            name="amount"
          />
          <div className="income-input">
            <FontAwesomeIcon icon={faCalendar} className="calendar-icon" />
            <DatePicker
              selected={formik.values.date}
              onChange={(date) => formik.setFieldValue("date", date)}
              placeholderText="select date"
              className="date-picker"
              name="date"
            />
          </div>
          <select
            className="income-input"
            value={formik.values.category}
            onChange={formik.handleChange}
            name="category"
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
          <textarea
            rows={5}
            placeholder="Add a note..."
            onChange={formik.handleChange}
            value={formik.values.note}
            name="note"
          ></textarea>
          <button type="submit" className="income-btn">
            + Add Income
          </button>
        </form>
        <div>
          {status === "loading" && <div>Loading...</div>}
          {status === "failed" && <div>no data</div>}
          {status === "succeeded" && <DataTable rows={incomeData} />}
        </div>
      </div>
    </div>
  );
};

export default Income;

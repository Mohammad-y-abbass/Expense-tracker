import React, {  useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./income.css";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DataTable from "../../components/table/DataTable";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  addIncome,
  fetchIncomeData,
  deleteIncome,
} from "../../features/income/incomeSlice";
import { useFormik } from "formik";
import Loader from "../../components/loader/Loader";
const Income = () => {
  const incomeData = useSelector((state) => state.income.incomeData);
  const status = useSelector((state) => state.income.status);
  const error = useSelector((state) => state.income.error);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchIncomeData());
  }, [dispatch]);

  const handleIncomeDelete = (incomeId) => {
    dispatch(deleteIncome(incomeId));
    dispatch(fetchIncomeData());
    console.log(incomeId, "deleted");
  };

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
        formik.resetForm();
      } catch (error) {
        console.error(error);
      }
    },
  });
  const totalIncome = incomeData.reduce((acc, curr) => acc + curr.amount, 0);
  return (
    <div className="mainbar">
      <h2 className="total-income">Total Income: ${totalIncome}</h2>
      <div className="income-container">
        <form onSubmit={formik.handleSubmit}>
          <input
            type="text"
            placeholder="Income Title"
            className="income-input"
            value={formik.values.title}
            onChange={formik.handleChange}
            name="title"
          />
          <input
            type="text"
            placeholder="Income Amount"
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
        <div style={{ width: "100%" }}>
          {status === "loading" && <Loader />}
          {status === "failed" && <div>no data</div>}
          {status === "succeeded" && (
            <DataTable
              rows={incomeData}
              action={(income) => {
                handleIncomeDelete(income._id);
                console.log(income._id);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Income;

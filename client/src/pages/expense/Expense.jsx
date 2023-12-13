import React, { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../expense/Expense";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DataTable from "../../components/table/DataTable";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import Loader from "../../components/loader/Loader";
import {
  addExpense,
  deleteExpense,
  fetchExpenseData,
} from "../../features/expense/expenseSlice";
import Alert from "@mui/material/Alert";
const Expense = () => {
  const expenseData = useSelector((state) => state.expense.expenseData);
  const status = useSelector((state) => state.expense.status);
  const error = useSelector((state) => state.expense.error);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchExpenseData());
  }, [dispatch]);

  const handleExpenseDelete = (expenseId) => {
    dispatch(deleteExpense(expenseId));
    dispatch(fetchExpenseData());
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      amount: "",
      date: "",
      category: "",
      note: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.title || !values.amount || !values.date || !values.category) {
        errors.title = "Please fill all the required fields";
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        await dispatch(addExpense(values)).unwrap();
        dispatch(fetchExpenseData());
        formik.resetForm();
      } catch (error) {
        console.error(error);
      }
    },
  });
  const totalExpense = expenseData.reduce((acc, curr) => acc + curr.amount, 0);
  return (
    <div className="mainbar">
      <h2 className="total">Total Expense: ${totalExpense}</h2>
      <div className="container">
        <form onSubmit={formik.handleSubmit}>
          <input
            type="text"
            placeholder="Expense Title"
            className={` ${formik.errors.title ? "input-error" : "input"}`}
            value={formik.values.title}
            onChange={formik.handleChange}
            name="title"
          />
          <input
            type="text"
            placeholder="Expense Amount"
            className={` ${formik.errors.title ? "input-error" : "input"}`}
            value={formik.values.amount}
            onChange={formik.handleChange}
            name="amount"
          />
          <div className={` ${formik.errors.title ? "input-error" : "input"}`}>
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
            className={` ${formik.errors.title ? "input-error" : "input"}`}
            value={formik.values.category}
            onChange={formik.handleChange}
            name="category"
          >
            <option value="" disabled>
              Select Option
            </option>
            <option value="salary">Grocery</option>
            <option value="freelancing">Bills</option>
            <option value="investments">Rent</option>
            <option value="stocks">Holiday</option>
            <option value="bitcoin">gas</option>
            <option value="bank">luxury</option>
            <option value="other">Other</option>
          </select>
          <textarea
            rows={5}
            placeholder="Add a note..."
            onChange={formik.handleChange}
            value={formik.values.note}
            name="note"
          ></textarea>
          <button type="submit" className="btn">
            + Add Expense
          </button>
        </form>
        <div style={{ width: "100%" }}>
          {status === "loading" && <Loader />}
          {status === "failed" && (
            <h1 className="error">{error}, please try again later</h1>
          )}
          {status === "succeeded" && (
            <DataTable
              rows={expenseData}
              action={(expense) => {
                handleExpenseDelete(expense._id);
                console.log(expense._id);
              }}
            />
          )}
        </div>
      </div>
      {formik.errors.title ? (
        <Alert severity="error">{formik.errors.title} </Alert>
      ) : null}
    </div>
  );
};

export default Expense;

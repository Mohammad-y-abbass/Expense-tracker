import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./income.css";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DataTable from "../../components/table/DataTable";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchIncomeData } from "../../features/income/incomeSlice";
const Income = () => {
  const [startDate, setStartDate] = useState(new Date());
  const incomeData = useSelector((state) => state.income.incomeData);
  const status = useSelector((state) => state.income.status);
  const error = useSelector((state) => state.income.error);
  console.log(incomeData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchIncomeData());
  }, [dispatch]);
  return (
    <div className="mainbar">
      <h1>Income</h1>
      <h2 className="total-income">Total Income</h2>
      <div className="income-container">
        <form>
          <input
            type="text"
            placeholder="Salary Title"
            className="income-input"
          />
          <input
            type="text"
            placeholder="Salary Amount"
            className="income-input"
          />
          <div className="income-input">
            <FontAwesomeIcon icon={faCalendar} className="calendar-icon" />
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              maxDate={new Date()}
              placeholderText="select date"
              className="date-picker"
            />
          </div>
          <select className="income-input">
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
          <textarea rows={5} placeholder="Add a note..."></textarea>
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

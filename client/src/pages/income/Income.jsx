import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./income.css";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Income = () => {
  const [startDate, setStartDate] = useState();
  const [incomeData, setIncomeData] = useState([]);
  useEffect(() => {
    const getIncomeData = async () => {
      try {
        const response = await fetch("http://localhost:9000/api/get-income");
        if (!response.ok) throw new Error(response.statusText);
        const jsonData = await response.json();
        setIncomeData(jsonData);
      } catch (err) {
        console.error(err.message);
      }
    };
    getIncomeData();
  }, []);

  useEffect(() => {
    console.log(incomeData);
  }, [incomeData]);

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
          <table className="income-table">
            <thead>
              <tr>
                <th>Salary Title</th>
                <th>Salary Amount</th>
                <th>Date</th>
                <th>Category</th>
                <th>Note</th>
              </tr>
            </thead>
            <tbody>
              {incomeData.length > 0 ? (
                incomeData.map((income) => (
                  <tr key={income._id}>
                    <td>{income.title}</td>
                    <td>{income.amount}</td>
                    <td>{income.date}</td>
                    <td>{income.category}</td>
                    <td>{income.note}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No income data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Income;

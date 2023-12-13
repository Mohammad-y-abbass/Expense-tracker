import { useEffect } from "react";
import Chart from "../../components/chart/Chart";
import { useSelector, useDispatch } from "react-redux";
import { fetchExpenseData } from "../../features/expense/expenseSlice";
import { fetchIncomeData } from "../../features/income/incomeSlice";

const Dashboard = () => {
  const incomeData = useSelector((state) => state.income.incomeData);
  const expenseData = useSelector((state) => state.expense.expenseData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchExpenseData());
    dispatch(fetchIncomeData());
  }, [dispatch]);

  const totalIncome = incomeData.reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = expenseData.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="mainbar">
      <div className="chart-container">
        <Chart />
      </div>
      <div className="balance">
        <div className="total-income">
          <p className="total-title">Total Income</p>
          <p className="total-amount">${totalIncome}</p>
        </div>
        <div className="total-expense">
          <p className="total-title">Total Expense</p>
          <p className="total-amount">${totalExpense}</p>
        </div>
        <div className="total-balance">
          <p className="total-title">Total Balance</p>
          <p
            className={`total-amount ${
              totalIncome > totalExpense ? "green" : "red"
            } `}
          >
            ${totalIncome - totalExpense}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

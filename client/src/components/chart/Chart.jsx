import { Line } from "react-chartjs-2";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchIncomeData } from "../../features/income/incomeSlice";
import { fetchExpenseData } from "../../features/expense/expenseSlice";
import moment from "moment";
ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Chart = () => {
  const dispatch = useDispatch();
  const incomeData = useSelector((state) => state.income.incomeData);
  const expenseData = useSelector((state) => state.expense.expenseData);
  useEffect(() => {
    dispatch(fetchIncomeData());
    dispatch(fetchExpenseData());
  }, [dispatch]);
  const incomeDataCopy = [...incomeData];
  const expenseDataCopy = [...expenseData];

  // Get the dates from both datasets
  const incomeDates = incomeDataCopy.map((income) => income.date);
  const expenseDates = expenseDataCopy.map((expense) => expense.date);

  // Merge the dates and remove duplicates
  const allDates = [...new Set([...incomeDates, ...expenseDates])];

  // Sort the dates
  allDates.sort((a, b) => (moment(a).isAfter(b) ? 1 : -1));

  // Format the dates
  const labels = allDates.map((date) => {
    return moment(date).format("DD/MM/YYYY");
  });

  const IncomeAmounts = incomeDataCopy.map((income) => income.amount);
  const expenseAmounts = expenseDataCopy.map((expense) => expense.amount);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Income",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: IncomeAmounts,
      },
      {
        label: "Expense",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(255,0,0,0.4)",
        borderColor: "rgba(255,0,0,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(255,0,0,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(255,0,0,1)",
        pointHoverBorderColor: "rgba(255,0,0,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: expenseAmounts,
      },
    ],
  };

  return <Line data={data} />;
};

export default Chart;

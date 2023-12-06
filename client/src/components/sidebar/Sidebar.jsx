import "./sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faHandHoldingDollar,
  faMoneyBillTransfer,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  return (
    <section className="sidebar">
      <ul>
        <li className="sidebar-list">
          <FontAwesomeIcon icon={faChartLine} />
          <span>Dashboard</span>
        </li>
        <li className="sidebar-list">
          <FontAwesomeIcon icon={faMoneyBillTransfer} />
          <span>View Transactions</span>
        </li>
        <li className="sidebar-list">
          <FontAwesomeIcon icon={faHandHoldingDollar} />
          <span>Income</span>
        </li>
        <li className="sidebar-list">
          <FontAwesomeIcon icon={faMoneyBill} />
          <span>Expenses</span>
        </li>
      </ul>
    </section>
  );
};

export default Sidebar;

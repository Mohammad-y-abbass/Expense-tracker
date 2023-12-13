import "./sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faHandHoldingDollar,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <section className="sidebar">
      <ul>
        <li>
          <NavLink to="/" className="sidebar-list">
            <FontAwesomeIcon icon={faChartLine} />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/income" className="sidebar-list">
            <FontAwesomeIcon icon={faHandHoldingDollar} />
            <span>Income</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/expense" className="sidebar-list">
            <FontAwesomeIcon icon={faMoneyBill} />
            <span>Expenses</span>
          </NavLink>
        </li>
      </ul>
    </section>
  );
};

export default Sidebar;

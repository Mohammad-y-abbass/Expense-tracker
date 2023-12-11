import Sidebar from "./components/sidebar/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard, Transactions, Income, Expense } from "./imports";
import { store } from "./store/store";
import { Provider } from "react-redux";
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Sidebar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/income" element={<Income />} />
            <Route path="/expense" element={<Expense />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;

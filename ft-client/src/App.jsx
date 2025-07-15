import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Transaction from "./pages/Transaction";
import Login from "./pages/Login";
import DefaultLayout from "./components/layout/DefaultLayout";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <div className="wrapper">
        <Routes>
          <Route path="*" element={<DefaultLayout />}>
            <Route path="" element={<Login />} />
            {/* public */}
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            {/* private */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="transaction" element={<Transaction />} />
          </Route>
        </Routes>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;

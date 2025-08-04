import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Transaction from "./pages/Transaction";
import Login from "./pages/Login";
import DefaultLayout from "./components/layout/DefaultLayout";
import { ToastContainer } from "react-toastify";
import Auth from "./auth/Auth";
import { useUser } from "./context/userContext";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import VerifyEmail from "./pages/VerifyEmail";
import { fetchTransactions } from "./features/transactions/transactionActions";

function App() {
  const { setUser, autoLogin, user } = useUser();
  const dispatch = useDispatch();

  useEffect(() => {
    autoLogin();
  }, []);

  useEffect(() => {
    user && user._id ? dispatch(fetchTransactions()) : "";
  }, [user?._id]);
  return (
    <>
      <div className="wrapper">
        <Routes>
          <Route path="*" element={<DefaultLayout />}>
            {/* public */}
            <Route path="" element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            {/* private */}
            <Route
              path="dashboard"
              element={
                <Auth>
                  <Dashboard />
                </Auth>
              }
            />
            <Route
              path="transaction"
              element={
                <Auth>
                  <Transaction />
                </Auth>
              }
            />
            <Route path="verify-email" element={<VerifyEmail />} />
          </Route>
        </Routes>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;

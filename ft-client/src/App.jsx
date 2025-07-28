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

function App() {
  const { setUser, autoLogin } = useUser();

  useEffect(() => {
    autoLogin();
  }, []);

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
          </Route>
        </Routes>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;

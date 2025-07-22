import React from "react";
import { useUser } from "../context/userContext";
import { Navigate, useLocation } from "react-router-dom";

const Auth = ({ children }) => {
  const { user } = useUser();
  const location = useLocation();

  return (
    <>
      {user && user?._id ? (
        children
      ) : (
        //navigate to login
        <Navigate to="/login" replace state={{ from: location }} />
      )}
      ;
    </>
  );
};

export default Auth;

import React, { children } from "react";
import { createContext, useContext, useState } from "react";

//create context
const UserContext = createContext();

//define provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const testFunction = () => {
    return "Test function";
  };
  const testFunction2 = () => {
    return "test function 2";
  };
  const dashboardMessage = () => {
    return "this is dashboard context message";
  };

  let sharedData = {
    user,
    setUser,
    testFunction,
    testFunction2,
    dashboardMessage,
  };

  //return what needs to be saved
  return (
    <UserContext.Provider value={sharedData}>{children}</UserContext.Provider>
  );
};

//function to use context
export const useUser = () => useContext(UserContext);

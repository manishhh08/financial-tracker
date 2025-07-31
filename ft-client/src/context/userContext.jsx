import React, { children } from "react";
import { createContext, useContext, useState } from "react";
import { getUserDetail } from "../utils/axiosHelper";

//create context
const UserContext = createContext();

//define provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  // const testFunction = () => {
  //   return "Test function";
  // };

  //auto login feature
  const autoLogin = async () => {
    let data = await getUserDetail();
    console.log(data);

    if (data.status) {
      setUser(data.user);
    }
  };
  let sharedData = {
    user,
    setUser,
    // testFunction,
    autoLogin,
  };

  //return what needs to be saved
  return (
    <UserContext.Provider value={sharedData}>{children}</UserContext.Provider>
  );
};

//function to use context
export const useUser = () => useContext(UserContext);

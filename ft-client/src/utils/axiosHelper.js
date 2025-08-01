import axios from "axios";
const apiUrl = import.meta.env.VITE_APP_API_URL + "/api/v1";

// axios helper
const apiProcessor = async ({ method, data, url, isPrivate }) => {
  try {
    let response = await axios({
      method: method,
      url: url,
      data: data,
      headers: isPrivate
        ? {
            Authorization: localStorage.getItem("accessToken"),
          }
        : {},
    });

    return response.data;
  } catch (err) {
    return {
      status: false,
      message: err?.response?.data?.message || err.message,
    };
  }
};

//User APIs
// create user
export const postUser = async (obj) => {
  // let response = await axios.post(`${apiUrl}/auth`, obj);
  // return response.data;

  return apiProcessor({
    method: "post",
    url: `${apiUrl}/auth`,
    data: obj,
  });
};

// login user
export const loginUser = async (obj) => {
  // let response = await axios.post(`${apiUrl}/auth/login`, obj);
  // return response.data;

  return apiProcessor({
    method: "post",
    url: `${apiUrl}/auth/login`,
    data: obj,
  });
};

//get user detail
export const getUserDetail = async () => {
  return apiProcessor({
    method: "get",
    url: `${apiUrl}/auth/user`,
    isPrivate: true,
  });
};
// verify user
export const verifyUser = async (token, email) => {
  return apiProcessor({
    method: "get",
    url: `${apiUrl}/verify-email?t=${token}&email=${email}`,
    isPrivate: false,
  });
};

//Transaction APIs
// get transaction
export const getTransation = async () => {
  return apiProcessor({
    method: "get",
    url: `${apiUrl}/transactions`,
    isPrivate: true,
  });
};

//create transaction
export const createTransaction = async (obj) => {
  return apiProcessor({
    method: "post",
    url: `${apiUrl}/transactions`,
    data: obj,
    isPrivate: true,
  });
};

//delete transacation
export const deleteTransaction = async (data) => {
  return apiProcessor({
    method: "delete",
    // url: `${apiUrl}/transactions/${id}`,
    url: `${apiUrl}/transactions`,
    isPrivate: true,
    data,
  });
};

//update transaction
export const updateTransaction = async (obj, id) => {
  return apiProcessor({
    method: "patch",
    url: `${apiUrl}/transactions/${id}`,
    data: obj,
    isPrivate: true,
  });
};

//get information for dashboard
export const getDashboardInformation = async () => {
  return apiProcessor({
    method: "get",
    url: `${apiUrl}/dashboard`,
    isPrivate: true,
  });
};

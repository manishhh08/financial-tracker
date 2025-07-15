import axios from "axios";
const apiUrl = "http://localhost:4000/api/v1";

// create user
export const postUser = async (obj) => {
  let response = await axios.post(`${apiUrl}/auth`, obj);
  return response.data;
};

// login user
export const loginUser = async (obj) => {
  let response = await axios.post(`${apiUrl}/auth/login`, obj);
  return response.data;
};

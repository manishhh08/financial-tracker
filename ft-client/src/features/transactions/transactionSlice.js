import { createSlice } from "@reduxjs/toolkit";
import { updateTransaction } from "../../utils/axiosHelper";

const initialState = {
  transactions: [],
};

const transacationSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setTransactions: (state, actions) => {
      state.transactions = actions.payload;
    },
    addTransaction: (state, actions) => {
      state.transactions.push(actions.payload);
    },
  },
});

const { reducer, actions } = transacationSlice;
export const { setTransactions, addTransactions } = actions;
export default reducer;

import { createSlice } from "@reduxjs/toolkit";

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
    resetTransaction: (state) => {
      state.transactions = [];
    },
  },
});

const { reducer, actions } = transacationSlice;
export const { setTransactions, addTransactions, resetTransaction } = actions;
export default reducer;

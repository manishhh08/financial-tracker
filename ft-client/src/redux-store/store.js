import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "../features/transactions/transactionSlice.js";

export default configureStore({
  reducer: {
    transactionStore: transactionReducer,
  },
  // Add your reducers here
});

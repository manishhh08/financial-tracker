import mongoose from "mongoose";
import transactionsSchema from "./transactionSchema.js";

export const Transaction = mongoose.model("Transacation", transactionsSchema);

//get transcations
export const getTransactionsByUserId = (userId) => {
  return Transaction.find({ userId: userId });
};

//create transactions
export const insertTranscation = (trasactionObj) => {
  return Transaction.insertOne(trasactionObj);
};

//delete transactions
export const deleteTransactionByUserId = (id, userId) => {
  return Transaction.findOneAndDelete({ _id: id, userId: userId });
};

//delete multiple transactions
export const deleteTransactionsByUserId = (idsToDelte, userId) => {
  return Transaction.deleteMany({
    _id: { $in: idsToDelte },
    userId: userId,
  });
};

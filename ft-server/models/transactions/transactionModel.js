import mongoose from "mongoose";
import transactionsSchema from "./transactionSchema.js";

export const Transaction = mongoose.model("Transacation", transactionsSchema);
// export const Transaction = mongoose.model("Transaction", transactionsSchema);

//get transcations
export const getTransactionsByUserId = (userId) => {
  return Transaction.find({ userId: userId });
};

//create transactions
export const insertTranscation = (transactionObj) => {
  return Transaction.insertOne(transactionObj);
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

//update transaction
export const updateTranscationByUserId = (tid, userId, tObject) => {
  return Transaction.findOneAndUpdate({ _id: tid, userId }, tObject, {
    new: true,
  });
};

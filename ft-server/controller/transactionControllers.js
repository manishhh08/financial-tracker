import {
  deleteTransactionByUserId,
  getTransactionsByUserId,
  insertTranscation,
  updateTranscationByUserId,
} from "../models/transactions/transactionModel.js";
//create new transactions
export const createTranscations = async (req, res) => {
  try {
    //create new transaction
    let transactionObj = req.body;

    //check this once
    transactionObj.userId = req.user._id;
    let newTransaction = await insertTranscation(transactionObj);
    return res.status(201).json({
      status: true,
      message: "Transaction Created",
      transaction: newTransaction,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

//get user transcations
export const getTransactions = async (req, res) => {
  try {
    //fetch transactions
    let userId = req.user._id;
    let transactions = await getTransactionsByUserId(userId);
    return res.status(200).json({
      status: true,
      message: "Transactions fetched",
      transactions,
    });
  } catch (err) {
    return res.status(401).json({
      status: false,
      message: "Failed to retrieve transcations",
    });
  }
};

//delete transaction api
export const deleteTransaction = async (req, res) => {
  try {
    let deleteTransactionId = req.params.id;
    let userId = req.user._id;

    const deleteTransacation = await deleteTransactionByUserId(
      deleteTransactionId,
      userId
    );
    if (deleteTransacation) {
      return res.status(200).json({
        status: true,
        message: "Transaction delete succesfully",
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "Transaction not found",
      });
    }
  } catch (err) {
    return res.status(401).json({
      status: false,
      message: "Failed to retrieve information",
    });
  }
};

//delete multiple transaction api
export const deleteMultipleTransaction = async (req, res) => {
  try {
    let deleteTransacationsId = req.params.idsToDelete;
    const multipleIds = idsToDeleteParam.split(",");

    const deleteMultipleTransaction = await deleteTransactionByUserId(
      deleteTransacationsId,
      multipleIds
    );

    if (deleteMultipleTransaction) {
      return res.status(200).json({
        status: true,
        message: "Transaction delete succesfully",
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "Transaction not found",
      });
    }
  } catch (err) {
    return res.status(401).json({
      status: false,
      message: "Failed to retrive information",
    });
  }
};

//update transaction api
export const updateTransaction = async (req, res) => {
  try {
    let userId = req.user._id;

    //retrieve transaction id
    let tid = req.params.id;
    let updateData = req.body;

    let updatedTransaction = await updateTranscationByUserId(
      tid,
      userId,
      updateData
    );
    return res.json({
      status: true,
      message: "Transaction Update Successful",
      transaction: updatedTransaction,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Failed to update transaction",
    });
  }
};

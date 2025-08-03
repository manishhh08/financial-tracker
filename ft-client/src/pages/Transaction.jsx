import axios from "axios";
import React, { useEffect, useState } from "react";
import TransactionForm from "../components/TransactionForm";
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { useUser } from "../context/userContext";
import useForm from "../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { removeTransaction } from "../features/transactions/transactionActions.js";

const Transaction = () => {
  const { testFunction, user } = useUser();

  const [show, setShow] = useState(false);

  const [idsToDelete, setIdsToDelete] = useState([]);

  const { form, setForm, handleOnChange } = useForm({
    type: "income",
    description: "",
    amount: 0,
    date: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [total, setTotal] = useState(0);
  //const [transactions, setTransactions] = useState([]);
  // redux
  const dispatch = useDispatch();
  const { transactions } = useSelector((store) => store.transactionStore);
  // const fetchTransaction = async () => {
  //   // fetch the token from localstorage

  //   let data = await getTransation();

  //   console.log(data);
  //   //console.log(testFunction());
  //   // dispatch(setTransactions(data.transactions));
  //   setTransactions(data.transactions);

  //   let tempTotal = data.transactions.reduce((acc, item) => {
  //     // return item.type.toLowerCase() == "income"
  //     return item.type == "income"
  //       ? acc + parseFloat(item.amount)
  //       : acc - parseFloat(item.amount);
  //   }, 0);

  //   //console.log(tempTotal);
  //   setTotal(tempTotal);
  // };

  useEffect(() => {
    setTotal(
      transactions.reduce(
        (acc, item) =>
          item.type == "income" ? acc + item.amount : acc - item.amount,
        0
      )
    );
  }, [transactions]);

  const handleOnDelete = async (id, isMany) => {
    if (!window.confirm("Are you sure you want to delete this transaction?"))
      return;

    const toDeletData = isMany ? idsToDelete : [id];
    // delete axios
    //   let data = await deleteTransaction(toDeletData);

    //   if (data.status) {
    //     toast.success(data.message);
    //     fetchTransaction();
    //   } else {
    //     toast.error(data.message);
    //   }
    // };
    //const handleOnSelect = (checked, id) => {
    //   let tempIds = [...idsToDelete];
    //   console.log(checked, id);
    //   if (checked) {
    //     // Check for the duplicate ids
    //     tempIds.push(id);
    //     setIdsToDelete(tempIds);
    //   } else {
    //     // Remove the ids from the array
    //     tempIds = tempIds.filter((ti) => ti != id);
    //     setIdsToDelete(tempIds);
    //   }
    // };

    let data = await dispatch(removeTransaction(toDeletData));
    toast[data.status ? "success" : "error"](data.message);
  };

  const handleOnSelect = (e) => {
    const { checked, value } = e.target;
    //console.log(checked, value);
    // handle select all checkbox
    if (value === "all") {
      checked
        ? setIdsToDelete(transactions.map((t) => t._id))
        : setIdsToDelete([]);
      return;
    }

    if (checked) {
      //check duplicate id
      // !idsToDelete.includes(value) &&
      setIdsToDelete([...idsToDelete, value]);
    } else {
      //remove id from array
      setIdsToDelete(idsToDelete.filter((id) => id !== value));
    }
  };
  return (
    <Container className="p-5">
      <Row className="bg-dark p-5 rounded-5">
        <Col>
          <div>
            <h1>Transaction</h1>
            <h3>Welcome {user?.username}</h3>
            <button
              className="btn btn-primary"
              onClick={() => {
                setForm({
                  type: "income",
                  description: "",
                  amount: 0,
                  date: "",
                });

                handleShow();
              }}
            >
              Add
            </button>
            <hr />
            <div>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  value="all"
                  label="Select/Unselect all"
                  onChange={handleOnSelect}
                  checked={
                    transactions.length === idsToDelete.length &&
                    transactions.length > 0
                  }
                />
              </Form.Group>
            </div>
            <Table hover variant="dark">
              <thead>
                <tr>
                  <th>Check</th>
                  <th>#</th>
                  <th>Date</th>
                  <th>Title</th>
                  <th>Out</th>
                  <th>In</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t, index) => {
                  console.log(t);
                  return (
                    <tr key={t._id}>
                      {/* <td>
                        <Form.Check value={t._id} onClick={handleOnSelect} />
                      </td> */}
                      <td>
                        <Form.Check
                          type="checkbox"
                          value={t._id}
                          onChange={handleOnSelect}
                          checked={idsToDelete.includes(t._id)}
                        />
                      </td>
                      <td>{index + 1}</td>
                      {/* <td>{t.date.slice(0, 10)}</td> */}
                      <td>{t.date.split("T")[0]}</td>
                      <td>{t.description}</td>
                      {/* <td className="text-danger">
                        {t.type.toLowerCase() == "expense"
                          ? "$" + t.amount
                          : ""}
                      </td>
                      <td className="text-success">
                        {t.type.toLowerCase() == "income" ? "$" + t.amount : ""}
                      </td> */}

                      <td className="text-danger">
                        {t.type == "expense" ? "$" + t.amount : ""}
                      </td>
                      <td className="text-success">
                        {t.type == "income" ? "$" + t.amount : ""}
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            handleOnDelete(t._id);
                          }}
                        >
                          Delete
                        </button>
                        <button
                          className="btn btn-warning"
                          onClick={() => {
                            setForm(t);
                            handleShow();
                          }}
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  {/* <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td> */}
                  <td colSpan={6}></td>
                  <td>Total : {total}</td>
                </tr>
              </tbody>
            </Table>
            {idsToDelete.length > 0 && (
              <div className="d-grid">
                <Button
                  variant="danger"
                  onClick={() => handleOnDelete(null, true)}
                >
                  Delete {idsToDelete.length} transactions
                </Button>
              </div>
            )}
          </div>
        </Col>
      </Row>

      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {form?._id ? "Update" : "Add"} Add Transaction
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TransactionForm
            form={form}
            setForm={setForm}
            handleOnChange={handleOnChange}
            //fetchTransaction={fetchTransaction}
            handleClose={handleClose}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
export default Transaction;

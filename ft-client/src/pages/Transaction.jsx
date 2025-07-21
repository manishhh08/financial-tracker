import React, { useEffect, useState } from "react";
import { getTransation } from "../utils/axiosHelper";
import { Button, Form, Table } from "react-bootstrap";

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const fetchTransaction = async () => {
    // fetch the token from localstorage

    let data = await getTransation();

    console.log(data);
    setTransactions(data.transactions);
  };

  useEffect(() => {
    fetchTransaction();
  }, []);

  //when selected option
  const handleOnChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div>
      Transaction
      {/* <ul>
        {transactions.map((t) => (
          <li>
            {" "}
            <h2>{t.description}</h2>
          </li>
        ))}
      </ul> */}
      {/* table to display data */}
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Description</th>
            <th>Type</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{t.createdAt.split("T")[0]}</td>
              <td>{t.description}</td>
              <td>{t.type}</td>
              <td>{t.amount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <hr />
      <Form>
        <Form.Group className="mb-3" controlId="formAddTransaction">
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" />
          <Form.Label>Select the type:</Form.Label>
          <Form.Select value={selectedOption} onChange={handleOnChange}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </Form.Select>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="description"
            placeholder="Enter transaction description"
          />
          <Form.Label>Amount</Form.Label>
          <Form.Control type="number" placeholder="Enter amount" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Transaction;

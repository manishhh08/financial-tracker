import React from "react";
import useForm from "../hooks/useForm";
import { createTransaction } from "../utils/axiosHelper";
import { toast } from "react-toastify";
import { Button, Form } from "react-bootstrap";
import CustomInput from "./CustomInput";

const TransactionForm = ({ fetchTransaction, handleClose }) => {
  const { form, setForm, handleOnChange } = useForm({
    type: "income",
    description: "",
    amount: 0,
    date: "",
  });

  let inputFields = [
    {
      id: "description",
      label: "Description",
      name: "description",
      type: "text",
      placeholder: "Description",
      value: form.description,
    },
    {
      id: "amount",
      label: "Amount",
      name: "amount",
      type: "number",
      placeholder: "Amount",
      value: form.amount,
    },
    {
      id: "date",
      label: "Date",
      name: "date",
      type: "date",
      placeholder: "Date",
      value: form.date,
    },
  ];

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    // call create transaction api

    let data = await createTransaction(form);

    if (data.status) {
      // successfully created transaction
      toast.success(data.message);
      fetchTransaction();
      // hide modal
      handleClose();
    } else {
      toast.error(data.message);
    }
  };

  return (
    <Form onSubmit={handleOnSubmit}>
      {/* input field for type */}
      <Form.Select
        aria-label="Default select example"
        name="type"
        onChange={handleOnChange}
      >
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </Form.Select>

      {inputFields.map((item) => {
        return <CustomInput {...item} onChange={handleOnChange} />;
      })}

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default TransactionForm;

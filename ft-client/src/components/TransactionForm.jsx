import { toast } from "react-toastify";
import { Button, Form } from "react-bootstrap";
import CustomInput from "./CustomInput";
import { useDispatch } from "react-redux";
import {
  createTransaction,
  updateTransaction,
} from "../features/transactions/transactionAxios";
import { fetchTransactions } from "../features/transactions/transactionActions";

const TransactionForm = ({ form, setForm, handleOnChange, handleClose }) => {
  const dispatch = useDispatch();
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
      value: form.date.split("T")[0] || "",
    },
  ];

  //console.log(111, form.date);
  //console.log(form.date);

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    // call create transaction api

    let data;

    if (form._id) {
      //update the changes
      data = await updateTransaction(form, form._id);
    } else {
      data = await createTransaction(form);
    }

    if (data.status) {
      // successfully created transaction
      toast.success(data.message);
      // fetchTransaction();
      // dispatch the action to update the state
      dispatch(fetchTransactions());
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
        defaultValue={"income"}
      >
        <option value="income" selected={form.type == "income"}>
          Income
        </option>
        <option value="expense" selected={form.type == "expense"}>
          Expense
        </option>
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

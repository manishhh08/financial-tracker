import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CustomInput from "./CustomInput";
import { Navigate, useNavigate } from "react-router-dom";
import { postUser } from "../utils/axiosHelper";
import { toast } from "react-toastify";

const SignupForm = () => {
  const navigate = useNavigate();
  let inputFields = [
    {
      id: "name",
      label: "Name",
      name: "username",
      type: "text",
      placeholder: "Enter Name",
    },
    {
      id: "email",
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Enter Email",
    },
    {
      id: "password",
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Enter Password",
    },

    {
      id: "cpassword",
      label: "Confirm",
      name: "cpassword",
      type: "password",
      placeholder: "Confirm Password",
    },
  ];
  let initialstate = {
    username: "",
    email: "",
    password: "",
  };
  const [form, setForm] = useState(initialstate);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    alert("form submitted");

    //make create user post req from axios
    let data = await postUser(form);
    console.log("response from api is:", data);

    //if success route to login else show error in toast message
    if (data.status) {
      toast.success(data.message);
      navigate("/login");
    } else {
      toast.error(data.message);
    }
  };
  const handleOnChange = (event) => {
    let tempForm = { ...form };
    tempForm[event.target.name] = event.target.value;

    setForm(tempForm);
  };
  return (
    <div>
      <h1>Signup Form</h1>
      <hr />
      <Form onSubmit={handleOnSubmit}>
        {inputFields.map((item) => {
          return <CustomInput {...item} onChange={handleOnChange} />;
        })}

        {/* <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" placeholder="Enter Name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter email" />
        </Form.Group> */}

        {/* <CustomInput
          id="test"
          label={"CUSTOM LABEL"}
          name="custom"
          type={"date"}
          placeholder={"Custo placeholder"}
        /> */}

        {/* <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group> */}

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default SignupForm;

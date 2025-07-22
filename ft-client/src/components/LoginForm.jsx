import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CustomInput from "./CustomInput";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../utils/axiosHelper";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useUser } from "../context/userContext";

const LoginForm = () => {
  let inputFields = [
    {
      id: "email",
      label: "Email",
      name: "email",
      type: "mail",
      placeholder: "Enter your email",
    },

    {
      id: "password",
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Enter your password",
    },
  ];
  let initialDetails = {
    email: "",
    password: "",
  };
  const [savedDetails, setSavedDetails] = useState(initialDetails);
  const { setUser, user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    alert("login successful");

    let data = await loginUser(savedDetails);
    console.log("response from login:", data);

    if (data.status) {
      toast.success(data.message);
      // navigate("/dashboard");

      //when logged in
      setUser(data.user);
      localStorage.setItem("accessToken", data.accessToken);
    } else {
      toast.error(data.message);
    }
  };

  const handleOnChange = (e) => {
    let tempLogin = { ...savedDetails };
    tempLogin[e.target.name] = e.target.value;
    setSavedDetails(tempLogin);
  };

  const pastLocation = location?.state?.from?.pathname || "/transaction";

  useEffect(() => {
    user?._id && navigate(pastLocation);
  }, [user?._id]);
  return (
    <div>
      <h1>Login Here</h1>
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

export default LoginForm;

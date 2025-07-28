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
  const { setUser, user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  let initialState = {
    email: "",
    password: "",
  };
  const [form, setForm] = useState(initialState);

  let inputFields = [
    {
      id: "email",
      label: "Email",
      name: "email",
      type: "email",
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

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    //alert("login successful");

    let data = await loginUser(form);
    console.log("response from login:", data);

    if (data.status) {
      toast.success(data.message);
      // navigate("/dashboard");

      //when logged in
      setUser(data.user);

      //store access token in local storage
      localStorage.setItem("accessToken", data.accessToken);
    } else {
      toast.error(data.message);
    }
  };

  const handleOnChange = (e) => {
    let tempForm = { ...form };
    tempForm[e.target.name] = e.target.value;
    setForm(tempForm);
  };

  const pastLocation = location?.state?.from?.pathname || "/dashboard";

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

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;

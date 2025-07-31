import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <Container className="bg-dark ">
      <Row>
        <Col md={6} className="p-5 rounded text-white">
          <h2>Welcome To Your Personalised Financial Tracker</h2>
        </Col>
        <Col className="p-5 rounded text-white">
          <LoginForm />
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

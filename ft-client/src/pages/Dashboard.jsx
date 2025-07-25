import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { getDashboardInformation, getTransation } from "../utils/axiosHelper";
import { useUser } from "../context/userContext";

const Dashboard = () => {
  //hooks
  const [dashboardObject, setDashboardObject] = useState({
    balance: 1000,
    income: 100,
    expense: 100,
    transaction_no: 101,
    last_transaction: {
      description: "Salary",
      type: "income",
      date: "22-02'2025",
      amount: 10000,
    },
  });

  const fetchDashboardMetric = async () => {
    let data = await getDashboardInformation();
    if (data.status) {
      setDashboardObject(data.metrics);
    }
  };

  //call using api
  useEffect(() => {
    fetchDashboardMetric();
  }, []);
  return (
    <Container>
      <Row className="p-4 gap-4 justify-content-center">
        <Col xs="3" className="p-4 d-flex flex-column rounded bg-warning ">
          <h3>Balance</h3>
          <hr />
          <strong className="fs-1">{dashboardObject?.balance}</strong>
        </Col>
        <Col xs="3" className="p-4 d-flex flex-column rounded bg-danger">
          <h3>Expense</h3>
          <hr />
          <strong className="fs-1">{dashboardObject.expense}</strong>
        </Col>
        <Col xs="3" className="p-4 d-flex flex-column rounded bg-success">
          <h3>Income</h3>
          <hr />
          <strong className="fs-1">{dashboardObject.income}</strong>
        </Col>
      </Row>
      <Row className="p-4 gap-4 justify-content-center">
        <Col xs="3" className="p-4 d-flex flex-column rounded bg-primary">
          <h3>No of Transaction</h3>
          <hr />
          <strong className="fs-1">{dashboardObject?.transaction_no}</strong>
        </Col>

        <Col
          xs="6"
          className="p-4 d-flex flex-column rounded bg-primary-subtle text-dark"
        >
          <h3>Last Transaction</h3>
          <hr />
          <strong className="fs-4">
            Description: {dashboardObject?.last_transaction?.description}
          </strong>
          <strong className="fs-4">
            Amount: {dashboardObject?.last_transaction?.amount}
          </strong>
          <strong className="fs-4">
            Date: {dashboardObject?.last_transaction?.date}
          </strong>
          <strong className="fs-4">
            Type: {dashboardObject?.last_transaction?.type}
          </strong>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;

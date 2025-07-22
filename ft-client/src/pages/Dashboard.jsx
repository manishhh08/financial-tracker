import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { getTransation } from "../utils/axiosHelper";
import { useUser } from "../context/userContext";

const Dashboard = () => {
  //hooks
  const [transaction, setTransaction] = useState([]);
  const { dashboardMessage } = useUser();
  //call using api
  const receiveTransaction = async () => {
    let data = await getTransation();
    setTransaction(data.transaction);
    console.log(dashboardMessage());
  };

  useEffect(() => {
    receiveTransaction();
  }, []);
  return (
    <Container className="p-5">
      {/* {transaction.map((t)=>{})} */}
      <Row className="bg-dark p-5 rounded-5">
        <Col>
          Balance
          <div>
            <h3>The available balance is: {dashboardMessage()}</h3>
          </div>
        </Col>
        <Col>
          Income
          <div>Your current income is:</div>
        </Col>
        <Col>
          Expense
          <div>Your current expense is:</div>
        </Col>
        <Col>
          Number of Transactions
          <div>Your total number of transcation is:</div>
        </Col>
      </Row>
      {/* <Row>
        <Col>Last Transcation</Col>
      </Row> */}
    </Container>
  );
};

export default Dashboard;

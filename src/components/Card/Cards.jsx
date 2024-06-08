import React from "react";
import "./style.css";
import { Card, Row } from "antd";
import Button from "../Button/Button";

const Cards = () => {
  return (
    <Row className="my-row">
      <Card bordered={true}  className="my-card">
        <h2>Current Balance</h2>
        <p>₹0</p>
        <Button  text="Reset Balance" blue={true} />
      </Card>
      <Card bordered={true}  className="my-card">
        <h2>Totol Income</h2>
        <p>₹0</p>
        <Button text="Add Income" blue={true} />
      </Card>
      <Card bordered={true}  className="my-card">
        <h2>Total Expense</h2>
        <p>₹0</p>
        <Button  text="Add Expense" blue={true} />
      </Card>
    </Row>
  );
};

export default Cards;

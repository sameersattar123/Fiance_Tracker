import React from "react";
import "./style.css";
import { Line, Pie } from "@ant-design/charts";

const Charts = ({ transactions }) => {
  const data = transactions.map((item) => {
    return {
      date: item.date,
      amount: item.amount,
    };
  });

  const spendingData = transactions.filter((transaction) => {
    if (transaction.type === "expense") {
      return {
        tag: transaction.tag,
        amount: transaction.amount,
      };
    }
  });

  let finalSpending = spendingData.reduce((acc , obj ) => {
    let key = obj.tag;
    if (!acc[key]) {
      acc[key] = { tag : obj.tag , amount : obj.amount};
    } else {
        acc[key].amount += obj.amount;
    }
    return acc;
  } , {})

  const config = {
    data : data,
    width : 500,
    autoFit : true,
    xField: "date",
    yField: "amount",
  };

  const spendingConfig = {
    data: Object.values(finalSpending),
    width : 500,
    angleField: "amount",
    colorField: "amount",
  };


  return (
    <div className="charts-wrapper">
      <div className="">
        <h2>Your Analytics</h2>
        <Line {...config} />;
      </div>
      <div className="">
        <h2>Your Spending</h2>
        <Pie {...spendingConfig} />
      </div>
    </div>
  );
};

export default Charts;

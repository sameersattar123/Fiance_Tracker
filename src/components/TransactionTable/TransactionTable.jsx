import React, { useState } from "react";
import "./style.css";
import { Radio, Select, Table } from "antd";
import searchImg from "../../assets/search (1).svg";

const TransactionTable = ({ transactions }) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
    },
  ];
  const { Option } = Select;
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [sortKey, setSortKey] = useState("");
  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.name.toLowerCase().includes(search.toLowerCase()) &&
      transaction.type.includes(filterType)
  );

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortKey === "date") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortKey === "amount") {
      return a.amount - b.amount;
    } else {
      return 0;
    }
  });

  return (
    <>
      <div
        style={{
          width: "100%",
          padding: "0rem 2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <div className="input-flex">
            <img src={searchImg} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search By Name"
            />
          </div>
          <Select
            value={filterType}
            onChange={(value) => setFilterType(value)}
            className="select-input"
            allowClear
            placeholder="Filter by type"
          >
            <Option value="">All</Option>
            <Option value="income">Income</Option>
            <Option value="expense">Expense</Option>
          </Select>
        </div>
        <div className="my-table">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              marginBottom: "1rem",
            }}
          >
            <h2>My Transactions</h2>
            <Radio.Group
              className="input-radio"
              onChange={(e) => setSortKey(e.target.value)}
              value={sortKey}
            >
              <Radio.Button value="">No Sort</Radio.Button>
              <Radio.Button value="date">Sort by Date</Radio.Button>
              <Radio.Button value="amount">Sort by Amount</Radio.Button>
            </Radio.Group>
          </div>
        <Table dataSource={sortedTransactions} columns={columns} />
        </div>
      </div>
    </>
  );
};

export default TransactionTable;

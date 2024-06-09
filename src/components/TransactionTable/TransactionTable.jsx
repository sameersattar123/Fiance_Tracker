import React, { useState } from "react";
import "./style.css";
import { Select, Table } from "antd";

const TransactionTable = ({ transactions }) => {
  const { Option } = Select;
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.name.toLowerCase().includes(search.toLowerCase()) &&
      transaction.type.includes(filterType)
  );
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
  return (
    <>
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      <Select
        value={filterType}
        onChange={(value) => setFilterType(value)}
        className="select-filter"
        allowClear
        placeholder="Filter by type"
      >
        <Option value="">All</Option>
        <Option value="income">Income</Option>
        <Option value="expense">Expense</Option>
      </Select>
      <Table dataSource={filteredTransactions} columns={columns} />
    </>
  );
};

export default TransactionTable;

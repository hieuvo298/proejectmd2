// components/Orders.tsx
import React from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { CiSearch } from "react-icons/ci";
import "./oders.css";
interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
  description: string;
}
const Orders: React.FC = () => {
  const columns: ColumnsType<DataType> = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Age", dataIndex: "age", key: "age" },
    { title: "Address", dataIndex: "address", key: "address" },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: () => <button>Delete</button>,
    },
  ];

  const data: DataType[] = [
    {
      key: 1,
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      description:
        "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
    },
    {
      key: 2,
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      description:
        "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
    },
    {
      key: 3,
      name: "Not Expandable",
      age: 29,
      address: "Jiangsu No. 1 Lake Park",
      description: "This not expandable",
    },
    {
      key: 4,
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      description:
        "My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.",
    },
  ];
  return (
    <section className="content">
      <h2>Oders Management</h2>
      <hr style={{ margin: "20px 0" }} />

      <div className="search-box">
        <input id="search" type="search" pattern=".*\S.*" required />
        <span  className="search-icon">
          <CiSearch/>
        </span>
      </div>

      <Table
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>{record.description}</p>
          ),
          rowExpandable: (record) => record.name !== "Not Expandable",
        }}
        dataSource={data}
      />
      {/* Edit Orders Modal */}
    </section>
  );
};

export default Orders;

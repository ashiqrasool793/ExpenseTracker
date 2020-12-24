import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Spin,
  Table,
  Space,
} from "antd";
import * as moment from "moment";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};

const dateFormat = "DD/MM/YYYY";
const currentDate = moment();
const randomGen = Math.floor(Math.random() * 1000 + 1);

export const ExpenseForm = () => {
  const [expenseRecordFields, setExpenseRecordFields] = useState({
    id: randomGen,
    description: "",
    expenseDate: currentDate,
    category: {
      id: "",
      name: "",
    },
    location: "",
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expenseRecords, setExpenseRecords] = useState([]);

  const tableColumns = [
    {
      title: "Name",
      dataIndex: "description",
      key: "name",
    },
    {
      title: "Date",
      dataIndex: "expenseDate",
      key: "date",
      render: (expenseDate) => {
        return <div>{moment(expenseDate).format(dateFormat)}</div>;
      },
    },
    {
      title: "Category",
      dataIndex: ["category", "name"],
      key: "category",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button danger onClick={() => deleteRecord(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const deleteRecord = async (id) => {
    await fetch(`/api/expenses/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then(setExpenseRecords(expenseRecords.filter((item) => item.id !== id)));
  };

  useEffect(() => {
    async function getCategories() {
      await fetch("/api/categories")
        .then((response) => response.json())
        .then((json) => {
          setCategories(json);
        })
        .then(() => setLoading(false));
    }

    getCategories();
  }, []);

  useEffect(() => {
    async function getExpenseRecords() {
      await fetch("/api/expenses")
        .then((response) => response.json())
        .then((json) => {
          setExpenseRecords(json);
        })
        .then(() => setLoading(false));
    }

    getExpenseRecords();
  }, []);

  const onCategoryChange = (selectedCategoryObject) => {
    const name = selectedCategoryObject[0];
    const id = selectedCategoryObject[1];

    setExpenseRecordFields({
      ...expenseRecordFields,
      category: {
        name,
        id,
      },
    });
  };

  const onChange = (changedValue, allValues) => {
    setExpenseRecordFields({
      ...expenseRecordFields,
      ...changedValue,
    });
  };

  const onFinish = async () => {
    await fetch(`/api/expenses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(expenseRecordFields),
    }).then(setExpenseRecords([...expenseRecords, expenseRecordFields]));
  };

  if (loading) return <Spin size="large" />;

  return (
    <React.Fragment>
      <Form
        {...layout}
        layout="horizontal"
        initialValues={{
          ...expenseRecordFields,
        }}
        onValuesChange={onChange}
        size="large"
        onFinish={onFinish}
      >
        <Form.Item label="Description" name="description">
          <Input type="text" placeholder="expense description" />
        </Form.Item>
        <Form.Item label="Category" name="selectCategory">
          <Select onChange={onCategoryChange}>
            {categories.map((item) => {
              return (
                <Select.Option
                  onChange={(item) => onCategoryChange(item)}
                  key={item.id}
                  value={[item.name, item.id]}
                >
                  {item.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label="Date" name="expenseDate">
          <DatePicker format={dateFormat} />
        </Form.Item>
        <Form.Item label="Location" name="location">
          <Input type="text" placeholder="where did you spend it" />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button htmlType="submit" type="primary">
            Save
          </Button>
        </Form.Item>
      </Form>
      <Table
        rowKey="id"
        columns={tableColumns}
        dataSource={expenseRecords}
      ></Table>
    </React.Fragment>
  );
};

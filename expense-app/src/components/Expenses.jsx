import React, { Component } from "react";
import { PageHeader } from "antd";
import { ExpenseForm } from "./ExpenseForm";

class Expenses extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <PageHeader
          className="site-page-header"
          title="Create New Expense Record"
        />
        <ExpenseForm />
      </React.Fragment>
    );
  }
}

export default Expenses;

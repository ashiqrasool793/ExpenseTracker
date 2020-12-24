import React, { Component } from "react";
import { PageHeader } from "antd";

class Home extends Component {
  state = {};
  render() {
    return (
      <PageHeader
        className="site-page-header"
        title="Welcome to Expense Tracker Application"
      />
    );
  }
}

export default Home;

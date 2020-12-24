import React, { useState } from "react";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";

export default function NavBar() {
  const location = useLocation();
  const [current, setCurrent] = useState(location.pathname);

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[current]}
      theme="dark"
      mode="horizontal"
    >
      <Menu.Item key="/">
        <span>Home</span>
        <Link to="/" />
      </Menu.Item>
      <Menu.Item key="/categories">
        <span>Categories</span>
        <Link to="/categories" />
      </Menu.Item>
      <Menu.Item key="/expenses">
        <span>Expenses</span>
        <Link to="/expenses" />
      </Menu.Item>
    </Menu>
  );
}

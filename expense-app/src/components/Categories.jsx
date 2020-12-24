import React, { useState, useEffect } from "react";
import { PageHeader, List, Typography, Spin } from "antd";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <React.Fragment>
      <PageHeader
        className="site-page-header"
        title="View Expense Categories"
      />
      {loading ? (
        <Spin size="large" />
      ) : (
        <React.Fragment>
          <List
            size="large"
            bordered
            dataSource={categories}
            renderItem={(item) => (
              <List.Item>
                <Typography.Text mark>{item.id}</Typography.Text> {item.name}
              </List.Item>
            )}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default Categories;

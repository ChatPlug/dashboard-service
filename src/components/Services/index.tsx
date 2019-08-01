import React, { FunctionComponent } from "react";

import { Layout, Menu, Button, Breadcrumb } from "antd";

const { Content, Sider } = Layout;

import { useLoadInstancesQuery } from "../../generated/graphql";

const Services: FunctionComponent = props => {
  const { data, loading, error } = useLoadInstancesQuery({
    fetchPolicy: "cache-and-network"
  });

  if (loading || error) {
    return <div>Loading</div>;
  }

  return (
    <Layout style={{ background: "#fff" }}>
      <Sider width={200} style={{ background: "#fff", padding: "16px 0" }}>
        <div style={{ textAlign: "center", paddingBottom: "16px" }}>
          <Button
            type="primary"
            style={{ width: 168, display: "inline-block" }}
            shape="round"
          >
            Create instance
          </Button>
        </div>

        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{ height: "100%", float: "right" }}
        >
          {data!!.instances.map(e => (
            <Menu.Item key={e.id}>{e.name}</Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout style={{ padding: "0 24px 24px" }}>
        <Breadcrumb style={{ margin: "24px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Content style={{ minHeight: 280 }}>Services</Content>
      </Layout>
    </Layout>
  );
};

export default Services;
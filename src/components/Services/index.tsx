import React from "react";

import { Layout, Menu, Breadcrumb, Button } from "antd";

const { Content, Sider } = Layout;

import { Query } from "react-apollo";
import { LoadInstances } from "../../queries/types/loadInstances";
import loadInstancesQuery from "../../queries/instancesQuery";

class GetInstancesQuery extends Query<LoadInstances> {}

class Services extends React.Component {
  state = {
    collapsed: false
  };

  onCollapse = (collapsed: boolean) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ background: "#fff" }}>
        <Sider width={200} style={{ background: "#fff", padding: "16px 0" }}>
          <div style={{ textAlign: "center", paddingBottom: "16px" }}>
          <Button
              type="primary"
              style={{ width: 168, display: "inline-block"}} shape="round">
              Create instance
            </Button>
          </div>
          <GetInstancesQuery query={loadInstancesQuery}>
            {({ loading, error, data }) => {
              if (loading) return "Loading...";
              if (error) return `Error! ${error.message}`;
              return (
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
              );
            }}
          </GetInstancesQuery>
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
  }
}

export default Services;

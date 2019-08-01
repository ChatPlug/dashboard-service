import React from "react";

import { Layout, Menu, Breadcrumb, Button } from "antd";

const { Content, Sider } = Layout;

import { Query } from "react-apollo";
import { LoadInstances } from "../../queries/types/loadInstances";
import loadInstancesQuery from "../../queries/instancesQuery";

class GetInstancesQuery extends Query<LoadInstances> {}

class Settings extends React.Component {

  render() {
    return (
      <Layout style={{ background: "#fff" }}>
        Yo thats settings
      </Layout>
    );
  }
}

export default Settings;

import React from "react";

import { Layout, Menu, Button, Breadcrumb, Card } from "antd";
import { Query, Mutation } from "react-apollo";
import {
  LoadThreadGroups,
  LoadThreadGroups_threadGroups,
  LoadThreadGroups_threadGroups_threads
} from "../../queries/types/LoadThreadGroups";
import loadThreadGroupsQuery from "../../queries/threadGroupsQuery";
import deleteThreadMutation from "../../queries/deleteThread";
import { Empty } from "antd";
import { Popconfirm, message } from "antd";
import ThreadGroup from "../ThreadGroup";
import {
  DeleteThread,
  DeleteThreadVariables
} from "queries/types/DeleteThread";

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

class GetThreadGroupsQuery extends Query<LoadThreadGroups> {}

class ThreadGroups extends React.Component<
  {},
  {
    collapsed: boolean;
    selectedGroupId: String | undefined;
  }
> {
  state = {
    collapsed: false,
    selectedGroupId: undefined
  };

  onCollapse = (collapsed: boolean) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <GetThreadGroupsQuery
        query={loadThreadGroupsQuery}
        fetchPolicy="cache-and-network"
      >
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          console.log(data);

          return (
            <Layout>
              <Sider width={200} style={{ background: "#fff" }}>
                <div
                  style={{
                    textAlign: "center",
                    paddingBottom: "16px",
                    paddingTop: "16px"
                  }}
                >
                  <Button
                    type="primary"
                    style={{ width: 168, display: "inline-block" }}
                    shape="round"
                  >
                    New group
                  </Button>
                </div>

                <Menu mode="inline" style={{ height: "100%" }}>
                  {data!!.threadGroups.map(e => (
                    <Menu.Item
                      key={e.id}
                      onClick={() => this.setState({ selectedGroupId: e.id })}
                    >
                      {e.name}
                    </Menu.Item>
                  ))}
                </Menu>
              </Sider>
              <Layout style={{ padding: "0 24px 24px" }}>
                <Breadcrumb style={{ margin: "24px 0" }}>
                  <Breadcrumb.Item>Thread Groups</Breadcrumb.Item>
                  {this.state.selectedGroup !== undefined ? (
                    <Breadcrumb.Item>
                      {this.state.selectedGroup!!.name}
                    </Breadcrumb.Item>
                  ) : (
                    <div />
                  )}
                </Breadcrumb>
                <Content style={{ minHeight: 280 }}>
                  <ThreadGroup selectedGroup={data!!.threadGroups.find((group) => group.id === this.state.selectedGroupId)} />
                </Content>
              </Layout>
            </Layout>
          );
        }}
      </GetThreadGroupsQuery>
    );
  }
}

export default ThreadGroups;

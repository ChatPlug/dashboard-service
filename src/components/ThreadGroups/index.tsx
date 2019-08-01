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
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

export class GetThreadGroupsQuery extends Query<LoadThreadGroups> {}

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
                    >
                      {e.name}
                      <Link to={"/groups/" + e.id} />
                    </Menu.Item>
                  ))}
                </Menu>
              </Sider>
              <Route path="/groups/:id" component={ThreadGroup} />

            </Layout>
          );
        }}
      </GetThreadGroupsQuery>
    );
  }
}

export default ThreadGroups;

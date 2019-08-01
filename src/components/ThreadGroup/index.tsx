import React from "react";

import { Mutation } from "react-apollo";
import {
  LoadThreadGroups_threadGroups,
  LoadThreadGroups_threadGroups_threads
} from "../../queries/types/LoadThreadGroups";
import { client } from "../../index";
import loadThreadGroupsQuery from "../../queries/threadGroupsQuery";
import deleteThreadMutation from "../../queries/deleteThread";
import { Popconfirm, message, Card, Empty, Layout, Breadcrumb } from "antd";
import {
  DeleteThread,
  DeleteThreadVariables
} from "queries/types/DeleteThread";
const { Content } = Layout;

import { GetThreadGroupsQuery } from "../ThreadGroups";

class DeleteThreadMutation extends Mutation<
  DeleteThread,
  DeleteThreadVariables
> {}

class ThreadGroup extends React.Component<{
  id: String | undefined;
}> {
  render() {
    console.log(this.props);
    if (this.props.match.params.id === undefined) {
      return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
    } else {
      return (
        <GetThreadGroupsQuery
          query={loadThreadGroupsQuery}
          fetchPolicy="cache-only"
        >
          {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;
            const group = data!!.threadGroups.find(
              e => e.id === this.props.match.params.id
            );
            return (
              <Layout style={{ padding: "0 24px 24px" }}>
                <Breadcrumb style={{ margin: "24px 0" }}>
                  <Breadcrumb.Item>Thread Groups</Breadcrumb.Item>
                  <Breadcrumb.Item>{group!!.name}</Breadcrumb.Item>
                </Breadcrumb>
                <Content style={{ minHeight: 280 }}>
                  <Card
                    title={group!!.name}
                    extra={<a href="#">Add a thread</a>}
                    style={{ width: "100%" }}
                  >
                    This thread group connects {group!!.threads.length} threads
                    {group!!.threads.map(
                      (e: LoadThreadGroups_threadGroups_threads) => (
                        <DeleteThreadMutation
                          mutation={deleteThreadMutation}
                          refetchQueries={[{ query: loadThreadGroupsQuery }]}
                        >
                          {deleteThread => (
                            <Card
                              key={e.id}
                              style={{ marginTop: 16 }}
                              type="inner"
                              title={e.name}
                              extra={
                                <Popconfirm
                                  title="Are you sure you want to delete this thread?"
                                  onConfirm={() => {
                                    deleteThread({ variables: { id: e.id } });
                                    message.success("Thread deleted");
                                  }}
                                  okText="Yes"
                                  cancelText="No"
                                >
                                  <a href="#">Remove thread</a>
                                </Popconfirm>
                              }
                            >
                              <p>Origin ID: {e.originId}</p>
                              <p>
                                This thread comes from <b>{e.service.name}</b>
                              </p>
                            </Card>
                          )}
                        </DeleteThreadMutation>
                      )
                    )}
                  </Card>
                </Content>
              </Layout>
            );
          }}
        </GetThreadGroupsQuery>
      );
    }
  }
}

export default ThreadGroup;

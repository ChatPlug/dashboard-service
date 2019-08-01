import React, { FunctionComponent } from "react";

import {
  Card,
  Empty,
  Layout,
  Breadcrumb,
  Button,
  Popconfirm,
  message
} from "antd";
const { Content } = Layout;
import Threads from "../Threads";
import { Route } from 'react-router-dom';

import {
  useLoadThreadGroupsQuery,
  useDeleteThreadGroupMutation
} from "../../generated/graphql";
import {withRouter} from 'react-router-dom'

const ThreadGroup: FunctionComponent<{
  match: { params: { id: string }, history: History };
}> = props => {
  const { data, loading, error } = useLoadThreadGroupsQuery({
    fetchPolicy: "cache-and-network"
  });

  const [deleteThreadGroup] = useDeleteThreadGroupMutation({
    refetchQueries: ["loadThreadGroups"]
  });

  if (loading || error) {
    return <div>Loading</div>;
  }

  if (props.match.params.id === undefined) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  } else {
    const group = data!!.threadGroups.find(e => e.id === props.match.params.id);

    return (
      <Layout style={{ padding: "0 24px 24px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
            alignItems: "center"
          }}
        >
          <Breadcrumb style={{ margin: "24px 0" }}>
            <Breadcrumb.Item>Thread Groups</Breadcrumb.Item>
            <Breadcrumb.Item>{group!!.name}</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ flexGrow: 1 }} />
          <Route render={({ history}) => (
          <Popconfirm
            title="Are you sure you want to delete this thread?"
            onConfirm={() => {
              deleteThreadGroup({ variables: { id: group!!.id } });
              history.push('/groups')
              message.success("Thread deleted");
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger">Delete group</Button>
          </Popconfirm>)} />
        </div>
        <Content style={{ minHeight: 280 }}>
          <Card
            title={group!!.name}
            extra={<a href="#">Add a thread</a>}
            style={{ width: "100%" }}
          >
            This thread group connects {group!!.threads.length} threads
            <Threads threads={group!!.threads} />
          </Card>
        </Content>
      </Layout>
    );
  }
};

export default withRouter(ThreadGroup as any); // oof

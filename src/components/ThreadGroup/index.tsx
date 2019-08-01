import React, { FunctionComponent } from "react";

import { Card, Empty, Layout, Breadcrumb } from "antd";
const { Content } = Layout;
import Threads from "../Threads"

import {
  useLoadThreadGroupsQuery,
} from "../../generated/graphql";

const ThreadGroup: FunctionComponent<{
  match: { params: { id: string } };
}> = props => {
  const { data, loading, error } = useLoadThreadGroupsQuery({
    fetchPolicy: "cache-and-network"
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
            <Threads threads={group!!.threads} />
          </Card>
        </Content>
      </Layout>
    );
  }
};

export default ThreadGroup;
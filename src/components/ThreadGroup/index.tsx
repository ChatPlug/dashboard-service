import React from "react";

import { Mutation } from "react-apollo";
import {
  LoadThreadGroups_threadGroups,
  LoadThreadGroups_threadGroups_threads
} from "../../queries/types/LoadThreadGroups";
import loadThreadGroupsQuery from "../../queries/threadGroupsQuery";
import deleteThreadMutation from "../../queries/deleteThread";
import { Popconfirm, message, Card, Empty } from "antd";
import {
  DeleteThread,
  DeleteThreadVariables
} from "queries/types/DeleteThread";

class DeleteThreadMutation extends Mutation<
  DeleteThread,
  DeleteThreadVariables
> {}

class ThreadGroup extends React.Component<{
  selectedGroup: LoadThreadGroups_threadGroups | undefined;
}> {
  render() {
    if (this.props.selectedGroup === undefined) {
      return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
    } else {
      return (
        <Card
          title={this.props.selectedGroup!!.name}
          extra={<a href="#">Add a thread</a>}
          style={{ width: "100%" }}
        >
          This thread group connects {this.props!!.selectedGroup.threads.length}{" "}
          threads
          {this.props!!.selectedGroup.threads.map(
            (e: LoadThreadGroups_threadGroups_threads) => (
              <DeleteThreadMutation
                mutation={deleteThreadMutation}
                refetchQueries={[{ query: loadThreadGroupsQuery }]}
              >
                {deleteThread => (
                  <Card
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
      );
    }
  }
}

export default ThreadGroup;

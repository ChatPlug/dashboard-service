import React, { FunctionComponent } from "react";

import { Popconfirm, message, Card } from "antd";

import {
  useDeleteThreadMutation
} from "../../generated/graphql";

const Threads: FunctionComponent<{ threads: any[] }> = props => {
    const [deleteThread] = useDeleteThreadMutation({
      refetchQueries: ["loadThreadGroups"]
    });
  
    return (
      <div>
        {props.threads.map(e => (
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
              This thread comes from {e.service.service.name} (<b>{e.service.name}</b>)
            </p>
          </Card>
        ))}
      </div>
    );
  };

  export default Threads
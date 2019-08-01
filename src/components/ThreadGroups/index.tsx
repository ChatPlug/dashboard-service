import React, { FunctionComponent, useState, useRef } from "react";

import { Layout, Menu, Button} from "antd";
import ThreadGroup from "../ThreadGroup";
import CreateThreadGroupForm, { CreateThreadGroupMutationFunc } from '../CreateThreadGroupForm'

import { Route, Link } from "react-router-dom";
import { useLoadThreadGroupsQuery } from "../../generated/graphql"
import { WrappedFormUtils } from 'antd/lib/form/Form'

const { Sider } = Layout;


const ThreadGroups: FunctionComponent<{}> = ({}) => {
  const [showAddGroupDialog, setShowAddGroupDialog] = useState(false)

  const createThreadGroup = (createNewThreadGroup: CreateThreadGroupMutationFunc, form: WrappedFormUtils<any>) => {
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      createNewThreadGroup({ variables: { name: values["name"] } });
      form.resetFields();
      setShowAddGroupDialog(false)
    });
  }

  const { data, loading, error } = useLoadThreadGroupsQuery({
    fetchPolicy: "cache-and-network"
  });

  if (loading || error) {
    return <div>Loading</div>;
  }

  const threadGroups = data!!.threadGroups;

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
            onClick={_ => setShowAddGroupDialog(true)}
            shape="round"
          >
            New group
          </Button>
        </div>

        <Menu mode="inline" style={{ height: "100%" }}>
          {threadGroups.map(e => (
            <Menu.Item key={e.id}>
              {e.name}
              <Link to={"/groups/" + e.id} />
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Route path="/groups/:id" component={ThreadGroup} />
      <CreateThreadGroupForm
                visible={showAddGroupDialog}
                onCancel={() => setShowAddGroupDialog(false)}
                onCreate={createThreadGroup}
              />
    </Layout>
  );
};

export default ThreadGroups;
import React, { FunctionComponent } from "react";
import { Modal, Form, Input, Select } from "antd";
import {
  useCreateThreadGroupMutation,
  CreateThreadGroupMutation,
  CreateThreadGroupMutationVariables,
  useSearchThreadsInServiceMutation,
  useAddThreadToGroupMutation,
  useLoadInstancesQuery
} from "../../generated/graphql";
import { MutationFn } from "react-apollo-hooks";
import { useState } from "react";

const { Option } = Select;

export type CreateThreadGroupMutationFunc = MutationFn<
  CreateThreadGroupMutation,
  CreateThreadGroupMutationVariables
>;

interface IProps {
  dismiss: () => void;
  groupId: string;
  visible: boolean;
}

const AddThreadToGroupForm: FunctionComponent<IProps> = props => {
  const [selectedThread, setSelectedThread] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const { data, loading, error } = useLoadInstancesQuery({
    fetchPolicy: "cache-and-network"
  });

  const [searchThreadsMutation, searchRes] = useSearchThreadsInServiceMutation(
    {}
  );
  const searchResults =
    searchRes.loading || searchRes.data == undefined
      ? []
      : searchRes.data!!.searchThreadsInService!!.threads.map(e => (
          <Option key={e.originId}>{e.name}</Option>
        ));

  const [addThreadToGroup] = useAddThreadToGroupMutation({
    refetchQueries: ["loadThreadGroups"]
  });

  const getSelectedService = () => data!!.instances!!.find(e => e.id == selectedService)!!

  const getSelectedThreadName = () =>
    searchRes.data == undefined || selectedThread == undefined
      ? undefined
      : searchRes!!.data!!.searchThreadsInService!!.threads.find(
          e => e.originId == selectedThread
        )!!.name;

  if (loading || error) {
    return <p>Loading..</p>;
  }

  const services = data!!.instances.map(e => (
    <Option key={e.id}>
      {e.service.displayName} ({e.name})
    </Option>
  ));

  return (
    <Modal
      visible={props.visible}
      title="Add a new thread to this group"
      okText="Add"
      onCancel={props.dismiss}
      onOk={() => {
        const thread = searchRes!!.data!!.searchThreadsInService!!.threads.find(
          e => e.originId == selectedThread
        )!!;
        addThreadToGroup({
          variables: {
            instanceId: selectedService!!,
            groupId: props.groupId,
            originId: selectedThread!!,
            name: thread.name!!,
            iconUrl: thread.iconUrl!!
          }
        });
        props.dismiss();
      }}
    >
      <Select
        placeholder="Select your service"
        value={
          selectedService == undefined
            ? undefined
            : `${getSelectedService().service.displayName} (${getSelectedService().name})`
        }
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        style={{ width: "100%", marginBottom: 16 }}
        onChange={(a: string) => {
          setSelectedService(a);
        }}
        notFoundContent={null}
      >
        {services}
      </Select>
      <Select
        loading={searchRes.loading}
        disabled={selectedService == undefined}
        placeholder="Search for thread"
        showSearch
        value={getSelectedThreadName()}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        style={{ width: "100%" }}
        onSearch={query => {
          setSelectedThread(null);
          searchThreadsMutation({
            variables: { q: query, instanceID: selectedService || "" }
          });
        }}
        onChange={(a: string) => {
          setSelectedThread(a);
        }}
        notFoundContent={null}
      >
        {searchResults}
      </Select>
    </Modal>
  );
};

export default AddThreadToGroupForm;

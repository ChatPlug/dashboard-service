import React, { FunctionComponent } from "react";
import { Modal, Form, Input } from "antd";
import { FormComponentProps, WrappedFormUtils } from "antd/lib/form/Form";
import {
  useCreateThreadGroupMutation,
  CreateThreadGroupMutation,
  CreateThreadGroupMutationVariables
} from "../../generated/graphql";
import { MutationFn } from "react-apollo-hooks";

export type CreateThreadGroupMutationFunc = MutationFn<
  CreateThreadGroupMutation,
  CreateThreadGroupMutationVariables
>;

interface IProps {
  onCancel: () => void;
  visible: boolean;
  onCreate: (mutation: CreateThreadGroupMutationFunc, form: WrappedFormUtils<any>) => void;
}

const CreateThreadGroupForm: FunctionComponent<
  IProps & FormComponentProps
> = props => {
  const [createThreadGroup] = useCreateThreadGroupMutation({
    refetchQueries: ["loadThreadGroups"]
  });

  return (
    <Modal
      visible={props.visible}
      title="Create a new thread group"
      okText="Create"
      onCancel={props.onCancel}
      onOk={_ => props.onCreate(createThreadGroup, props.form)}
    >
      <Form layout="vertical">
        <Form.Item label="Name">
          {props.form.getFieldDecorator("name", {
            rules: [
              {
                required: true,
                message: "Please input the name of the thread group"
              }
            ]
          })(<Input />)}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Form.create<IProps & FormComponentProps>()(CreateThreadGroupForm)
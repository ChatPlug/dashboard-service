import { Button, Modal, Form, Input, Radio } from 'antd';
import * as React from "react"
import { Mutation } from "react-apollo"
import { CreateThreadGroup, CreateThreadGroupVariables } from '../../queries/types/createThreadGroup'
import createThreadGroupMutation from '../../queries/createThreadGroup'

class CreateThreadGroupMutation extends Mutation<CreateThreadGroup, CreateThreadGroupVariables> {}

export default Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
          <CreateThreadGroupMutation mutation={createThreadGroupMutation}
            refetchQueries={["LoadThreadGroups"]}
          >
              {(createThreadGroup) => {

                  return (<Modal
                    visible={visible}
                    title="Create a new thread group"
                    okText="Create"
                    onCancel={onCancel}
                    onOk={e => onCreate(createThreadGroup)}
                  >
                    <Form layout="vertical">
                      <Form.Item label="Name">
                        {getFieldDecorator('name', {
                          rules: [{ required: true, message: 'Please input the name of the thread group' }],
                        })(<Input />)}
                      </Form.Item>
                    </Form>
                  </Modal>)
              }}

          </CreateThreadGroupMutation>
        
      );
    }
  },
);

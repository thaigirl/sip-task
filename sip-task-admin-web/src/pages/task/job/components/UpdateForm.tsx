import {Form, Input, Modal} from 'antd';
import React, {Component} from 'react';

import {FormComponentProps} from 'antd/es/form';
import {TableListItem} from '../data.d';

export interface FormValsType extends Partial<TableListItem> {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
}

export interface UpdateFormProps extends FormComponentProps {
  handleUpdateModalVisible: (flag?: boolean, formVals?: FormValsType) => void;
  handleUpdate: (values: FormValsType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
}

const FormItem = Form.Item;
const {TextArea} = Input;

export interface UpdateFormState {
  formVals: FormValsType;
}

class UpdateForm extends Component<UpdateFormProps, UpdateFormState> {
  static defaultProps = {
    handleUpdate: () => {
    },
    handleUpdateModalVisible: () => {
    },
    values: {},
  };

  formLayout = {
    labelCol: {span: 7},
    wrapperCol: {span: 13},
  };

  constructor(props: UpdateFormProps) {
    super(props);

    this.state = {
      formVals: {
        id: props.values.id,
        executorId: props.values.executorId,
        cron: props.values.cron,
        desc: props.values.desc,
        name: props.values.name,
        alarmEmail: props.values.alarmEmail,
        strategy: props.values.strategy,
        timeout: props.values.timeout,
        failRetryCount: props.values.failRetryCount,
        enable: props.values.enable,
        code: props.values.code
      },
    };
  }


  renderContent = (formVals: FormValsType) => {
    const {form} = this.props;
    return [
      <FormItem key="name" {...this.formLayout} label="任务名称">
        {form.getFieldDecorator('name', {
          rules: [{required: true, message: '请输入任务名称名称！'}],
          initialValue: formVals.name,
        })(<Input placeholder="请输入"/>)}
      </FormItem>,
      <FormItem key="desc" {...this.formLayout} label="描述">
        {form.getFieldDecorator('desc', {
          rules: [{required: true, message: '请输入至少五个字符的规则描述！', min: 5}],
          initialValue: formVals.desc,
        })(<TextArea rows={4} placeholder="请输入至少五个字符"/>)}
      </FormItem>,
    ];

  };

  render() {
    const {updateModalVisible, handleUpdateModalVisible, form, handleUpdate, values} = this.props;
    const {formVals} = this.state;
    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
        fieldsValue.id=formVals.id
        handleUpdate(fieldsValue);
      });
    };
    return (
      <Modal
        width={640}
        bodyStyle={{padding: '32px 40px 48px'}}
        destroyOnClose
        title="编辑任务"
        visible={updateModalVisible}
        onOk={okHandle}
        onCancel={() => handleUpdateModalVisible(false, values)}
        afterClose={() => handleUpdateModalVisible()}
      >
        {this.renderContent(formVals)}
      </Modal>
    );
  }
}

export default Form.create<UpdateFormProps>()(UpdateForm);

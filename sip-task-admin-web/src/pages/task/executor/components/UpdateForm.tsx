import {Form, Input, Modal, InputNumber} from 'antd';
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
        name: props.values.name,
        desc: props.values.desc,
        order: props.values.order,
        addressList: props.values.addressList,
        id: props.values.id,
      },
    };
  }


  renderContent = (formVals: FormValsType) => {
    const {form} = this.props;
    return [
      <FormItem key="name" {...this.formLayout} label="执行器名称">
        {form.getFieldDecorator('name', {
          rules: [{required: true, message: '请输入至少1个字符！', min: 1}],
          initialValue: formVals.name,
        })(<Input placeholder="请输入"/>)}
      </FormItem>,
      <FormItem key="desc" {...this.formLayout} label="描述">
        {form.getFieldDecorator('desc', {
          initialValue: formVals.desc,
        })(<TextArea rows={4} placeholder="请输入"/>)}
      </FormItem>,
      <FormItem key="order" {...this.formLayout} label="排序">
        {form.getFieldDecorator('order', {
          rules: [{required: true, message: '请输入排序！'}],
          initialValue: formVals.order,
        })(<InputNumber placeholder="请输入"/>)}
      </FormItem>,
      <FormItem key="addressList" {...this.formLayout} label="执行器地址列表">
        {form.getFieldDecorator('addressList', {
          rules: [{required: true, message: '请输入至少1个字符', min: 1}],
          initialValue: formVals.addressList,
        })(<TextArea rows={4} placeholder="请输入执行器地址列表！"/>)}
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
        fieldsValue.id = formVals.id
        handleUpdate(fieldsValue);
      });
    };
    return (
      <Modal
        width={640}
        bodyStyle={{padding: '32px 40px 48px'}}
        destroyOnClose
        title="更新执行器"
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

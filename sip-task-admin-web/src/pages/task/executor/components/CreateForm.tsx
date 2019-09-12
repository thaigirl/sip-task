import {Form, Input, Modal,InputNumber} from 'antd';

import {FormComponentProps} from 'antd/es/form';
import React from 'react';
import TextArea from "antd/lib/input/TextArea";

const FormItem = Form.Item;

interface CreateFormProps extends FormComponentProps {
  modalVisible: boolean;
  handleAdd: (fieldsValue: { desc: string }) => void;
  handleModalVisible: () => void;
}

const CreateForm: React.FC<CreateFormProps> = props => {
  const {modalVisible, form, handleAdd, handleModalVisible} = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      destroyOnClose
      title="新建执行器"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{span: 7}} wrapperCol={{span: 15}} label="执行器名称">
        {form.getFieldDecorator('name', {
          rules: [{required: true, message: '请输入至少五个字符！', min: 5}],
        })(<Input placeholder="请输入"/>)}
      </FormItem>
      <FormItem labelCol={{span: 7}} wrapperCol={{span: 15}} label="描述">
        {form.getFieldDecorator('desc', {})(<TextArea rows={4} placeholder="请输入"/>)}
      </FormItem>
      <FormItem labelCol={{span: 7}} wrapperCol={{span: 15}} label="排序">
        {form.getFieldDecorator('order', {
          rules: [{required: true, message: '请输入排序！'}],
        })(<InputNumber placeholder="请输入"/>)}
      </FormItem>
      <FormItem labelCol={{span: 7}} wrapperCol={{span: 15}} label="执行器地址列表">
        {form.getFieldDecorator('addressList', {
          rules: [{required: true, message: '请输入至少五个字符！', min: 5}],
        })(<TextArea rows={4} placeholder="请输入"/>)}
      </FormItem>
    </Modal>
  );
};

export default Form.create<CreateFormProps>()(CreateForm);

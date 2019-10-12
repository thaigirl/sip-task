import {Button, Form, Icon, Input, InputNumber, Modal} from 'antd';

import {FormComponentProps} from 'antd/es/form';
import React from 'react';
import TextArea from "antd/lib/input/TextArea";
// @ts-ignore
import uuid from 'uuid'

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
  const add = () => {
    const keys: Map<string, string> = form.getFieldValue('addressMap');
    const nextKeys = keys.set(uuid(), '');
    form.setFieldsValue({
      addressMap: nextKeys,
    });
  };
  const addressChange = (e: any) => {
    const keys: Map<string, string> = form.getFieldValue('addressMap');
    keys.set(e.target.id, e.target.value);
    form.setFieldsValue({
      addressMap: keys,
    });
  }
  const remove = (k: string) => {
    const keys: Map<string, string> = form.getFieldValue('addressMap');
    if (keys.size === 1) {
      return;
    }

    keys.forEach((value: string, key: string) => {
      if (key === k) {
        keys.delete(key)
      }
    });
    form.setFieldsValue({
      addressMap: keys,
    });
  };
  const {getFieldDecorator, getFieldValue} = props.form;
  const formItemLayout = {
    labelCol: {
      span: 7,
    },
    wrapperCol: {
      span: 15,
    },
  };
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      span: 15,
      offset: 7,
    },
  };
  const validFunction = (rule: any, value: string, callback: any) => {
    const sRegex = '((https|http)://)([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4}|localhost)(:[0-9]+)?(/.*)?';
    const re = new RegExp(sRegex, 'g');
    if (re.test(value)) {
      callback(); // 校验通过
    }
    callback('请输入符合规范的域名/IP'); // 校验未通过
  }

  const addressMap = new Map();
  addressMap.set(uuid(), '');
  getFieldDecorator('addressMap', {initialValue: addressMap});
  const keys: Map<string, string> = getFieldValue('addressMap');
  const formItems: any[] = [];
  let keyIndex = 0;
  keys.forEach((value: string, key: string) => {
    keyIndex++;
    formItems.push(
      <Form.Item
        {...(keyIndex === 1 ? formItemLayout : formItemLayoutWithOutLabel)}
        label={keyIndex === 1 ? '执行器地址列表' : ''}
        key={key}
      >
        {getFieldDecorator(key, {
          initialValue: value,
          validateTrigger: ['onChange'],
          rules: [
            {
              required: true,
              whitespace: true,
              message: "请输入正确的URL",
            }, {
              validator: validFunction
            }
          ],
        })(<Input placeholder="请输入URL" onChange={addressChange} style={{width: '90%', marginRight: 8}}/>)}
        {keys.size > 1 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => remove(key)}
          />
        ) : null}
      </Form.Item>,
    );
  });
  return (
    <Modal
      destroyOnClose
      title="新建执行器"
      visible={modalVisible}
      onOk={okHandle}
      width={800}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{span: 7}} wrapperCol={{span: 15}} label="执行器名称">
        {form.getFieldDecorator('name', {
          rules: [{required: true, message: '请输入至少1个字符！', min: 1}],
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
      {formItems}
      <FormItem {...formItemLayoutWithOutLabel}>
        <Button type="dashed" onClick={add} style={{width: '60%'}}>
          <Icon type="plus"/> 增加一行
        </Button>
      </FormItem>
    </Modal>
  );
};

export default Form.create<CreateFormProps>()(CreateForm);

import {Button, Form, Icon, Input, InputNumber, Modal} from 'antd';
import React, {Component} from 'react';

import {FormComponentProps} from 'antd/es/form';
// @ts-ignore
import uuid from 'uuid'
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
        addressMap: props.values.addressMap,
        id: props.values.id,
      },
    };
  }


  renderContent = (formVals: FormValsType) => {
    const {form} = this.props;
    const {getFieldDecorator} = this.props.form;
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
      if (!value) {
        callback('请输入正确的URL');
        return;
      }
      callback('请输入正确的URL'); // 校验未通过
    }
    const keys: Map<string, string> = formVals.addressMap == undefined ? new Map() : formVals.addressMap;
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
                whitespace: true,
                validator: validFunction,
              }
            ],
          })(<Input placeholder="请输入URL" onChange={this.addressChange} style={{width: '90%', marginRight: 8}}/>)}
          {keys.size > 1 ? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              onClick={() => this.remove(key)}
            />
          ) : null}
        </Form.Item>
      );
    });

    let retrunArray = [
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
    ];
    retrunArray = retrunArray.concat(formItems);
    retrunArray.push(
      <FormItem {...formItemLayoutWithOutLabel} key={uuid()}>
        <Button type="dashed" onClick={this.add} style={{width: '60%'}}>
          <Icon type="plus"/> 增加一行
        </Button>
      </FormItem>
    )
    return retrunArray;
  };

  add = () => {
    let keys = this.state.formVals.addressMap;
    if (!keys) {
      keys = new Map<string, string>();
    }
    if (keys) {
      const nextKeys = keys.set(uuid(), '');
      const newState = this.state.formVals;
      newState.addressMap = nextKeys;
      this.setState({
        formVals: {...newState}
      });
    }
  };

  addressChange = (e: any) => {
    const keys = this.state.formVals.addressMap;
    if (keys) {
      keys.set(e.target.id, e.target.value);
    }
    const newState = this.state.formVals;
    newState.addressMap = keys;
    this.setState({
      formVals: {...newState}
    })
  }

  remove = (k: string) => {
    const keys = this.state.formVals.addressMap;
    if (keys) {
      if (keys.size === 1) {
        return;
      }
      keys.forEach((value: string, key: string) => {
        if (key === k) {
          keys.delete(key)
        }
      });
      const newState = this.state.formVals;
      newState.addressMap = keys;
      this.setState({
        formVals: {...newState}
      })
    }
  };

  render() {
    const {updateModalVisible, handleUpdateModalVisible, form, handleUpdate, values} = this.props;
    const {formVals} = this.state;
    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
        fieldsValue.id = formVals.id;
        fieldsValue.addressMap = formVals.addressMap;
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

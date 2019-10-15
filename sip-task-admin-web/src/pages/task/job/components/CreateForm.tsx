import {Col, Divider, Form, Input, InputNumber, Modal, Row, Select, Switch} from 'antd';

import {FormComponentProps} from 'antd/es/form';
import React from 'react';
import TextArea from "antd/es/input/TextArea";
import Button from "antd/lib/button/button";
import {Dispatch} from "redux";
import ParamRow from './ParamRow'
import {executor} from "../data"
import Cron from "@/components/Cron";

const FormItem = Form.Item;
const {Option} = Select;

interface CreateFormProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  createModalVisible: boolean;
  handleAdd: (fieldsValue: { desc: string }) => void;
  handleModalVisible: () => void;
  changeRowIndex: (bl: boolean, index: string) => void;
  removeIndex: (key: string) => void;
  handleParamChange: (key: any, e: any, type: any) => void;
  initExcutorOption: () => any;
  rowIndexArr: Map<string, any>;
  executors: executor[];
}


const CreateForm: React.FC<CreateFormProps> = props => {
  const {createModalVisible, form, handleAdd, handleModalVisible, changeRowIndex, rowIndexArr, removeIndex, executors, handleParamChange, initExcutorOption} = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      // form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  const content = (): any => {
    const arr: any[] = [];
    rowIndexArr.forEach((value, key) => {
      arr.push(<ParamRow param={{key: "", type: "", value: ""}} handleParamChange={handleParamChange}
                         removeIndex={removeIndex} unk={key} key={key}/>);
    });
    return arr
  };

  const handleCron = (cron: string): void => {
    form.setFieldsValue({cron})
  };

  return (
    <Modal
      destroyOnClose
      title="新建任务"
      visible={createModalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
      width="800px"
    >
      <Divider>JOB信息</Divider>
      <Row gutter={{md: 8, lg: 24, xl: 48}}>
        <Col md={12} sm={24}>
          <FormItem labelCol={{span: 7}} wrapperCol={{span: 15}} label="执行器">
            {form.getFieldDecorator('executorId', {
              initialValue: executors.length ? executors[0].id : '',
              rules: [{required: true, message: '请选择执行器'}],
            })(
              <Select style={{width: "100%"}} placeholder="请选择">
                {initExcutorOption()}
              </Select>
            )}
          </FormItem>
        </Col>
        <Col md={12} sm={24}>
          <FormItem labelCol={{span: 7}} wrapperCol={{span: 15}} label="名称">
            {form.getFieldDecorator('name', {
              rules: [{required: true, message: '请输入至少一个字符！', min: 1}],
            })(<Input placeholder="请输入"/>)}
          </FormItem>
        </Col>
      </Row>
      <Row gutter={{md: 8, lg: 24, xl: 48}}>
        <Col md={12} sm={24}>
          <FormItem labelCol={{span: 7}} wrapperCol={{span: 15}} label="调度CODE">
            {form.getFieldDecorator('code', {
              rules: [{required: true, message: '请输入至少一个字符！', min: 1}],
            })(<Input placeholder="请输入"/>)}
          </FormItem>
        </Col>
        <Col md={12} sm={24}>
          <FormItem labelCol={{span: 7}} wrapperCol={{span: 15}} label="CRON">
            {form.getFieldDecorator('cron', {
              rules: [{required: true, message: '请输入至少五个字符！', min: 5}],
            })(<Input placeholder="请输入" style={{width: '80%', marginRight: 8}}/>)}
            <div style={{display: "inline-block"}}>
              <Cron dispatch={props.dispatch} fiveRecentTimedata={[]} handleCron={handleCron}/>
            </div>
          </FormItem>
        </Col>
      </Row>
      <Row gutter={{md: 8, lg: 24, xl: 48}}>
        <Col md={12} sm={24}>
          <FormItem labelCol={{span: 7}} wrapperCol={{span: 15}} label="执行策略">
            {form.getFieldDecorator(`strategy`, {
              initialValue: "BLOCKING",
              rules: [{required: true, message: '请选择执行策略'}],
            })(
              <Select style={{width: "100%"}}>
                <Option value="BLOCKING">阻塞</Option>
                <Option value="CONCURRENT">并行</Option>
              </Select>
            )}
          </FormItem>
        </Col>
        <Col md={12} sm={24}>
          <FormItem labelCol={{span: 7}} wrapperCol={{span: 15}} label="超时时间(s)">
            {form.getFieldDecorator('timeout', {
              rules: [{required: true, message: '请输入数字 '}],
            })(<InputNumber style={{width: "100%"}} placeholder="请输入"/>)}
          </FormItem>
        </Col>
      </Row>
      <Row gutter={{md: 8, lg: 24, xl: 48}}>
        <Col md={12} sm={24}>
          <FormItem labelCol={{span: 7}} wrapperCol={{span: 15}} label="重试次数">
            {form.getFieldDecorator('failRetryCount', {
              rules: [{required: true, message: '请输入数字！'}],
            })(<InputNumber style={{width: "100%"}} placeholder="请输入"/>)}
          </FormItem>
        </Col>
        <Col md={12} sm={24}>
          <FormItem labelCol={{span: 7}} wrapperCol={{span: 15}} label="报警邮件">
            {form.getFieldDecorator('alarmEmail', {
              rules: [{required: false, message: '多个用"，"分割 ', min: 5}],
            })(<Input placeholder="多个用'，'分割"/>)}
          </FormItem>
        </Col>
      </Row>
      <Row gutter={{md: 8, lg: 24, xl: 48}}>
        <Col md={12} sm={24}>
          <FormItem labelCol={{span: 7}} wrapperCol={{span: 15}} label="描述">
            {form.getFieldDecorator('desc', {
              rules: [{required: false, message: '请输入至少五个字符！'}],
            })(<TextArea placeholder="请输入"/>)}
          </FormItem>
        </Col>
        <Col md={12} sm={24}>
          <FormItem labelCol={{span: 7}} wrapperCol={{span: 15}} label="是否启用">
            {form.getFieldDecorator('enable',)(<Switch defaultChecked/>)}
          </FormItem>
        </Col>
      </Row>
      <Divider>参数</Divider>


      {content()}
      <Button icon="plus" type="primary" onClick={() => changeRowIndex(true, "")}>
      </Button>
    </Modal>
  );
}

export default Form.create<CreateFormProps>()(CreateForm);

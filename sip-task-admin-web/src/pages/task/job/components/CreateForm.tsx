import {Col, Divider, Form, Input, Modal, Row, Select} from 'antd';

import {FormComponentProps} from 'antd/es/form';
import React from 'react';
import TextArea from "antd/es/input/TextArea";
import ParamRow from './ParamRow'
import Button from "antd/lib/button/button";
import {executor} from "../data"

const FormItem = Form.Item;
const {Option} = Select

interface CreateFormProps extends FormComponentProps {
  modalVisible: boolean;
  handleAdd: (fieldsValue: { desc: string }) => void;
  handleModalVisible: () => void;
  changeRowIndex: (bl: boolean,index:string) => void;
  removeIndex: (key:string)=>void;
  rowIndexArr: Map<string,any>;
  executors:Array<executor>;
  checkValue:any;
  changeCheckValue:(e:string) => void;
}


const CreateForm: React.FC<CreateFormProps> = props => {
    const {modalVisible, form, handleAdd, handleModalVisible, changeRowIndex, rowIndexArr,removeIndex,executors,checkValue,changeCheckValue} = props;
    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
        handleAdd(fieldsValue);
      });
    };
    const content = (): any => {
      let arr :any[]=[];
      rowIndexArr.forEach((value,key)=>{
        arr.push(<ParamRow removeIndex = {removeIndex} unk={key} key={key}/>);
      });
      return arr
    };
    const options = (): any =>{
      const arr : any[] = [];
      for (let i = 0; i < executors.length; i++) {
        let exec = executors[i];
        arr.push(<Option key = {exec.id} value={exec.id}>{exec.name}</Option>)
      }
      return arr;
    };



    return (
      <Modal
        destroyOnClose
        title="新建任务"
        visible={modalVisible}
        onOk={okHandle}
        onCancel={() => handleModalVisible()}
        width={"800px"}
      >
        <Divider>JOB信息</Divider>
        <Row gutter={{md: 8, lg: 24, xl: 48}}>
          <Col md={12} sm={24}>
            <FormItem labelCol={{span: 7}} wrapperCol={{span: 15}} label="执行器">
              {form.getFieldDecorator('username', {
                initialValue: executors.length ? executors[0].id : '',
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Select style={{width: "100%" }} placeholder={'请选择'}>
                  {options()}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <FormItem labelCol={{span: 7}} wrapperCol={{span: 15}} label="名称">
              {form.getFieldDecorator('desc', {
                rules: [{required: true, message: '请输入至少五个字符！', min: 5}],
              })(<Input placeholder="请输入"/>)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{md: 8, lg: 24, xl: 48}}>
          <Col md={12} sm={24}>
            <FormItem labelCol={{span: 7}} wrapperCol={{span: 15}} label="调度CODE">
              {form.getFieldDecorator('name', {
                rules: [{required: true, message: '请输入至少五个字符！', min: 5}],
              })(<Input placeholder="请输入"/>)}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <FormItem labelCol={{span: 7}} wrapperCol={{span: 15}} label="CRON">
              {form.getFieldDecorator('cron', {
                rules: [{required: true, message: '请输入至少五个字符！', min: 5}],
              })(<Input placeholder="请输入"/>)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{md: 8, lg: 24, xl: 48}}>
          <Col md={12} sm={24}>
            <FormItem labelCol={{span: 7}} wrapperCol={{span: 15}} label="执行策略">
              {form.getFieldDecorator('name', {
                rules: [{required: true, message: '请输入至少五个字符！', min: 5}],
              })(<Input placeholder="请输入"/>)}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <FormItem labelCol={{span: 7}} wrapperCol={{span: 15}} label="超时时间(s)">
              {form.getFieldDecorator('desc', {
                rules: [{required: true, message: '请输入数字 ', min: 5}],
              })(<Input placeholder="请输入"/>)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{md: 8, lg: 24, xl: 48}}>
          <Col md={12} sm={24}>
            <FormItem labelCol={{span: 7}} wrapperCol={{span: 15}} label="重试次数">
              {form.getFieldDecorator('name', {
                rules: [{required: true, message: '请输入至少五个字符！', min: 5}],
              })(<Input placeholder="请输入"/>)}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <FormItem labelCol={{span: 7}} wrapperCol={{span: 15}} label="报警邮件">
              {form.getFieldDecorator('desc', {
                rules: [{required: true, message: '多个用"，"分割 ', min: 5}],
              })(<Input placeholder="多个用'，'分割"/>)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{md: 8, lg: 24, xl: 48}}>
          <Col md={12} sm={24}>
            <FormItem labelCol={{span: 7}} wrapperCol={{span: 15}} label="描述">
              {form.getFieldDecorator('desc', {
                rules: [{required: true, message: '请输入至少五个字符！', min: 5}],
              })(<TextArea placeholder="请输入"/>)}
            </FormItem>
          </Col>
        </Row>
        <Divider>参数</Divider>
        <Button icon="plus" type="primary" onClick={() => changeRowIndex(true,"")}>
        </Button>
        {content()}
      </Modal>
    );
  }
;

export default Form.create<CreateFormProps>()(CreateForm);

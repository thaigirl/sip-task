import {Col, Divider, Form, Input, InputNumber, Modal, Row, Select, Switch} from 'antd';
import React, {Component} from 'react';

import {FormComponentProps} from 'antd/es/form';
import {TableListItem} from '../data.d';
import TextArea from "antd/es/input/TextArea";
import Button from "antd/lib/button/button";
import ParamRow from "@/pages/task/job/components/ParamRow";

const {Option} = Select;
const FormItem = Form.Item;

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
  removeIndex: (key:string)=>void;
  changeRowIndex: (bl: boolean,index:string) => void;
  handleParamChange: (key:any,e:any,type:any)=>void;
  initExcutorOption: () => any;
  rowIndexArr: Map<string,any>;
}


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
    console.log(props.values);
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



  render() {
    const {updateModalVisible, handleUpdateModalVisible, form, handleUpdate, values,rowIndexArr,handleParamChange,removeIndex,initExcutorOption,changeRowIndex} = this.props;
    const {formVals} = this.state;
    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        // form.resetFields();
        fieldsValue.id=formVals.id;
        handleUpdate(fieldsValue);
      });
    };
    const content = (): any => {
      let arr :any[]=[];
      rowIndexArr.forEach((value,key)=>{
        console.log(rowIndexArr);
        arr.push(<ParamRow param = {value}  handleParamChange = {handleParamChange} removeIndex = {removeIndex} unk={key} key={key}/>);
      });
      return arr
    };
    console.log(formVals.enable);
    return (
      <Modal
        width={"800px"}
        bodyStyle={{padding: '32px 40px 48px'}}
        destroyOnClose
        title="编辑任务"
        visible={updateModalVisible}
        onOk={okHandle}
        onCancel={() => handleUpdateModalVisible(false, values)}
        afterClose={() => handleUpdateModalVisible()}
      >
        <Divider>JOB信息</Divider>
        <Row gutter={{md: 8, lg: 24, xl: 48}}>
          <Col md={12} sm={24}>
            <FormItem labelCol={{span: 7}} wrapperCol={{span: 15}} label="执行器">
              {form.getFieldDecorator('executorId', {
                initialValue: formVals.executorId,
                rules: [{ required: true, message: '请选择执行器' }],
              })(
                <Select style={{width: "100%" }} placeholder={'请选择'}>
                  {initExcutorOption()}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <FormItem labelCol={{span: 7}} wrapperCol={{span: 15}} label="名称">
              {form.getFieldDecorator('name', {
                initialValue: formVals.name,
                rules: [{required: true, message: '请输入至少一个字符！', min: 1}],
              })(<Input placeholder="请输入"/>)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{md: 8, lg: 24, xl: 48}}>
          <Col md={12} sm={24}>
            <FormItem labelCol={{span: 7}} wrapperCol={{span: 15}} label="调度CODE">
              {form.getFieldDecorator('code', {
                initialValue: formVals.code,
                rules: [{required: true, message: '请输入至少一个字符！', min: 1}],
              })(<Input placeholder="请输入"/>)}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <FormItem labelCol={{span: 7}} wrapperCol={{span: 15}} label="CRON">
              {form.getFieldDecorator('cron', {
                initialValue: formVals.cron,
                rules: [{required: true, message: '请输入至少五个字符！', min: 5}],
              })(<Input placeholder="请输入"/>)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{md: 8, lg: 24, xl: 48}}>
          <Col md={12} sm={24}>
            <FormItem labelCol={{span: 7}} wrapperCol={{span: 15}} label="执行策略">
              {form.getFieldDecorator(`strategy`, {
                initialValue: formVals.strategy,
                rules: [{ required: true, message: '请选择执行策略' }],
              })(
                <Select  style={{width: "100%"}}>
                  <Option value="BLOCKING">阻塞</Option>
                  <Option value="CONCURRENT">并行</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <FormItem labelCol={{span: 7}} wrapperCol={{span: 15}} label="超时时间(s)">
              {form.getFieldDecorator('timeout', {
                initialValue: formVals.timeout,
                rules: [{required: true, message: '请输入数字 '}],
              })(<InputNumber style={{width: "100%" }} placeholder="请输入"/>)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{md: 8, lg: 24, xl: 48}}>
          <Col md={12} sm={24}>
            <FormItem labelCol={{span: 7}} wrapperCol={{span: 15}} label="重试次数">
              {form.getFieldDecorator('failRetryCount', {
                initialValue: formVals.failRetryCount,
                rules: [{required: true, message: '请输入数字！'}],
              })(<InputNumber style={{width: "100%" }} placeholder="请输入"/>)}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <FormItem labelCol={{span: 7}} wrapperCol={{span: 15}} label="报警邮件">
              {form.getFieldDecorator('alarmEmail', {
                initialValue: formVals.alarmEmail,
                rules: [{required: false, message: '多个用"，"分割 ', min: 5}],
              })(<Input placeholder="多个用'，'分割"/>)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{md: 8, lg: 24, xl: 48}}>
          <Col md={12} sm={24}>
            <FormItem labelCol={{span: 7}} wrapperCol={{span: 15}} label="描述">
              {form.getFieldDecorator('desc', {
                initialValue: formVals.desc,
                rules: [{required: true, message: '请输入至少五个字符！', min: 5}],
              })(<TextArea placeholder="请输入"/>)}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <FormItem labelCol={{span: 7}} wrapperCol={{span: 15}} label="是否启用">
              {form.getFieldDecorator('enable',{
                initialValue: formVals.enable,
              } )
              (<Switch />)}
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
}

export default Form.create<UpdateFormProps>()(UpdateForm);

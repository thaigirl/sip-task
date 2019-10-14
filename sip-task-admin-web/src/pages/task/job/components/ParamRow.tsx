import {Col, Form, Input, Row, Select} from 'antd';

import {FormComponentProps} from 'antd/es/form';
import React from 'react';
import Button from "antd/lib/button/button";
import {Param} from "../data"

const {Option} = Select;
const FormItem = Form.Item;
interface ParamProps extends FormComponentProps{
  removeIndex:(index:string) => void;
  handleParamChange: (key:any,e:any,type:any)=>void;
  unk:string;
  param: Param;
}

const ParamRow: React.FC<ParamProps> = props => {
  const {form,unk,removeIndex,handleParamChange,param} = props;
  return (
    <Row gutter={{md: 8, lg: 24, xl: 48}}>
      <Col md={7} sm={24}>
        <FormItem labelCol={{span: 7}} wrapperCol={{span: 15}} label="key">
          {form.getFieldDecorator(`key[1]`, {
            initialValue: param.key,
            rules: [{required: true, message: 'key不允许为空！', min: 1}],
          })(<Input onBlur={(e)=>{handleParamChange(unk,e,'key')}}  placeholder="key"/>)}
        </FormItem>
      </Col>
      <Col md={7} sm={24}>
        <FormItem labelCol={{span: 7}} wrapperCol={{span: 15}} label="type">
          {form.getFieldDecorator(`type[1]`, {
            initialValue: param.type || "STRING",
            rules: [{ required: true, message: '请选择参数类型' }],
          })(
          <Select onChange={(e:any)=>{handleParamChange(unk,e,'type')}} style={{width: 120}}>
            <Option value="STRING">字符串</Option>
            <Option value="NUMBER">数字</Option>
            <Option value="DATE">日期</Option>
          </Select>
          )}
        </FormItem>
      </Col>
      <Col md={7} sm={24}>
        <FormItem labelCol={{span: 7}} wrapperCol={{span: 15}} label="value">
          {form.getFieldDecorator(`value[1]`, {
            initialValue: param.value,
            rules: [{required: true, message: 'value不允许为空！', min: 1}],
          })(<Input onBlur={(e)=>{handleParamChange(unk,e,'value')}} placeholder="value"/>)}
        </FormItem>
      </Col>
      <Col md={3} sm={24}>
        <FormItem labelAlign={"left"}>
        <Button icon="minus" onClick={()=>removeIndex(unk)} type="danger">
        </Button></FormItem>
      </Col>

    </Row>
  );
};
export default Form.create<ParamProps>()(ParamRow);

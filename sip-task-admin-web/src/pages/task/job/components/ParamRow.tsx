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
  const validFunction = (rule: any, value: string, callback: any) => {
    if (form.getFieldValue("type")[1] == "DATE"){
      console.log("ok");
      const sRegex = '^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$';
      const re = new RegExp(sRegex, 'g');
      if (re.test(value)) {
        callback(); // 校验通过
      }
      callback('日期格式yyyy-mm-dd'); // 校验未通过
    }
  };
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
            rules: [{required: true, message: 'value不允许为空！', min: 1},{validator:validFunction}],
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

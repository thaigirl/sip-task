import {Col, Form, Input, Row, Select,Icon} from 'antd';

import {FormComponentProps} from 'antd/es/form';
import React from 'react';
import Button from "antd/lib/button/button";



const FormItem = Form.Item;
interface ParamProps extends FormComponentProps{
  removeIndex:(index:string) => void;
  unk:string;
}

const ParamRow: React.FC<ParamProps> = props => {
  const {form,unk,removeIndex} = props;
  return (
    <Row gutter={{md: 8, lg: 24, xl: 48}}>
      <Col md={7} sm={24}>
        <FormItem labelCol={{span: 7}} wrapperCol={{span: 15}} label="key">
          {form.getFieldDecorator('name', {
            rules: [{required: true, message: 'key不允许为空！', min: 1}],
          })(<Input placeholder="key"/>)}
        </FormItem>
      </Col>
      <Col md={6} sm={24}>
        <FormItem labelCol={{span: 7}} wrapperCol={{span: 15}} label="type">
          <Select defaultValue="STRING" style={{width: 120}}>
            <Option value="STRING">字符串</Option>
            <Option value="NUMBER">数字</Option>
            <Option value="DATE">日期</Option>
          </Select>
        </FormItem>
      </Col>
      <Col md={8} sm={24}>
        <FormItem labelCol={{span: 7}} wrapperCol={{span: 15}} label="value">
          {form.getFieldDecorator('cron', {
            rules: [{required: true, message: 'value不允许为空！', min: 1}],
          })(<Input placeholder="value"/>)}
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

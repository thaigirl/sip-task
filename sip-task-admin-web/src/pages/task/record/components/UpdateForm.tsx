import {Button, DatePicker, Divider, Form, Input, Modal, Radio, Select, Steps} from 'antd';
import React, { Component } from 'react';

import { FormComponentProps } from 'antd/es/form';
import { TableListItem } from '../data.d';
import ReactMarkdown from "react-markdown";

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

export interface UpdateFormState {
  formVals: FormValsType;
  currentStep: number;
}

class UpdateForm extends Component<UpdateFormProps, UpdateFormState> {
  static defaultProps = {
    handleUpdate: () => {},
    handleUpdateModalVisible: () => {},
    values: {},
  };

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  constructor(props: UpdateFormProps) {
    super(props);

    this.state = {
      formVals: {
        name: props.values.name,
        desc: props.values.desc,
        key: props.values.key,
        target: '0',
        template: '0',
        type: '1',
        time: '',
        frequency: 'month',
      },
      currentStep: 0,
    };
  }



  render() {
    const { updateModalVisible, handleUpdateModalVisible, values } = this.props;
    const markdown = "<code>2019-09-25 10:24:35   ERROR   com.sip.task.core.context.ExecutorInstance   an exception" +
      " occurred during the task java.lang.reflect.InvocationTargetException\n" +
      "\tat sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)\n" +
      "\tat sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)\n" +
      "\tat sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)\n" +
      "\tat java.lang.reflect.Method.invoke(Method.java:498)\n" +
      "\tat com.sip.task.core.context.ExecutorInstance$exec$1.run(ExecutorInstance.kt:39)\n" +
      "\tat java.util.concurrent.Executors$RunnableAdapter.call(Executors.java:511)\n" +
      "\tat java.util.concurrent.FutureTask.run$$$capture(FutureTask.java:266)\n" +
      "\tat java.util.concurrent.FutureTask.run(FutureTask.java)\n" +
      "\tat java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1149)\n" +
      "\tat java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:624)\n" +
      "\tat java.lang.Thread.run(Thread.java:748)\n" +
      "Caused by: java.lang.IllegalArgumentException: Parameter specified as non-null is null: method com.sip.sample.TestTask.test, parameter name\n" +
      "\tat com.sip.sample.TestTask.test(TestTask.kt)\n" +
      "\t... 11 more\n</code>";
    return (
      <Modal
        width={900}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="日志详情"
        visible={updateModalVisible}
        onCancel={() => handleUpdateModalVisible(false, values)}
        afterClose={() => handleUpdateModalVisible()}
      >
        <Divider>请求日志</Divider>
        <div style={{width: "100%",height:100,backgroundColor:"#000000",color: "green",overflow:"scroll"}} >dsadadasdasd</div>
        <Divider>执行日志</Divider>
        <div style={{width: "100%",height:300,backgroundColor:"#000000",color: "green",overflow:"scroll"}} >
          <ReactMarkdown
            source={markdown}
            escapeHtml={false}
            // astPlugins={[parseHtml]}
          />
        </div>
      </Modal>
    );
  }
}

export default Form.create<UpdateFormProps>()(UpdateForm);

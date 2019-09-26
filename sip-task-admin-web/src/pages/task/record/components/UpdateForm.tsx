import {Divider, Form, Modal} from 'antd';
import React, {Component} from 'react';

import {FormComponentProps} from 'antd/es/form';
import {TableListItem} from '../data.d';
import ReactMarkdown from "react-markdown";
import {Dispatch} from "redux";

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
  dispatch: Dispatch<any>;
  logInfo: any;
}

export interface UpdateFormState {
  formVals: FormValsType;
  currentStep: number;
}

class UpdateForm extends Component<UpdateFormProps, UpdateFormState> {
  static defaultProps = {
    handleUpdate: () => {
    },
    handleUpdateModalVisible: () => {
    },
    values: {}
  };

  formLayout = {
    labelCol: {span: 7},
    wrapperCol: {span: 13},
  };

  constructor(props: UpdateFormProps) {
    super(props);
    this.state = {
      formVals: {
        target: '0',
        template: '0',
        type: '1',
        time: '',
        frequency: 'month',
      },
      currentStep: 0,
    };

  }

  componentDidMount() {
    this.getRecordLog()
  }

  getRecordLog = () => {
    const dispatch = this.props.dispatch;
    console.log(this.props.values.id);
    dispatch({
      type: 'record/log',
      payload: this.props.values.id,
    });
  };


  render() {
    const {updateModalVisible, handleUpdateModalVisible, values, logInfo} = this.props;
    return (
      <Modal
        width={900}
        bodyStyle={{padding: '32px 40px 48px'}}
        destroyOnClose
        title="日志详情"
        visible={updateModalVisible}
        onCancel={() => handleUpdateModalVisible(false, values)}
        afterClose={() => handleUpdateModalVisible()}
      >
        <Divider>请求日志</Divider>
        <div style={{width: "100%", height: 200, backgroundColor: "#000000", color: "green", overflow: "scroll"}}>
          <ReactMarkdown
            source={logInfo["INVOKE"]}
            escapeHtml={false}
            // astPlugins={[parseHtml]}
          />
        </div>
        <Divider>执行日志</Divider>
        <div style={{width: "100%", height: 300, backgroundColor: "#000000", color: "green", overflow: "scroll"}}>
          <ReactMarkdown
            source={logInfo["EXECUTE"]}
            escapeHtml={false}
            // astPlugins={[parseHtml]}
          />
        </div>
      </Modal>
    );
  }
}

export default Form.create<UpdateFormProps>()(UpdateForm);

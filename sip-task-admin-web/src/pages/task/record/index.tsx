import {
  Button,
  Card,
  Col,
  Divider,
  Dropdown,
  Form,
  Icon,
  Input,
  Menu,
  message,
  Row,
  Select,
  AutoComplete,
  Modal
} from 'antd';
import React, {Component, Fragment} from 'react';
import {getParam} from '@/utils/UrlParam'

import {Dispatch} from 'redux';
import {FormComponentProps} from 'antd/es/form';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {connect} from 'dva';
import moment from 'moment';
import {StateType} from './model';
import CreateForm from './components/CreateForm';
import StandardTable, {StandardTableColumnProps} from './components/StandardTable';
import UpdateForm, {FormValsType} from './components/UpdateForm';
import {queryParam, TableListItem, TableListPagination} from './data.d';

import styles from './style.less';
import {DataSourceItemObject} from "antd/es/auto-complete";

const FormItem = Form.Item;
const {Option} = Select;
const { confirm } = Modal;
const getValue = (obj: { [x: string]: string[] }) =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

interface TableListProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  loading: boolean;
  record: StateType;
}

interface TableListState {
  modalVisible: boolean;
  updateModalVisible: boolean;
  selectedRows: TableListItem[];
  formValues: { [key: string]: string };
  stepFormValues: Partial<TableListItem>;
  jobId: any;
  executorId: any;
}

/* eslint react/no-multi-comp:0 */
@connect(
  ({
     record,
     loading,
   }: {
    record: StateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    record,
    loading: loading.models.rule,
  }),
)
class TableList extends Component<TableListProps, TableListState> {
  state: TableListState = {
    modalVisible: false,
    updateModalVisible: false,
    selectedRows: [],
    formValues: {},
    stepFormValues: {},
    jobId: '',
    executorId: ''
  };

  columns: StandardTableColumnProps[] = [
    {
      title: '执行器名称',
      dataIndex: 'executorName',
    },
    {
      title: '任务名称',
      dataIndex: 'jobName',
      align:"center"
    },
    {
      title: '调度CODE',
      dataIndex: 'code',
      align:"center"
    },
    {
      title: '状态',
      dataIndex: 'status',
      align:"center",
      render: (val: string) => {
        let value: any;
        switch (val) {
          case "WAIT_EXEC":
            value = "待执行";
            break;
          case "RUNNING":
            value = "运行中";
            break;
          case "SUCCESS":
            value = <p style={{color: "green", margin: "auto"}}>执行成功</p>;
            break;
          case "FAILED":
            value = <p style={{color: "red", margin: "auto"}}>执行失败</p>;
            break;
          case "TIMEOUT":
            value = <p style={{color: "red", margin: "auto"}}>已超时</p>;
            break;
        }
        return value
      }
    },
    {
      title: '超时时间(s)',
      dataIndex: 'timeout',
      align:"center"
    }, {
      title: '失败重试次数',
      dataIndex: 'failRetryCount',
      align:"center"
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      align:"center",
      sorter: true,
      render: (val: string) => <span>{val ? moment(val).format('YYYY-MM-DD HH:mm:ss') : ""}</span>,
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      align:"center",
      sorter: true,
      render: (val: string) => <span>{val ? moment(val).format('YYYY-MM-DD HH:mm:ss') : ""}</span>,
    },
    {
      title: '操作',
      align:"center",
      render: (text, record) => {
        const log = <a onClick={() => this.handleUpdateModalVisible(true, record)}>日志详情</a>;
        const del = <a onClick={() => this.delete(record.id)}>删除</a>;
        let menu=null;
        if (record.status == 'WAIT_EXEC') {
          menu = <Fragment>
            {del}
          </Fragment>
        } else {
          menu = <Fragment>
            {log}
          </Fragment>
        }
        return menu
      },
    },
  ];


  delete = (id:number)=>{
    const {dispatch} = this.props;
    confirm({
      title: '是否删除？',
      content: '删除后将不再执行',
      onOk() {
        dispatch({
          type: 'record/remove',
          payload: id,
        });
      },
      onCancel() {},
    })
  };


  componentDidMount() {
    let url = location.href, arr = url.split("?"), param = arr[1], jobId = "", executorId = "";
    if (param) {
      let str = param.split("&");
      jobId = getParam(str[0]);
      executorId = getParam(str[1])
    }
    const {dispatch, form} = this.props;
    dispatch({
      type: 'record/fetch',
      payload: {jobId: jobId},
    });
    this.initExecutorData();
    this.onSearchSuggest('');
    if (param) {
      this.setState({
        jobId: jobId,
        executorId: executorId
      }, () => {
        this.onSelect(jobId);
        form.setFieldsValue({executorId: Number(executorId)});
      });

    }
  }

  handleStandardTableChange = (
    pagination: Partial<TableListPagination>,
    filtersArg: Record<keyof TableListItem, string[]>,
  ) => {
    const {dispatch} = this.props;
    const {formValues, jobId} = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = {...obj};
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});
    const params: Partial<queryParam> = {
      pageNum: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
      jobId: jobId
    };
    dispatch({
      type: 'record/fetch',
      payload: params,
    });
  };

  handleFormReset = () => {
    const {form, dispatch} = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'record/fetch',
      payload: {},
    });
  };


  handleMenuClick = (e: { key: string }) => {
    const {dispatch} = this.props;
    const {selectedRows} = this.state;

    if (!selectedRows) return;
    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'record/remove',
          payload: {
            key: selectedRows.map(row => row.key),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      default:
        break;
    }
  };

  handleSelectRows = (rows: TableListItem[]) => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const {dispatch, form} = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };
      this.setState({
        formValues: values,
      });
      dispatch({
        type: 'record/fetch',
        payload: values,
      });
    });
  };

  handleModalVisible = (flag?: boolean) => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleUpdateModalVisible = (flag?: boolean, record?: FormValsType) => {
    this.setState({
      updateModalVisible: !!flag,
      stepFormValues: record || {},
    });
  };

  handleAdd = (fields: { desc: any }) => {
    const {dispatch} = this.props;
    dispatch({
      type: 'record/add',
      payload: {
        desc: fields.desc,
      },
    });

    message.success('添加成功');
    this.handleModalVisible();
  };


  // 初始化执行器下拉框值
  initExecutorData = () => {
    const {form, dispatch} = this.props;
    const {executorId} = this.state;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'record/executorAll',
      payload: {executorId: executorId}
    });
  };


  initExcutorOption = () => {
    const {
      record: {executors},
    } = this.props;
    const arr: any[] = [];
    for (let i = 0; i < executors.length; i++) {
      const exec = executors[i];
      arr.push(<Option key={exec.id} value={exec.id}>{exec.name}</Option>)
    }
    return arr;
  };

  optionOnChange = (val: any) => {
    this.setState({
      executorId: val
    }, () => {
      this.onSearchSuggest('')
    });
  };


  onSearchSuggest = (searchText: any) => {
    const {dispatch} = this.props;
    const {executorId} = this.state;
    dispatch({
      type: 'record/suggest',
      payload: {
        q: searchText,
        executorId: executorId
      },
    });
  };


  onSelect = (value: any) => {
    const {form} = this.props;
    form.setFieldsValue({jobId: value})
  };


  renderSimpleForm() {
    const {form, record: {jobs}} = this.props;
    const {getFieldDecorator} = form;
    const dataSource: DataSourceItemObject[] = [];
    jobs.map((obj) => {
      dataSource.push({
        value: obj.id.toString(),
        text: obj.name
      })
    });
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{md: 8, lg: 24, xl: 48}}>
          <Col md={5} sm={24}>
            <FormItem label="执行器">
              {getFieldDecorator('executorId', {
                initialValue: '',
                rules: [{required: false, message: '请选择执行器'}],
              })(
                <Select onChange={this.optionOnChange} style={{width: '100%'}} placeholder="请选择">
                  <Option value="">请选择</Option>
                  {this.initExcutorOption()}
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label="任务">
              {getFieldDecorator('jobId', {
                initialValue: '',
                rules: [{required: false, message: '请选择任务'}],
              })(
                <AutoComplete
                  // value={jobSelectValue}
                  dataSource={dataSource}
                  style={{width: 200}}
                  onSelect={this.onSelect}
                  onSearch={this.onSearchSuggest}
                  // onChange={this.onChange}
                  placeholder="job"
                />
              )}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label="CODE">
              {getFieldDecorator('code')(<Input placeholder="请输入"/>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{marginLeft: 8}} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }


  renderForm() {
    return this.renderSimpleForm();
  }

  render() {
    const {
      record: {data, logInfo},
      loading,
      dispatch
    } = this.props;
    const {selectedRows, modalVisible, updateModalVisible, stepFormValues} = this.state;
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">批量审批</Menu.Item>
      </Menu>
    );

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
    };
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            {/*<div className={styles.tableListOperator}>*/}
            {/*  <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>*/}
            {/*    新建*/}
            {/*  </Button>*/}
            {/*  {selectedRows.length > 0 && (*/}
            {/*    <span>*/}
            {/*      <Button>批量操作</Button>*/}
            {/*      <Dropdown overlay={menu}>*/}
            {/*        <Button>*/}
            {/*          更多操作 <Icon type="down"/>*/}
            {/*        </Button>*/}
            {/*      </Dropdown>*/}
            {/*    </span>*/}
            {/*  )}*/}
            {/*</div>*/}
            <StandardTable
              rowKey="id"
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible}/>
        {stepFormValues && Object.keys(stepFormValues).length ? (
          <UpdateForm
            {...updateMethods}
            updateModalVisible={updateModalVisible}
            dispatch={dispatch}
            values={stepFormValues}
            logInfo={logInfo}
          />
        ) : null}
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<TableListProps>()(TableList);

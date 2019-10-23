import {Button, Card, Col, Divider, Form, Icon, Input, message, Modal, Row, Select} from 'antd';
import React, {Component, Fragment} from 'react';

import {Dispatch} from 'redux';
import {FormComponentProps} from 'antd/es/form';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {connect} from 'dva';
// @ts-ignore
import uuid from 'uuid'
import {Link} from "umi";
import {StateType} from './model';
import CreateForm from './components/CreateForm';
import StandardTable, {StandardTableColumnProps} from './components/StandardTable';
import UpdateForm, {FormValsType} from './components/UpdateForm';
import {executor, Param, queryParam, TableListItem, TableListPagination} from './data.d';
import styles from './style.less';

const FormItem = Form.Item;
const {Option} = Select;
const {confirm} = Modal;

const getValue = (obj: { [x: string]: string[] }) => Object.keys(obj)
  .map(key => obj[key])
  .join(',');


interface TableListProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  loading: boolean;
  executeJob: StateType;
}


interface TableListState {
  modalVisible: boolean;
  expandForm: boolean;
  selectedRows: TableListItem[];
  formValues: { [key: string]: string };
  stepFormValues: Partial<TableListItem>;
  rowIndexArr: Map<string, Param>;
  executors: executor[];
}

@connect(
  ({
     executeJob,
     loading,
   }: {
    executeJob: StateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    executeJob,
    loading: loading.models.rule,
  }),
)
class TableList extends Component<TableListProps, TableListState> {
  state: TableListState = {
    modalVisible: false,
    expandForm: true,
    selectedRows: [],
    formValues: {},
    stepFormValues: {},
    rowIndexArr: new Map(),
    executors: [],
  };


  changeRowIndex = (bl: boolean, key: string) => {
    if (bl) {
      this.state.rowIndexArr.set(uuid(), {type: 'STRING', key: '', value: ''});
      this.setState({
        rowIndexArr: this.state.rowIndexArr,
      });
    } else {
      this.state.rowIndexArr.delete(key);
      this.setState({
        rowIndexArr: this.state.rowIndexArr,
      });
    }
  };

  removeIndex = (key: any) => {
    this.state.rowIndexArr.delete(key);
    this.setState({
      rowIndexArr: this.state.rowIndexArr,
    });
  };

  columns: StandardTableColumnProps[] = [
    {
      title: '任务名称',
      dataIndex: 'name',
    },
    {
      title: '执行器',
      dataIndex: 'executorName',
    },
    {
      title: 'cron表达式',
      dataIndex: 'cron',
    },
    {
      title: '执行策略',
      dataIndex: 'strategy',
      align: "center",
      render: strategy => (
        strategy == 'BLOCKING' ? '阻塞' : '并行'
      ),
    },
    {
      title: '状态',
      dataIndex: 'enable',
      align: "center",
      render: enable => (
        enable == 0 ? '未启用' : '已启用'
      ),
    },
    {
      title: '描述',
      dataIndex: 'desc',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleUpdateModalVisible(true, record)}>编辑</a>
          <Divider type="vertical"/>
          <a onClick={() => this.run(record.id)}>立即执行</a>
          <Divider type="vertical"/>
          <a onClick={() => this.confirmDelete(record.id)}>删除</a>
          <Divider type="vertical"/>
          <Link to={`record/?jobId=${record.id}&executorId=${record.executorId}`}>执行记录</Link>
        </Fragment>
      ),
    },
  ];


  run = (id: number) => {
    const {dispatch} = this.props;
    dispatch({
      type: 'executeJob/run',
      payload: id
    });
    message.success("执行成功")
  };


  confirmDelete = (id: number) => {
    const {dispatch} = this.props;
    confirm({
      title: '是否删除？',
      content: '前置条件:删除所有未完成(执行中、待执行)的执行记录',
      onOk() {
        dispatch({
          type: 'executeJob/remove',
          payload: [id],
        });
      },
      onCancel() {
      },
    })
  };


  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'executeJob/fetch',
    });
    this.initExecutorData()
  }

  handleStandardTableChange = (
    pagination: Partial<TableListPagination>,
    filtersArg: Record<keyof TableListItem, string[]>,
  ) => {
    const {dispatch} = this.props;
    const {formValues} = this.state;

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
    };
    dispatch({
      type: 'executeJob/fetch',
      payload: params,
    });
  };

  // 初始化执行器下拉框值
  initExecutorData = () => {
    const {form, dispatch} = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'executeJob/executorAll',
      payload: {},
    });
  };

  initExcutorOption = () => {
    const {
      executeJob: {executors},
    } = this.props;
    const arr: any[] = [];
    for (let i = 0; i < executors.length; i++) {
      const exec = executors[i];
      arr.push(<Option key={exec.id} value={exec.id}>{exec.name}</Option>)
    }
    return arr;
  };


  // 参数修改
  handleParamChange = (key: any, e: any, type: any) => {
    const param = this.state.rowIndexArr.get(key)!!;
    switch (type) {
      case 'type':
        param.type = e;
        break;
      case 'key':
        param.key = e.target.value;
        break;
      case 'value':
        param.value = e.target.value;
        break;
    }
    this.state.rowIndexArr.set(key, param);
    this.setState({
      rowIndexArr: this.state.rowIndexArr,
    });
  };


  handleFormReset = () => {
    const {form, dispatch} = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'executeJob/fetch',
      payload: {},
    });
  };

  toggleForm = () => {
    const {expandForm} = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  handleMenuClick = (e: { key: string }) => {
    const {dispatch} = this.props;
    const {selectedRows} = this.state;

    if (!selectedRows) return;
    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'executeJob/remove',
          payload: {
            key: selectedRows.map(row => row.id),
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
        type: 'executeJob/fetch',
        payload: values,
      });
    });
  };

  handleModalVisible = (flag?: boolean) => {
    if (flag) {
      this.initExecutorData();
    } else {
      this.setState({
        rowIndexArr: new Map(),
      })
    }
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleUpdateModalVisible = (flag?: boolean, record?: FormValsType) => {
    const {dispatch} = this.props;
    const map = new Map();
    if (record && record.param) {
      for (const i in record.param) {
        map.set(uuid(), record.param[i])
      }
    }
    this.setState({
      stepFormValues: record || {},
      rowIndexArr: map,
    });
    dispatch({
      type: 'executeJob/updateModalVisible',
      payload: {updateModalVisible: flag!},
    });
  };

  handleCreateModalVisible = (flag?: boolean) => {
    if (!flag) {
      this.setState({
        rowIndexArr: new Map(),
      })
    }
    const {dispatch} = this.props;
    dispatch({
      type: 'executeJob/updateModalVisible',
      payload: {createModalVisible: flag!},
    });
  };

  handleAdd = (fields: FormValsType) => {
    const {dispatch} = this.props;
    const param: Param[] = [];
    for (const i of this.state.rowIndexArr.values()) {
      param.push(i)
    }
    dispatch({
      type: 'executeJob/add',
      payload: {
        executorId: fields.executorId,
        cron: fields.cron,
        desc: fields.desc,
        name: fields.name,
        alarmEmail: fields.alarmEmail,
        strategy: fields.strategy,
        timeout: fields.timeout,
        failRetryCount: fields.failRetryCount,
        enable: fields.enable,
        code: fields.code,
        param,
      },
    });
  };


  handleUpdate = (fields: FormValsType) => {
    const {dispatch} = this.props;
    const param: Param[] = [];
    for (const i of this.state.rowIndexArr.values()) {
      param.push(i)
    }
    dispatch({
      type: 'executeJob/update',
      payload: {
        id: fields.id,
        executorId: fields.executorId,
        cron: fields.cron,
        desc: fields.desc,
        name: fields.name,
        alarmEmail: fields.alarmEmail,
        strategy: fields.strategy,
        timeout: fields.timeout,
        failRetryCount: fields.failRetryCount,
        enable: fields.enable,
        code: fields.code,
        param,
      },
    });
  };

  renderSimpleForm() {
    const {form} = this.props;
    const {getFieldDecorator} = form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{md: 8, lg: 24, xl: 48}}>
          <Col md={8} sm={24}>
            <FormItem label="规则名称">
              {getFieldDecorator('name')(<Input placeholder="请输入"/>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{width: '100%'}}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>,
              )}
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
              <a style={{marginLeft: 8}} onClick={this.toggleForm}>
                展开 <Icon type="down"/>
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderAdvancedForm() {
    const {
      form: {getFieldDecorator},
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{md: 8, lg: 24, xl: 48}}>
          <Col md={5} sm={24}>
            <FormItem label="执行器">
              {getFieldDecorator('executorId', {
                initialValue: '',
                rules: [{required: false, message: '请选择执行器'}],
              })(
                <Select style={{width: '100%'}} placeholder="请选择">
                  <Option value="">请选择</Option>
                  {this.initExcutorOption()}
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <FormItem label="名称">
              {getFieldDecorator('name')(<Input placeholder="请输入"/>)}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{marginLeft: 8}} onClick={this.handleFormReset}>
              重置
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }

  renderForm() {
    const {expandForm} = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {
    const {
      executeJob: {data, executors, updateModalVisible, createModalVisible},
      loading,
    } = this.props;
    const {selectedRows, stepFormValues, rowIndexArr} = this.state;

    const parentMethods = {
      changeRowIndex: this.changeRowIndex,
      removeIndex: this.removeIndex,
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleCreateModalVisible,
      handleParamChange: this.handleParamChange,
      initExcutorOption: this.initExcutorOption,
    };
    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
      changeRowIndex: this.changeRowIndex,
      removeIndex: this.removeIndex,
      handleModalVisible: this.handleModalVisible,
      handleParamChange: this.handleParamChange,
      initExcutorOption: this.initExcutorOption,
    };
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleCreateModalVisible(true)}>
                新建
              </Button>
            </div>
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
        <CreateForm {...parentMethods} dispatch={this.props.dispatch} createModalVisible={createModalVisible}
                    executors={executors}
                    rowIndexArr={rowIndexArr}/>
        {stepFormValues && Object.keys(stepFormValues).length ? (
          <UpdateForm
            dispatch={this.props.dispatch}
            {...updateMethods}
            updateModalVisible={updateModalVisible}
            rowIndexArr={rowIndexArr}
            values={stepFormValues}
          />
        ) : null}
      </PageHeaderWrapper>
    );
  }
}


export default Form.create<TableListProps>()(TableList);

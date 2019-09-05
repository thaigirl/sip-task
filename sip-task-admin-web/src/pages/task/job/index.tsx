import {Button, Card, Col, Divider, Dropdown, Form, Icon, Input, Menu, message, Row, Select,} from 'antd';
import React, {Component, Fragment} from 'react';

import {Dispatch} from 'redux';
import {FormComponentProps} from 'antd/es/form';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {SorterResult} from 'antd/es/table';
import {connect} from 'dva';
import {StateType} from './model';
import CreateForm from './components/CreateForm';
import StandardTable, {StandardTableColumnProps} from './components/StandardTable';
import UpdateForm, {FormValsType} from './components/UpdateForm';
import {executor, Param, queryParam, TableListItem, TableListPagination} from './data.d';
import uuid from 'uuid'

import styles from './style.less';

const FormItem = Form.Item;
const {Option} = Select;

const getValue = (obj: { [x: string]: string[] }) =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');


interface TableListProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  loading: boolean;
  executeJob: StateType;
}


interface TableListState {
  modalVisible: boolean;
  updateModalVisible: boolean;
  expandForm: boolean;
  selectedRows: TableListItem[];
  formValues: { [key: string]: string };
  stepFormValues: Partial<TableListItem>;
  rowIndexArr: Map<string, Param>;
  executors: Array<executor>;
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
    updateModalVisible: false,
    expandForm: true,
    selectedRows: [],
    formValues: {},
    stepFormValues: {},
    rowIndexArr: new Map(),
    executors: [],
  };


  changeRowIndex = (bl: boolean, key: string) => {
    if (bl) {
      this.state.rowIndexArr.set(uuid(), {type:"STRING",key:"",value:""});
      this.setState({
        rowIndexArr: this.state.rowIndexArr
      });
    } else {
      this.state.rowIndexArr.delete(key);
      this.setState({
        rowIndexArr: this.state.rowIndexArr,
      });
    }
  };

  removeIndex = (key: any) => {
    this.state.rowIndexArr.delete(key)
    this.setState({
      rowIndexArr: this.state.rowIndexArr
    });
    console.log(this.state.rowIndexArr.size);
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
      render: strategy => (
        strategy == "BLOCKING" ? "阻塞" : "并行"
      )
    },
    {
      title: '状态',
      dataIndex: 'enable',
      render: enable => (
        enable == 0 ? "未启用" : "已启用"
      )
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
          <a href="">订阅警报</a>
        </Fragment>
      ),
    },
  ];


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
    sorter: SorterResult<TableListItem>,
  ) => {
    const {dispatch} = this.props;
    const {formValues} = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = {...obj};
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});
    const params: Partial<queryParam> = {
      pageNum: pagination.pageNum,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    dispatch({
      type: 'executeJob/fetch',
      payload: params,
    });
  };

  //初始化执行器下拉框值
  initExecutorData = () => {
    const {
      executeJob: {executors},
    } = this.props;
    if (executors.length > 0) {
      return
    }
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
  initExcutorOption = ()=>{
    const {
      executeJob: {executors},
    } = this.props;
    const arr : any[] = [];
    for (let i = 0; i < executors.length; i++) {
      let exec = executors[i];
      arr.push(<Option key = {exec.id} value={exec.id}>{exec.name}</Option>)
    }
    return arr;
  };


  //参数修改
  handleParamChange = (key: any, e: any, type: any) => {
    let param = this.state.rowIndexArr.get(key)!!;
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
      rowIndexArr: this.state.rowIndexArr
    });
    console.log(this.state.rowIndexArr)
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
    }else {
      this.setState({
        rowIndexArr: new Map()
      })
    }
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleUpdateModalVisible = (flag?: boolean, record?: FormValsType) => {
    let map = new Map();
    if (record && record.param) {
      for (let i in record.param) {
        map.set(uuid(),record.param[i])
      }
    }
    this.setState({
      updateModalVisible: !!flag,
      stepFormValues: record || {},
      rowIndexArr: map
    });
  };

  handleAdd = (fields: FormValsType) => {
    const {dispatch} = this.props;
    let param : Param[] = [];
    for (let i of this.state.rowIndexArr.values()) {
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
        param: param
      },
    });

    message.success('添加成功');
    this.handleModalVisible();
  };


  handleUpdate = (fields: FormValsType) => {
    const {dispatch} = this.props;
    let param : Param[] = [];
    for (let i of this.state.rowIndexArr.values()) {
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
        param: param
      },
    });
    console.log("当前状态:"+this.props.executeJob.modalVisible);
    this.handleUpdateModalVisible(false);
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
                rules: [{ required: false, message: '请选择执行器' }],
              })(
                <Select style={{width: "100%" }} placeholder={'请选择'}>
                  <Option value="">请选择</Option>
                  {this.initExcutorOption()}
                </Select>
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
      executeJob: {data, executors},
      loading,
    } = this.props;
    const {selectedRows, modalVisible, updateModalVisible, stepFormValues, rowIndexArr} = this.state;
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">批量审批</Menu.Item>
      </Menu>
    );

    const parentMethods = {
      changeRowIndex: this.changeRowIndex,
      removeIndex: this.removeIndex,
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
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
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  <Button>批量操作</Button>
                  <Dropdown overlay={menu}>
                    <Button>
                      更多操作 <Icon type="down"/>
                    </Button>
                  </Dropdown>
                </span>
              )}
            </div>
            <StandardTable
              rowKey={"id"}
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} executors={executors} rowIndexArr={rowIndexArr}/>
        {stepFormValues && Object.keys(stepFormValues).length ? (
          <UpdateForm
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

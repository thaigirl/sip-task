import {Card, Col, Form, Row} from 'antd';
import React, {Component} from 'react';
import {Axis, Chart, Coord, Geom, Guide, Label, Legend, Tooltip,} from "bizcharts";
import DataSet from "@antv/data-set";

import {Dispatch} from 'redux';
import {FormComponentProps} from 'antd/es/form';
import {connect} from 'dva';
import {StateType} from './model';

interface TableListProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  loading: boolean;
  job: StateType;
}


interface State {
  modalVisible: boolean;
}

@connect(
  ({
     index,
     loading,
   }: {
    index: StateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    job: index,
    loading: loading.models.rule,
  }),
)
class TableList extends Component<TableListProps, State> {
  state: State = {
    modalVisible: false
  };


  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'index/fetch',
    });
    dispatch({
      type: 'index/lineChart',
    });
  }


  render() {
    const {
      job: {triggerInfo, lineChartInfo}
    } = this.props;
    const {DataView} = DataSet;
    const {Html} = Guide;
    const data = [
      {
        item: "待执行",
        count: triggerInfo.recordInfo.waitExecCount,
      },
      {
        item: "运行中",
        count: triggerInfo.recordInfo.runingCount
      },
      {
        item: "已成功",
        count: triggerInfo.recordInfo.successCount
      },
      {
        item: "已失败",
        count: triggerInfo.recordInfo.failCount
      },
      {
        item: "已超时",
        count: triggerInfo.recordInfo.timeOutCount
      }
    ];
    const dv = new DataView();
    dv.source(data).transform({
      type: "percent",
      field: "count",
      dimension: "item",
      as: "percent"
    });
    const cols = {
      percent: {
        formatter: (val: number) => `${(val * 100).toFixed(2)}%`
      }
    };


    const triggerData = lineChartInfo;
    const triggerCols = {
      month: {
        alias: "日"
      },
      acc: {
        alias: "次数:"
      }
    };


    return (
      <div>
        <Row>
          <Col span={12} style={{height: 506}}>
            <Col span={24}>
              <Card title="执行器信息" extra={<a href="#">More</a>} style={{width: '100%', height: 253}}>
                <p>Card content</p>
                <p>Card content</p>
              </Card>
            </Col>
            <Col span={24}>
              <Card title="调度任务数:20" extra={<a href="#">More</a>} style={{width: '100%', height: 253}}>
                <p>已启用:2</p>
                <p>未启用:5</p>
              </Card>
            </Col>
          </Col>
          <Col span={12}>
            <Card title={`调度次数:${triggerInfo.recordInfo.totalCount}`} style={{width: '100%'}}>
              <div>
                <Chart
                  height={400}
                  data={dv}
                  scale={cols}
                  padding={[20, 200, 20, 20]}
                  forceFit
                >
                  <Coord type="theta" radius={0.75} innerRadius={0.6}/>
                  <Axis name="percent"/>
                  <Legend
                    position="right"
                    offsetY={-250}
                    offsetX={10}
                  />
                  <Tooltip
                    showTitle={false}
                    itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
                  />
                  <Guide>
                    <Html
                      position={["50%", "50%"]}
                      html={`<div style="color:#8c8c8c;font-size:1.16em;text-align: center;width: 10em;">调度次数<br><span style="color:#262626;font-size:2.5em"></span>${triggerInfo.recordInfo.totalCount}次</div>`}
                      alignX="middle"
                      alignY="middle"
                    />
                  </Guide>
                  <Geom
                    type="intervalStack"
                    position="percent"
                    color="item"
                    tooltip={[
                      "item*percent",
                      (item, percent) => {
                        percent = `${percent * 100}%`;
                        return {
                          name: item,
                          value: percent
                        };
                      }
                    ]}
                    style={{
                      lineWidth: 1,
                      stroke: "#fff"
                    }}
                  >
                    <Label
                      content="percent"
                      formatter={(val, item) => `${item.point.item}: ${val}`}
                    />
                  </Geom>
                </Chart>
              </div>
            </Card>
          </Col>

        </Row>
        <Row>
          <Col span={24}>
            <Card title={`调度次数:${triggerInfo.recordInfo.totalCount}`} style={{width: '100%'}}>
              <div>
                <Chart data={triggerData} scale={triggerCols} forceFit height={400}>
                  <Axis
                    name="month"
                  />
                  <Axis
                    name="acc"
                  />
                  <Tooltip/>
                  <Geom
                    type="line"
                    position="month*acc"
                    size={1}
                    color="l (270) 0:rgba(255, 146, 255, 1) .5:rgba(100, 268, 255, 1) 1:rgba(215, 0, 255, 1)"
                    shape="smooth"
                    style={{
                      shadowColor: "l (270) 0:rgba(21, 146, 255, 0)",
                      shadowBlur: 60,
                      shadowOffsetY: 6
                    }}
                  />
                </Chart>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}


export default Form.create<TableListProps>()(TableList);

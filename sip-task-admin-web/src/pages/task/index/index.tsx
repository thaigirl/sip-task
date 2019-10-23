import {Card, Col, Form, Modal, Row, Select} from 'antd';
import React, {Component} from 'react';
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts";
import DataSet from "@antv/data-set";

import {Dispatch} from 'redux';
import {FormComponentProps} from 'antd/es/form';
import {connect} from 'dva';
// @ts-ignore
import {StateType} from './model';
import {indexDto} from './data.d';

const FormItem = Form.Item;
const {Option} = Select;
const {confirm} = Modal;


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
    job:index,
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
      job: {triggerInfo,lineChartInfo}
    } = this.props;
    const { DataView } = DataSet;
    const { Html } = Guide;
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
        formatter: (val:number) => {
          return (val * 100).toFixed(2) + "%";
        }
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
      <Row gutter={{md: 8, lg: 24, xl: 48}}>
        <Col span={7}>
          <Card title="执行器信息" extra={<a href="#">More</a>} style={{width: '100%'}}>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="调度任务数:20" extra={<a href="#">More</a>} style={{width: '100%'}}>
            <p>已启用:2</p>
            <p>未启用:5</p>
          </Card>
        </Col>
        <Col span={9}>
          <Card title={`调度次数:${triggerInfo.recordInfo.totalCount}`} extra={<a href="#">More</a>} style={{ width: '100%' }}>
            {/*<p>运行中:{triggerInfo.recordInfo.runingCount}</p>*/}
            {/*<p>已成功:{triggerInfo.recordInfo.successCount}</p>*/}
            {/*<p>已失败:{triggerInfo.recordInfo.failCount}</p>*/}
            {/*<p>已超时:{triggerInfo.recordInfo.timeOutCount}</p>*/}
            {/*<p>待执行:{triggerInfo.recordInfo.waitExecCount}</p>*/}
            <div>
              <Chart
                height={window.innerHeight}
                data={dv}
                scale={cols}
                // padding={[80, 100, 80, 80]}
                forceFit
              >
                <Coord type={"theta"} radius={0.75} innerRadius={0.6} />
                <Axis name="percent" />
                <Legend
                  position="right"
                  offsetY={-window.innerHeight / 2 + 120}
                  offsetX={-100}
                />
                <Tooltip
                  showTitle={false}
                  itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
                />
                <Guide>
                  <Html
                    position={["50%", "50%"]}
                    html={`<div style=&quot;color:#8c8c8c;font-size:1.16em;text-align: center;width: 10em;&quot;>调度次数<br><span style=&quot;color:#262626;font-size:2.5em&quot;></span>${triggerInfo.recordInfo.totalCount}次</div>`}
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
                      percent = percent * 100 + "%";
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
                    formatter={(val, item) => {
                      return item.point.item + ": " + val;
                    }}
                  />
                </Geom>
              </Chart>
            </div>
          </Card>
        </Col>
        <Col span={7}>
          <div>
            <Chart width={400} height={400} data={triggerData} scale={triggerCols} forceFit>
              <Axis
                name="month"
                title={null}
                tickLine={null}
                line={{
                  stroke: "#E6E6E6"
                }}
              />
              <Axis
                name="acc"
                line={false}
                tickLine={null}
                grid={null}
                title={null}
              />
              <Tooltip />
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
        </Col>
      </Row>

    );
  }
}


export default Form.create<TableListProps>()(TableList);

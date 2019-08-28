import React from 'react';
import {List, Tabs, Collapse, Card, Table, Row, Col, Button, Input, Modal, Radio, InputNumber, Checkbox} from 'antd';

const {Panel} = Collapse;
const {TabPane} = Tabs;

function CronExpression() {
  return (
    <div>
      <p>cron的表达式被用来配置CronTrigger实例。 cron的表达式是字符串，实际上是由七子表达式，描述个别细节的时间表。这些子表达式是分开的空白，代表：</p>
      <p>1. Seconds</p>
      <p>2. Minutes</p>
      <p>3. Hours</p>
      <p>4. Day-of-Month</p>
      <p>5. Month</p>
      <p>6. Day-of-Week</p>
      <p>7. Year (可选字段)</p>
      <p>例 "0 0 12 ? * WED" 在每星期三下午12:00 执行,</p> 个别子表达式可以包含范围, 例如，在前面的例子里("WED")可以替换成 "MON-FRI", "MON, WED,
      FRI"甚至"MON-WED,SAT". “*” 代表整个时间段. <p></p>
      <p>每一个字段都有一套可以指定有效值，如</p>
      <p>Seconds (秒) ：可以用数字0－59 表示，</p>
      <p>Minutes(分) ：可以用数字0－59 表示，</p>
      <p>Hours(时) ：可以用数字0-23表示,</p>
      <p>Day-of-Month(天) ：可以用数字1-31 中的任一一个值，但要注意一些特别的月份</p>
      <p>Month(月) ：可以用0-11 或用字符串 “JAN, FEB, MAR, APR, MAY, JUN, JUL, AUG, SEP, OCT, NOV and DEC” 表示</p>
      <p>Day-of-Week(每周)：可以用数字1-7表示（1 ＝ 星期日）或用字符口串“SUN, MON, TUE, WED, THU, FRI and SAT”表示</p>
      <p>“/”：为特别单位，表示为“每”如“0/15”表示每隔15分钟执行一次,“0”表示为从“0”分开始, “3/20”表示表示每隔20分钟执行一次，“3”表示从第3分钟开始执行</p>
      <p>“?”：表示每月的某一天，或第周的某一天</p>
      <p>“L”：用于每月，或每周，表示为每月的最后一天，或每个月的最后星期几如“6L”表示“每月的最后一个星期五”</p>
      <p>“W”：表示为最近工作日，如“15W”放在每月（day-of-month）字段上表示为“到本月15日最近的工作日”</p>
      <p>“#”：是用来指定“的”每月第n个工作日,例 在每周（day-of-week）这个字段中内容为"6#3" or "FRI#3" 则表示“每月第三个星期五”</p>
    </div>
  );
};


class Cron extends React.Component {
  state = {
    visible: false,
    fiveRecentTimedata: [
      '2019-08-28 14:12:01',
      '2019-08-28 14:12:02',
      '2019-08-28 14:12:03',
      '2019-08-28 14:12:04',
      '2019-08-28 14:12:05',
    ],
    radioValue: 1,
    tableData: [
      {
        expression: '表达式字段:',
        v_second: '*',
        v_min: '*',
        v_hour: '*',
        v_day: '*',
        v_mouth: '*',
        v_week: '*',
        v_year: '*',
      },
    ],
    tableColumns: [
      {
        title: '',
        dataIndex: 'expression',
        key: 'expression',
      },
      {
        title: '秒',
        dataIndex: 'v_second',
        key: 'v_second',
      },
      {
        title: '分钟',
        dataIndex: 'v_min',
        key: 'v_min',
      },
      {
        title: '小时',
        dataIndex: 'v_hour',
        key: 'v_hour',
      },
      {
        title: '日',
        dataIndex: 'v_day',
        key: 'v_day',
      },
      {
        title: '月',
        dataIndex: 'v_mouth',
        key: 'v_mouth',
      },
      {
        title: '星期',
        dataIndex: 'v_week',
        key: 'v_week',
      },
      {
        title: '年',
        dataIndex: 'v_year',
        key: 'v_year',
      },
    ],
    text: [
      {
        title: 'CronTrigger',
        desc: `CronTriggers往往比SimpleTrigger更有用，如果您需要基于日历的概念，而非SimpleTrigger完全指定的时间间隔，复发的发射工作的时间表。 CronTrigger，你可以指定触发的时间表如“每星期五中午”，或“每个工作日9:30时”，甚至“每5分钟一班9:00和10:00逢星期一上午，星期三星期五“。 即便如此，SimpleTrigger一样，CronTrigger拥有的startTime指定的时间表时生效，指定的时间表时，应停止（可选）结束时间。`
      },
      {
        title: 'Cron表达式',
        desc: CronExpression()
      },
    ],
    data: [
      {
        title: '0 15 10 * * ? *',
        desc: '每天10点15分触发'
      },
      {
        title: '0 15 10 * * ? 2017',
        desc: '2017年每天10点15分触发'
      },
      {
        title: '0 * 14 * * ?',
        desc: '每天下午的 2点到2点59分每分触发'
      },
      {
        title: '0 0/5 14 * * ?',
        desc: '每天下午的 2点到2点59分(整点开始，每隔5分触发)'
      },
      {
        title: '0 0/5 14,18 * * ?',
        desc: '每天下午的 2点到2点59分、18点到18点59分(整点开始，每隔5分触发)'
      },
      {
        title: '0 0-5 14 * * ?',
        desc: '每天下午的 2点到2点05分每分触发'
      },
      {
        title: '0 15 10 ? * 6L',
        desc: '每月最后一周的星期五的10点15分触发'
      },
      {
        title: '0 15 10 ? * 6#3',
        desc: '每月的第三周的星期五开始触发'
      },
    ],
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };


  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  onRadioChange = (e: any) => {
    this.setState({
      radioValue: e.target.value,
    });
  };

  render(): React.ReactNode {
    const radioStyle = {
      display: 'block',
      height: '40px',
      lineHeight: '30px',
    };

    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Cron工具
        </Button>
        <Modal
          title="Cron计算器"
          visible={this.state.visible}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              关闭
            </Button>,
          ]}
          width={"80%"}
        >
          <Tabs defaultActiveKey="1">
            <TabPane tab="Cron表达式在线工具" key="1">
              <Tabs defaultActiveKey="1">
                <TabPane tab="秒" key="1">
                  <Radio.Group onChange={this.onRadioChange} value={this.state.radioValue}>
                    <Radio style={radioStyle} value={1}>
                      每秒 允许的通配符[, - * /]
                    </Radio>
                    <Radio style={radioStyle} value={2}>
                      周期从<InputNumber/>-<InputNumber/>秒
                    </Radio>
                    <Radio style={radioStyle} value={3}>
                      从<InputNumber/>秒开始,每<InputNumber/>秒执行一次
                    </Radio>
                    <Radio style={radioStyle} value={4}>
                      指定<br/>
                      <Checkbox.Group style={{width: '50%', marginLeft: "50px"}}>
                        <Col span={24}>
                          <Checkbox value="00">00</Checkbox>
                          <Checkbox value="01">01</Checkbox>
                          <Checkbox value="02">02</Checkbox>
                          <Checkbox value="03">03</Checkbox>
                          <Checkbox value="04">04</Checkbox>
                          <Checkbox value="05">05</Checkbox>
                          <Checkbox value="06">06</Checkbox>
                          <Checkbox value="07">07</Checkbox>
                          <Checkbox value="08">08</Checkbox>
                          <Checkbox value="09">09</Checkbox>
                        </Col>
                        <Col span={24}>
                          <Checkbox value="10">10</Checkbox>
                          <Checkbox value="11">11</Checkbox>
                          <Checkbox value="12">12</Checkbox>
                          <Checkbox value="13">13</Checkbox>
                          <Checkbox value="14">14</Checkbox>
                          <Checkbox value="15">15</Checkbox>
                          <Checkbox value="16">16</Checkbox>
                          <Checkbox value="17">17</Checkbox>
                          <Checkbox value="18">18</Checkbox>
                          <Checkbox value="19">19</Checkbox>
                        </Col>
                        <Col span={24}>
                          <Checkbox value="20">20</Checkbox>
                          <Checkbox value="21">21</Checkbox>
                          <Checkbox value="22">22</Checkbox>
                          <Checkbox value="23">23</Checkbox>
                          <Checkbox value="24">24</Checkbox>
                          <Checkbox value="25">25</Checkbox>
                          <Checkbox value="26">26</Checkbox>
                          <Checkbox value="27">27</Checkbox>
                          <Checkbox value="28">28</Checkbox>
                          <Checkbox value="29">29</Checkbox>
                        </Col>
                        <Col span={24}>
                          <Checkbox value="30">30</Checkbox>
                          <Checkbox value="31">31</Checkbox>
                          <Checkbox value="32">32</Checkbox>
                          <Checkbox value="33">33</Checkbox>
                          <Checkbox value="34">34</Checkbox>
                          <Checkbox value="35">35</Checkbox>
                          <Checkbox value="36">36</Checkbox>
                          <Checkbox value="37">37</Checkbox>
                          <Checkbox value="38">38</Checkbox>
                          <Checkbox value="39">39</Checkbox>
                        </Col>
                        <Col span={24}>
                          <Checkbox value="40">40</Checkbox>
                          <Checkbox value="41">41</Checkbox>
                          <Checkbox value="42">42</Checkbox>
                          <Checkbox value="43">43</Checkbox>
                          <Checkbox value="44">44</Checkbox>
                          <Checkbox value="45">45</Checkbox>
                          <Checkbox value="46">46</Checkbox>
                          <Checkbox value="47">47</Checkbox>
                          <Checkbox value="48">48</Checkbox>
                          <Checkbox value="49">49</Checkbox>
                        </Col>
                        <Col span={24}>
                          <Checkbox value="50">50</Checkbox>
                          <Checkbox value="51">51</Checkbox>
                          <Checkbox value="52">52</Checkbox>
                          <Checkbox value="53">53</Checkbox>
                          <Checkbox value="54">54</Checkbox>
                          <Checkbox value="55">55</Checkbox>
                          <Checkbox value="56">56</Checkbox>
                          <Checkbox value="57">57</Checkbox>
                          <Checkbox value="58">58</Checkbox>
                          <Checkbox value="59">59</Checkbox>
                        </Col>
                      </Checkbox.Group>
                    </Radio>
                  </Radio.Group>
                </TabPane>
                <TabPane tab="分钟" key="2">
                  <Radio.Group onChange={this.onRadioChange} value={this.state.radioValue}>
                    <Radio style={radioStyle} value={1}>
                      分钟 允许的通配符[, - * /]
                    </Radio>
                    <Radio style={radioStyle} value={2}>
                      周期从<InputNumber/>-<InputNumber/>分钟
                    </Radio>
                    <Radio style={radioStyle} value={3}>
                      从<InputNumber/>分钟开始,每<InputNumber/>分钟执行一次
                    </Radio>
                    <Radio style={radioStyle} value={4}>
                      指定<br/>
                      <Checkbox.Group style={{width: '50%', marginLeft: "50px"}}>
                        <Col span={24}>
                          <Checkbox value="00">00</Checkbox>
                          <Checkbox value="01">01</Checkbox>
                          <Checkbox value="02">02</Checkbox>
                          <Checkbox value="03">03</Checkbox>
                          <Checkbox value="04">04</Checkbox>
                          <Checkbox value="05">05</Checkbox>
                          <Checkbox value="06">06</Checkbox>
                          <Checkbox value="07">07</Checkbox>
                          <Checkbox value="08">08</Checkbox>
                          <Checkbox value="09">09</Checkbox>
                        </Col>
                        <Col span={24}>
                          <Checkbox value="10">10</Checkbox>
                          <Checkbox value="11">11</Checkbox>
                          <Checkbox value="12">12</Checkbox>
                          <Checkbox value="13">13</Checkbox>
                          <Checkbox value="14">14</Checkbox>
                          <Checkbox value="15">15</Checkbox>
                          <Checkbox value="16">16</Checkbox>
                          <Checkbox value="17">17</Checkbox>
                          <Checkbox value="18">18</Checkbox>
                          <Checkbox value="19">19</Checkbox>
                        </Col>
                        <Col span={24}>
                          <Checkbox value="20">20</Checkbox>
                          <Checkbox value="21">21</Checkbox>
                          <Checkbox value="22">22</Checkbox>
                          <Checkbox value="23">23</Checkbox>
                          <Checkbox value="24">24</Checkbox>
                          <Checkbox value="25">25</Checkbox>
                          <Checkbox value="26">26</Checkbox>
                          <Checkbox value="27">27</Checkbox>
                          <Checkbox value="28">28</Checkbox>
                          <Checkbox value="29">29</Checkbox>
                        </Col>
                        <Col span={24}>
                          <Checkbox value="30">30</Checkbox>
                          <Checkbox value="31">31</Checkbox>
                          <Checkbox value="32">32</Checkbox>
                          <Checkbox value="33">33</Checkbox>
                          <Checkbox value="34">34</Checkbox>
                          <Checkbox value="35">35</Checkbox>
                          <Checkbox value="36">36</Checkbox>
                          <Checkbox value="37">37</Checkbox>
                          <Checkbox value="38">38</Checkbox>
                          <Checkbox value="39">39</Checkbox>
                        </Col>
                        <Col span={24}>
                          <Checkbox value="40">40</Checkbox>
                          <Checkbox value="41">41</Checkbox>
                          <Checkbox value="42">42</Checkbox>
                          <Checkbox value="43">43</Checkbox>
                          <Checkbox value="44">44</Checkbox>
                          <Checkbox value="45">45</Checkbox>
                          <Checkbox value="46">46</Checkbox>
                          <Checkbox value="47">47</Checkbox>
                          <Checkbox value="48">48</Checkbox>
                          <Checkbox value="49">49</Checkbox>
                        </Col>
                        <Col span={24}>
                          <Checkbox value="50">50</Checkbox>
                          <Checkbox value="51">51</Checkbox>
                          <Checkbox value="52">52</Checkbox>
                          <Checkbox value="53">53</Checkbox>
                          <Checkbox value="54">54</Checkbox>
                          <Checkbox value="55">55</Checkbox>
                          <Checkbox value="56">56</Checkbox>
                          <Checkbox value="57">57</Checkbox>
                          <Checkbox value="58">58</Checkbox>
                          <Checkbox value="59">59</Checkbox>
                        </Col>
                      </Checkbox.Group>
                    </Radio>
                  </Radio.Group>
                </TabPane>
                <TabPane tab="小时" key="3">
                  <Radio.Group onChange={this.onRadioChange} value={this.state.radioValue}>
                    <Radio style={radioStyle} value={1}>
                      小时 允许的通配符[, - * /]
                    </Radio>
                    <Radio style={radioStyle} value={2}>
                      周期从<InputNumber/>-<InputNumber/>小时
                    </Radio>
                    <Radio style={radioStyle} value={3}>
                      从<InputNumber/>小时开始,每<InputNumber/>小时执行一次
                    </Radio>
                    <Radio style={radioStyle} value={4}>
                      指定<br/>
                      <Checkbox.Group style={{width: '50%', marginLeft: "50px"}}>
                        <Col span={24}>
                          AM:
                          <Checkbox value="00">00</Checkbox>
                          <Checkbox value="01">01</Checkbox>
                          <Checkbox value="02">02</Checkbox>
                          <Checkbox value="03">03</Checkbox>
                          <Checkbox value="04">04</Checkbox>
                          <Checkbox value="05">05</Checkbox>
                          <Checkbox value="06">06</Checkbox>
                          <Checkbox value="07">07</Checkbox>
                          <Checkbox value="08">08</Checkbox>
                          <Checkbox value="09">09</Checkbox>
                          <Checkbox value="09">10</Checkbox>
                          <Checkbox value="09">11</Checkbox>
                        </Col>
                        <Col span={24}>
                          PM:
                          <Checkbox value="12">12</Checkbox>
                          <Checkbox value="13">13</Checkbox>
                          <Checkbox value="14">14</Checkbox>
                          <Checkbox value="15">15</Checkbox>
                          <Checkbox value="16">16</Checkbox>
                          <Checkbox value="17">17</Checkbox>
                          <Checkbox value="18">18</Checkbox>
                          <Checkbox value="19">19</Checkbox>
                          <Checkbox value="19">20</Checkbox>
                          <Checkbox value="19">21</Checkbox>
                          <Checkbox value="19">22</Checkbox>
                          <Checkbox value="19">23</Checkbox>
                        </Col>
                      </Checkbox.Group>
                    </Radio>
                  </Radio.Group>
                </TabPane>
                <TabPane tab="日" key="4">
                  <Radio.Group onChange={this.onRadioChange} value={this.state.radioValue}>
                    <Radio style={radioStyle} value={1}>
                      日 允许的通配符[, - * / L W]
                    </Radio>
                    <Radio style={radioStyle} value={2}>
                      不指定
                    </Radio>
                    <Radio style={radioStyle} value={3}>
                      周期从<InputNumber/>-<InputNumber/>日
                    </Radio>
                    <Radio style={radioStyle} value={4}>
                      从<InputNumber/>日开始,每<InputNumber/>日执行一次
                    </Radio>
                    <Radio style={radioStyle} value={5}>
                      每月<InputNumber/>号最近的那个工作日
                    </Radio>
                    <Radio style={radioStyle} value={6}>
                      每月最后一天
                    </Radio>
                    <Radio style={radioStyle} value={5}>
                      指定<br/>
                      <Checkbox.Group style={{width: '50%', marginLeft: "50px"}}>
                        <Col span={24}>
                          <Checkbox value="01">01</Checkbox>
                          <Checkbox value="02">02</Checkbox>
                          <Checkbox value="03">03</Checkbox>
                          <Checkbox value="04">04</Checkbox>
                          <Checkbox value="05">05</Checkbox>
                          <Checkbox value="06">06</Checkbox>
                          <Checkbox value="07">07</Checkbox>
                          <Checkbox value="08">08</Checkbox>
                          <Checkbox value="09">09</Checkbox>
                          <Checkbox value="09">10</Checkbox>
                          <Checkbox value="09">11</Checkbox>
                          <Checkbox value="09">12</Checkbox>
                          <Checkbox value="09">13</Checkbox>
                          <Checkbox value="09">14</Checkbox>
                          <Checkbox value="09">15</Checkbox>
                          <Checkbox value="09">16</Checkbox>
                        </Col>
                        <Col span={24}>
                          <Checkbox value="17">17</Checkbox>
                          <Checkbox value="18">18</Checkbox>
                          <Checkbox value="19">19</Checkbox>
                          <Checkbox value="19">20</Checkbox>
                          <Checkbox value="19">21</Checkbox>
                          <Checkbox value="19">22</Checkbox>
                          <Checkbox value="19">23</Checkbox>
                          <Checkbox value="19">24</Checkbox>
                          <Checkbox value="19">25</Checkbox>
                          <Checkbox value="19">26</Checkbox>
                          <Checkbox value="19">27</Checkbox>
                          <Checkbox value="19">28</Checkbox>
                          <Checkbox value="19">29</Checkbox>
                          <Checkbox value="19">30</Checkbox>
                          <Checkbox value="19">31</Checkbox>
                        </Col>
                      </Checkbox.Group>
                    </Radio>
                  </Radio.Group>
                </TabPane>
                <TabPane tab="月" key="5">
                  <Radio.Group onChange={this.onRadioChange} value={this.state.radioValue}>
                    <Radio style={radioStyle} value={1}>
                      月 允许的通配符[, - * /]
                    </Radio>
                    <Radio style={radioStyle} value={2}>
                      不指定
                    </Radio>
                    <Radio style={radioStyle} value={3}>
                      周期从<InputNumber/>-<InputNumber/>月
                    </Radio>
                    <Radio style={radioStyle} value={4}>
                      从<InputNumber/>月开始,每<InputNumber/>月执行一次
                    </Radio>
                    <Radio style={radioStyle} value={5}>
                      指定<br/>
                      <Checkbox.Group style={{width: '50%', marginLeft: "50px"}}>
                        <Col span={24}>
                          <Checkbox value="00">00</Checkbox>
                          <Checkbox value="01">01</Checkbox>
                          <Checkbox value="02">02</Checkbox>
                          <Checkbox value="03">03</Checkbox>
                          <Checkbox value="04">04</Checkbox>
                          <Checkbox value="05">05</Checkbox>
                          <Checkbox value="06">06</Checkbox>
                          <Checkbox value="07">07</Checkbox>
                          <Checkbox value="08">08</Checkbox>
                          <Checkbox value="09">09</Checkbox>
                          <Checkbox value="09">10</Checkbox>
                          <Checkbox value="09">11</Checkbox>
                          <Checkbox value="09">12</Checkbox>
                        </Col>
                      </Checkbox.Group>
                    </Radio>
                  </Radio.Group>
                </TabPane>
                <TabPane tab="周" key="6">
                  <Radio.Group onChange={this.onRadioChange} value={this.state.radioValue}>
                    <Radio style={radioStyle} value={1}>
                      月 允许的通配符[, - * / L #]
                    </Radio>
                    <Radio style={radioStyle} value={2}>
                      不指定
                    </Radio>
                    <Radio style={radioStyle} value={3}>
                      周期从星期<InputNumber min={1} max={7}/>-<InputNumber min={1} max={7}/>
                    </Radio>
                    <Radio style={radioStyle} value={4}>
                      第<InputNumber min={1} max={4}/>周 的星期<InputNumber min={1} max={7}/>
                    </Radio>
                    <Radio style={radioStyle} value={5}>
                      本月最后一个星期<InputNumber min={1} max={7}/>
                    </Radio>
                    <Radio style={radioStyle} value={5}>
                      指定<br/>
                      <Checkbox.Group style={{width: '50%', marginLeft: "50px"}}>
                        <Col span={24}>
                          <Checkbox value="00">00</Checkbox>
                          <Checkbox value="01">01</Checkbox>
                          <Checkbox value="02">02</Checkbox>
                          <Checkbox value="03">03</Checkbox>
                          <Checkbox value="04">04</Checkbox>
                          <Checkbox value="05">05</Checkbox>
                          <Checkbox value="06">06</Checkbox>
                          <Checkbox value="07">07</Checkbox>
                        </Col>
                      </Checkbox.Group>
                    </Radio>
                  </Radio.Group>
                </TabPane>
                <TabPane tab="年" key="7">
                  <Radio.Group onChange={this.onRadioChange} value={this.state.radioValue}>
                    <Radio style={radioStyle} value={1}>
                      不指定 允许的通配符[, - * /] 非必填
                    </Radio>
                    <Radio style={radioStyle} value={2}>
                      每年
                    </Radio>
                    <Radio style={radioStyle} value={3}>
                      周期从<InputNumber />-<InputNumber />
                    </Radio>
                  </Radio.Group>
                </TabPane>
              </Tabs>
              <Card title="表达式" bordered={false} style={{width: "100%"}}>
                <Table rowKey={"expression"} columns={this.state.tableColumns} dataSource={this.state.tableData}
                       pagination={false}/>
              </Card>

              <Row gutter={0}>
                <Col span={4}><Button>Cron 表达式:</Button></Col>
                <Col span={16}><Input placeholder=""/></Col>
                <Col span={4}><Button type="primary">反解析到UI</Button></Col>
              </Row>
              <List
                size="small"
                header={<div>最近5次运行时间:</div>}
                footer={null}
                bordered
                dataSource={this.state.fiveRecentTimedata}
                renderItem={item => <List.Item>{item}</List.Item>}
              />
            </TabPane>
            <TabPane tab="Cron表达式教程" key="2">
              <Collapse defaultActiveKey={['1', '2']}>
                <Panel header={this.state.text[0].title} key="1">
                  <p>{this.state.text[0].desc}</p>
                </Panel>
                <Panel header={this.state.text[1].title} key="2">
                  {this.state.text[1].desc}
                </Panel>
              </Collapse>
            </TabPane>
            <TabPane tab="常用Cron表达式" key="3">
              <List
                itemLayout="horizontal"
                dataSource={this.state.data}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      title={item.title}
                      description={item.desc}
                    />
                  </List.Item>
                )}
              />
            </TabPane>
          </Tabs>
        </Modal>
      </div>

    );
  }
}

export default Cron;

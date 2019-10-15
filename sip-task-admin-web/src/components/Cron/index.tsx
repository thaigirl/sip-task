import React, {Component} from 'react';
import {Checkbox, Col, Collapse, Divider, Icon, Input, InputNumber, List, Modal, Radio, Row, Tabs} from 'antd';
import {connect} from "dva";
import {Dispatch} from "redux";
import {ConnectProps} from "../../models/connect";
import {StateType} from "../../pages/task/executor/model";

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
}

interface CronProps extends ConnectProps {
  dispatch: Dispatch<any>;
  fiveRecentTimedata: any[];
  handleCron: (cron: string) => void;
}

interface CronState {
  visible: boolean,
  cron: string,
  tabValue: string,
  secondValue: any,
  secondStart_0: any,
  secondEnd_0: any,
  secondStart_1: any,
  secondEnd_1: any,
  secondList: any[],
  minuteValue: any,
  minuteStart_0: any,
  minuteEnd_0: any,
  minuteStart_1: any,
  minuteEnd_1: any,
  minuteList: any[],
  hourValue: any,
  hourStart_0: any,
  hourEnd_0: any,
  hourStart_1: any,
  hourEnd_1: any,
  hourList: any[],
  dayValue: any,
  dayStart_0: any,
  dayEnd_0: any,
  dayStart_1: any,
  dayEnd_1: any,
  dayStart_2: any,
  dayList: any[],
  monthValue: any,
  monthStart_0: any,
  monthEnd_0: any,
  monthStart_1: any,
  monthEnd_1: any,
  monthList: any[],
  weekValue: any,
  weekStart_0: any,
  weekEnd_0: any,
  weekStart_1: any,
  weekEnd_1: any,
  weekStart_2: any,
  weekList: any[],
  v_second: string,
  v_minute: string,
  v_hour: string,
  v_day: string,
  v_month: string,
  v_week: string,
  text: any[],
  data: any[],
}

@connect(
  ({
     cron,
   }: {
    cron: StateType;
  }) => ({
    fiveRecentTimedata: cron.cron,
  }),
)

class Cron extends Component<CronProps, CronState> {
  static defaultProps = {
    handleCron: () => {
    },
  };

  constructor(props: CronProps) {
    super(props);
    this.state = {
      visible: false,
      cron: '* * * * * ?',
      tabValue: "1",
      secondValue: 1,
      secondStart_0: 1,
      secondEnd_0: 1,
      secondStart_1: 1,
      secondEnd_1: 1,
      secondList: [],
      minuteValue: 1,
      minuteStart_0: 1,
      minuteEnd_0: 1,
      minuteStart_1: 1,
      minuteEnd_1: 1,
      minuteList: [],
      hourValue: 1,
      hourStart_0: 1,
      hourEnd_0: 1,
      hourStart_1: 1,
      hourEnd_1: 1,
      hourList: [],
      dayValue: 1,
      dayStart_0: 1,
      dayEnd_0: 1,
      dayStart_1: 1,
      dayEnd_1: 1,
      dayStart_2: 1,
      dayList: [],
      monthValue: 1,
      monthStart_0: 1,
      monthEnd_0: 1,
      monthStart_1: 1,
      monthEnd_1: 1,
      monthList: [],
      weekValue: 1,
      weekStart_0: 1,
      weekEnd_0: 1,
      weekStart_1: 1,
      weekEnd_1: 1,
      weekStart_2: 1,
      weekList: [],
      v_second: '*',
      v_minute: '*',
      v_hour: '*',
      v_day: '*',
      v_month: '*',
      v_week: '?',
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
  }

  componentDidMount(): void {
    this.getCronTime(this.state.cron);
  }

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

  ok = () => {
    this.props.handleCron(this.state.cron);
    this.setState({
      visible: false,
    });
  };

  onSecondChange = (e: any) => {
    this.setState({
      secondValue: e.target.value,
    }, () => {
      this.everyTime('v_second');
    });
  };

  onMinuteChange = (e: any) => {
    this.setState({
      minuteValue: e.target.value,
    }, () => {
      this.everyTime('v_minute');
    });
  };

  onHourChange = (e: any) => {
    this.setState({
      hourValue: e.target.value,
    }, () => {
      this.everyTime('v_hour');
    });
  };

  onDayChange = (e: any) => {
    this.setState({
      dayValue: e.target.value,
    }, () => {
      this.everyTime('v_day');
    });
  };

  onMonthChange = (e: any) => {
    this.setState({
      monthValue: e.target.value,
    }, () => {
      this.everyTime('v_month');
    });
  };

  onWeekChange = (e: any) => {
    this.setState({
      weekValue: e.target.value,
    }, () => {
      this.everyTime('v_week');
    });
  };


  onTabsChange = (e: string) => {
    this.setState({
      tabValue: e,
    });
  };

  onValueChange = (key: string, value: any) => {
    // @ts-ignore
    this.setState({
      [`${key}`]: value
    }, () => {
      switch (this.state.tabValue) {
        case '1':
          this.everyTime('v_second');
          break;
        case '2':
          this.everyTime('v_minute');
          break;
        case '3':
          this.everyTime('v_hour');
          break;
        case '4':
          this.everyTime('v_day');
          break;
        case '5':
          this.everyTime('v_month');
          break;
        case '6':
          this.everyTime('v_week');
          break;
      }
    });
  };

  onCronChange = (key: string, value: any) => {
    value = value.target.value;
    this.getCronTime(value)
    this.change(value)
    this.setState({
      cron: value
    });
  };

  getCronTime = (cron: string) => {
    const {dispatch} = this.props;
    dispatch({
      type: 'cron/cron',
      payload: {cron}
    });
  }

  change = (txt: string) => {
    // 获取参数中表达式的值
    if (txt) {
      const regs = txt.split(' ');
      this.setState({
        v_second: regs[0],
        v_minute: regs[1],
        v_hour: regs[2],
        v_day: regs[3],
        v_month: regs[4],
        v_week: regs[5],
      })
      this.initObj(regs[0], "second");
      this.initObj(regs[1], "minute");
      this.initObj(regs[2], "hour");
      this.initDay(regs[3]);
      this.initMonth(regs[4]);
      this.initWeek(regs[5]);
    }
  }

  initObj = (strVal: string, strid: string) => {
    let arr = [];
    switch (strid) {
      case 'second':
        if (strVal === "*") {
          this.setState({
            secondValue: 1,
          })
        } else if (strVal.split('-').length > 1) {
          arr = strVal.split('-');
          this.setState({
            secondValue: 2,
            secondStart_0: arr[0],
            secondEnd_0: arr[1],
          })
        } else if (strVal.split('/').length > 1) {
          arr = strVal.split('-');
          this.setState({
            secondValue: 3,
            secondStart_1: arr[0],
            secondEnd_1: arr[1],
          })
        } else if (strVal !== "?") {
          arr = strVal.split(",");
          this.setState({
            secondValue: 4,
            secondList: arr,
          })
        }
        break;
      case 'minute':
        if (strVal === "*") {
          this.setState({
            minuteValue: 1,
          })
        } else if (strVal.split('-').length > 1) {
          arr = strVal.split('-');
          this.setState({
            minuteValue: 2,
            minuteStart_0: arr[0],
            minuteEnd_0: arr[1],
          })
        } else if (strVal.split('/').length > 1) {
          arr = strVal.split('-');
          this.setState({
            minuteValue: 3,
            minuteStart_1: arr[0],
            minuteEnd_1: arr[1],
          })
        } else if (strVal !== "?") {
          arr = strVal.split(",");
          this.setState({
            minuteValue: 4,
            minuteList: arr,
          })
        }
        break;
      case 'hour':
        if (strVal === "*") {
          this.setState({
            hourValue: 1,
          })
        } else if (strVal.split('-').length > 1) {
          arr = strVal.split('-');
          this.setState({
            hourValue: 2,
            hourStart_0: arr[0],
            hourEnd_0: arr[1],
          })
        } else if (strVal.split('/').length > 1) {
          arr = strVal.split('-');
          this.setState({
            hourValue: 3,
            hourStart_1: arr[0],
            hourEnd_1: arr[1],
          })
        } else if (strVal !== "?") {
          arr = strVal.split(",");
          this.setState({
            hourValue: 4,
            hourList: arr,
          })
        }
        break;
    }
  }

  initDay = (strVal: string) => {
    let arr = [];
    if (strVal === "*") {
      this.setState({
        dayValue: 1,
      })
    } else if (strVal === "?") {
      this.setState({
        dayValue: 2,
      })
    } else if (strVal.split('-').length > 1) {
      arr = strVal.split('-');
      this.setState({
        dayValue: 3,
        dayStart_0: arr[0],
        dayEnd_0: arr[1],
      })
    } else if (strVal.split('/').length > 1) {
      arr = strVal.split('/');
      this.setState({
        dayValue: 4,
        dayStart_1: arr[0],
        dayEnd_1: arr[1],
      })
    } else if (strVal.split('W').length > 1) {
      arr = strVal.split('W');
      this.setState({
        dayValue: 5,
        dayStart_2: arr[0],
      })
    } else if (strVal === "L") {
      this.setState({
        dayValue: 6,
      })
    } else {
      arr = strVal.split(",");
      this.setState({
        dayValue: 7,
        dayList: arr,
      })
    }
  }

  initMonth = (strVal: string) => {
    let arr = null;
    if (strVal === "*") {
      this.setState({
        monthValue: 1,
      })
    } else if (strVal === "?") {
      this.setState({
        monthValue: 2,
      })
    } else if (strVal.split('-').length > 1) {
      arr = strVal.split('-');
      this.setState({
        monthValue: 3,
        monthStart_0: arr[0],
        monthEnd_0: arr[1],
      })
    } else if (strVal.split('/').length > 1) {
      arr = strVal.split('/');
      this.setState({
        monthValue: 3,
        monthStart_1: arr[0],
        monthEnd_1: arr[1],
      })
    } else {
      arr = strVal.split(",");
      this.setState({
        monthValue: 3,
        monthList: arr,
      })
    }
  }

  initWeek = (strVal: string) => {
    let arr = null;
    if (strVal == "*") {
      this.setState({
        weekValue: 1,
      })
    } else if (strVal == "?") {
      this.setState({
        weekValue: 2,
      })
    } else if (strVal.split('/').length > 1) {
      arr = strVal.split('/');
      this.setState({
        weekValue: 3,
        weekStart_0: arr[0],
        weekEnd_0: arr[1],
      })
    } else if (strVal.split('-').length > 1) {
      arr = strVal.split('-');
      this.setState({
        weekValue: 4,
        weekStart_1: arr[0],
        weekEnd_1: arr[1],
      })
    } else if (strVal.split('L').length > 1) {
      arr = strVal.split('L');
      this.setState({
        weekValue: 5,
        weekStart_2: arr[0],
      })
    } else {
      arr = strVal.split(",");
      this.setState({
        weekValue: 6,
        weekList: arr,
      })
    }
  }

  everyTime = (type: string) => {
    let data = '';
    const stateMap = {
      v_second: this.state.v_second,
      v_minute: this.state.v_minute,
      v_hour: this.state.v_hour,
      v_day: this.state.v_day,
      v_month: this.state.v_month,
      v_week: this.state.v_week,
    };
    switch (type) {
      case 'v_second':
        if (this.state.secondValue == 1) {
          stateMap.v_minute = '*';
          stateMap.v_hour = '*';
          stateMap.v_day = '*';
          stateMap.v_month = '*';
          stateMap.v_week = '?';
        }
        switch (this.state.secondValue) {
          case 1:
            data = '*'
            break;
          case 2:
            data = `${this.state.secondStart_0}-${this.state.secondEnd_0}`
            break;
          case 3:
            data = `${this.state.secondStart_1}/${this.state.secondEnd_1}`
            break;
          case 4:
            data = this.state.secondList.join(',');
            break;
        }
        break;
      case 'v_minute':
        if (this.state.minuteValue != 1) {
          if (this.state.v_second == '*') {
            stateMap.v_second = '0';
          }
        } else {
          stateMap.v_hour = '*';
          stateMap.v_day = '*';
          stateMap.v_month = '*';
          stateMap.v_week = '?';
        }
        switch (this.state.minuteValue) {
          case 1:
            data = '*'
            break;
          case 2:
            data = `${this.state.minuteStart_0}-${this.state.minuteEnd_0}`
            break;
          case 3:
            data = `${this.state.minuteStart_1}/${this.state.minuteEnd_1}`
            break;
          case 4:
            data = this.state.minuteList.join(',');
            break;
        }
        break;
      case 'v_hour':
        if (this.state.hourValue != 1) {
          if (this.state.v_second == '*') {
            stateMap.v_second = '0';
          }
          if (this.state.v_minute == '*') {
            stateMap.v_minute = '0';
          }
        } else {
          stateMap.v_day = '*';
          stateMap.v_month = '*';
          stateMap.v_week = '?';
        }

        switch (this.state.hourValue) {
          case 1:
            data = '*'
            break;
          case 2:
            data = `${this.state.hourStart_0}-${this.state.hourEnd_0}`
            break;
          case 3:
            data = `${this.state.hourStart_1}/${this.state.hourEnd_1}`
            break;
          case 4:
            data = this.state.hourList.join(',');
            break;
        }
        break;
      case 'v_day':
        if (this.state.dayValue != 1) {
          if (this.state.v_second == '*') {
            stateMap.v_second = '0';
          }
          if (this.state.v_minute == '*') {
            stateMap.v_minute = '0';
          }
          if (this.state.v_hour == '*') {
            stateMap.v_hour = '0';
          }
        } else {
          stateMap.v_month = '*';
          stateMap.v_week = '?';
        }

        switch (this.state.dayValue) {
          case 1:
            data = '*'
            break;
          case 2:
            data = '?'
            break;
          case 3:
            data = `${this.state.dayStart_0}-${this.state.dayEnd_0}`
            break;
          case 4:
            data = `${this.state.dayStart_1}/${this.state.dayEnd_1}`
            break;
          case 5:
            data = `${this.state.dayStart_2}W`;
            break;
          case 6:
            data = 'L';
            break;
          case 7:
            data = this.state.dayList.join(',');
            break;
        }
        break;
      case 'v_month':
        if (this.state.monthValue != 1) {
          if (this.state.v_second == '*') {
            stateMap.v_second = '0';
          }
          if (this.state.v_minute == '*') {
            stateMap.v_minute = '0';
          }
          if (this.state.v_hour == '*') {
            stateMap.v_hour = '0';
          }
          if (this.state.v_day == '*') {
            stateMap.v_day = '0';
          }
        } else {
          stateMap.v_week = '?';
        }

        switch (this.state.monthValue) {
          case 1:
            data = '*'
            break;
          case 2:
            data = '?'
            break;
          case 3:
            data = `${this.state.monthStart_0}-${this.state.monthEnd_0}`
            break;
          case 4:
            data = `${this.state.monthStart_1}/${this.state.monthEnd_1}`
            break;
          case 5:
            data = this.state.monthList.join(',');
            break;
        }
        break;
      case 'v_week':
        if (this.state.weekValue != 1) {
          if (this.state.v_second == '*') {
            stateMap.v_second = '0';
          }
          if (this.state.v_minute == '*') {
            stateMap.v_minute = '0';
          }
          if (this.state.v_hour == '*') {
            stateMap.v_hour = '0';
          }
          if (this.state.v_day == '*') {
            stateMap.v_day = '0';
          }
          if (this.state.v_month == '*') {
            stateMap.v_month = '0';
          }
        }

        switch (this.state.weekValue) {
          case 1:
            data = '*'
            break;
          case 2:
            data = '?'
            break;
          case 3:
            data = `${this.state.weekStart_0}-${this.state.weekEnd_0}`
            break;
          case 4:
            data = `${this.state.weekStart_1}#${this.state.weekEnd_1}`
            break;
          case 5:
            data = `${this.state.weekStart_2}L`;
            break;
          case 6:
            data = 'L';
            break;
          case 7:
            data = this.state.weekList.join(',');
            break;
        }
        break;
    }
    stateMap[`${type}`] = data;
    this.setState(stateMap, () => {
      this.resetCronTime()
    });
  }

  resetCronTime = () => {
    const cron = `${this.state.v_second} ${this.state.v_minute} ${this.state.v_hour} ${this.state.v_day} ${this.state.v_month} ${this.state.v_week}`;
    this.setState({
      cron,
    });
    this.getCronTime(cron)
  }

  render(): React.ReactNode {
    const radioStyle = {
      display: 'block',
      height: '40px',
      lineHeight: '30px',
    };
    return (
      <div>
        <Icon
          type="thunderbolt"
          onClick={this.showModal}/>
        <Modal
          title="Cron计算器"
          visible={this.state.visible}
          onOk={this.ok}
          width="80%"
          onCancel={this.handleCancel}
        >
          <Tabs defaultActiveKey="1">
            <TabPane tab="Cron表达式在线工具" key="1">
              <Tabs defaultActiveKey="1" activeKey={this.state.tabValue} onChange={this.onTabsChange}>
                <TabPane tab="秒" key="1">
                  <Radio.Group onChange={this.onSecondChange} value={this.state.secondValue}>
                    <Radio style={radioStyle} value={1}>
                      每秒 允许的通配符[, - * /]
                    </Radio>
                    <Radio style={radioStyle} value={2}>
                      周期从<InputNumber value={this.state.secondStart_0}
                                      onChange={this.onValueChange.bind(this, 'secondStart_0')}/>-<InputNumber
                      value={this.state.secondEnd_0} onChange={this.onValueChange.bind(this, 'secondEnd_0')}/>秒
                    </Radio>
                    <Radio style={radioStyle} value={3}>
                      从<InputNumber onChange={this.onValueChange.bind(this, 'secondStart_1')}
                                    value={this.state.secondStart_1}/>秒开始,每<InputNumber value={this.state.secondEnd_1}
                                                                                        onChange={this.onValueChange.bind(this, 'secondEnd_1')}/>秒执行一次
                    </Radio>
                    <Radio style={radioStyle} value={4}>
                      指定<br/>
                      <Checkbox.Group style={{width: '50%', marginLeft: "50px"}} value={this.state.secondList}
                                      onChange={this.onValueChange.bind(this, 'secondList')}>
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
                  <Radio.Group onChange={this.onMinuteChange} value={this.state.minuteValue}>
                    <Radio style={radioStyle} value={1}>
                      分钟 允许的通配符[, - * /]
                    </Radio>
                    <Radio style={radioStyle} value={2}>
                      周期从<InputNumber value={this.state.minuteStart_0}
                                      onChange={this.onValueChange.bind(this, 'minuteStart_0')}/>-<InputNumber
                      value={this.state.minuteEnd_0} onChange={this.onValueChange.bind(this, 'minuteEnd_0')}/>分钟
                    </Radio>
                    <Radio style={radioStyle} value={3}>
                      从<InputNumber value={this.state.minuteStart_1}
                                    onChange={this.onValueChange.bind(this, 'minuteStart_1')}/>分钟开始,每<InputNumber
                      value={this.state.minuteEnd_1} onChange={this.onValueChange.bind(this, 'minuteEnd_1')}/>分钟执行一次
                    </Radio>
                    <Radio style={radioStyle} value={4}>
                      指定<br/>
                      <Checkbox.Group style={{width: '50%', marginLeft: "50px"}} value={this.state.minuteList}
                                      onChange={this.onValueChange.bind(this, 'minuteList')}>
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
                  <Radio.Group onChange={this.onHourChange} value={this.state.hourValue}>
                    <Radio style={radioStyle} value={1}>
                      小时 允许的通配符[, - * /]
                    </Radio>
                    <Radio style={radioStyle} value={2}>
                      周期从<InputNumber value={this.state.hourStart_0}
                                      onChange={this.onValueChange.bind(this, 'hourStart_0')}/>-<InputNumber
                      value={this.state.hourEnd_0} onChange={this.onValueChange.bind(this, 'hourEnd_0')}/>小时
                    </Radio>
                    <Radio style={radioStyle} value={3}>
                      从<InputNumber value={this.state.hourStart_1}
                                    onChange={this.onValueChange.bind(this, 'hourStart_1')}/>小时开始,每<InputNumber
                      value={this.state.hourEnd_1} onChange={this.onValueChange.bind(this, 'hourEnd_1')}/>小时执行一次
                    </Radio>
                    <Radio style={radioStyle} value={4}>
                      指定<br/>
                      <Checkbox.Group style={{width: '50%', marginLeft: "50px"}} value={this.state.hourList}
                                      onChange={this.onValueChange.bind(this, 'hourList')}>
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
                  <Radio.Group onChange={this.onDayChange} value={this.state.dayValue}>
                    <Radio style={radioStyle} value={1}>
                      日 允许的通配符[, - * / L W]
                    </Radio>
                    <Radio style={radioStyle} value={2}>
                      不指定
                    </Radio>
                    <Radio style={radioStyle} value={3}>
                      周期从<InputNumber value={this.state.dayStart_0}
                                      onChange={this.onValueChange.bind(this, 'dayStart_0')}/>-<InputNumber
                      value={this.state.dayEnd_0} onChange={this.onValueChange.bind(this, 'dayEnd_0')}/>日
                    </Radio>
                    <Radio style={radioStyle} value={4}>
                      从<InputNumber value={this.state.dayStart_1}
                                    onChange={this.onValueChange.bind(this, 'dayStart_1')}/>日开始,每<InputNumber
                      value={this.state.dayEnd_1} onChange={this.onValueChange.bind(this, 'dayEnd_1')}/>日执行一次
                    </Radio>
                    <Radio style={radioStyle} value={5}>
                      每月<InputNumber value={this.state.dayStart_2}
                                     onChange={this.onValueChange.bind(this, 'dayStart_2')}/>号最近的那个工作日
                    </Radio>
                    <Radio style={radioStyle} value={6}>
                      每月最后一天
                    </Radio>
                    <Radio style={radioStyle} value={5}>
                      指定<br/>
                      <Checkbox.Group style={{width: '50%', marginLeft: "50px"}} value={this.state.dayList}
                                      onChange={this.onValueChange.bind(this, 'dayList')}>
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
                  <Radio.Group onChange={this.onMonthChange} value={this.state.monthValue}>
                    <Radio style={radioStyle} value={1}>
                      月 允许的通配符[, - * /]
                    </Radio>
                    <Radio style={radioStyle} value={2}>
                      不指定
                    </Radio>
                    <Radio style={radioStyle} value={3}>
                      周期从<InputNumber value={this.state.monthStart_0}
                                      onChange={this.onValueChange.bind(this, 'monthStart_0')}/>-<InputNumber
                      value={this.state.monthEnd_0} onChange={this.onValueChange.bind(this, 'monthEnd_0')}/>月
                    </Radio>
                    <Radio style={radioStyle} value={4}>
                      从<InputNumber value={this.state.monthStart_1}
                                    onChange={this.onValueChange.bind(this, 'monthStart_1')}/>月开始,每<InputNumber
                      value={this.state.monthEnd_1} onChange={this.onValueChange.bind(this, 'monthEnd_1')}/>月执行一次
                    </Radio>
                    <Radio style={radioStyle} value={5}>
                      指定<br/>
                      <Checkbox.Group style={{width: '50%', marginLeft: "50px"}} value={this.state.monthList}
                                      onChange={this.onValueChange.bind(this, 'monthList')}>
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
                  <Radio.Group onChange={this.onWeekChange} value={this.state.weekValue}>
                    <Radio style={radioStyle} value={1}>
                      月 允许的通配符[, - * / L #]
                    </Radio>
                    <Radio style={radioStyle} value={2}>
                      不指定
                    </Radio>
                    <Radio style={radioStyle} value={3}>
                      周期从星期<InputNumber min={1} max={7} value={this.state.weekStart_0}
                                        onChange={this.onValueChange.bind(this, 'weekStart_0')}/>-<InputNumber min={1}
                                                                                                               max={7}
                                                                                                               value={this.state.weekEnd_0}
                                                                                                               onChange={this.onValueChange.bind(this, 'weekEnd_0')}/>
                    </Radio>
                    <Radio style={radioStyle} value={4}>
                      第<InputNumber min={1} max={4} value={this.state.weekStart_1}
                                    onChange={this.onValueChange.bind(this, 'weekStart_1')}/>周 的星期<InputNumber min={1}
                                                                                                               max={7}
                                                                                                               value={this.state.weekEnd_1}
                                                                                                               onChange={this.onValueChange.bind(this, 'weekEnd_1')}/>
                    </Radio>
                    <Radio style={radioStyle} value={5}>
                      本月最后一个星期<InputNumber min={1} max={7} value={this.state.weekStart_2}
                                           onChange={this.onValueChange.bind(this, 'weekStart_2')}/>
                    </Radio>
                    <Radio style={radioStyle} value={5}>
                      指定<br/>
                      <Checkbox.Group style={{width: '50%', marginLeft: "50px"}} value={this.state.weekList}
                                      onChange={this.onValueChange.bind(this, 'weekList')}>
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
              </Tabs>
              <Divider>Cron表达式</Divider>
              <Row gutter={8}>
                <Col span={3}></Col>
                <Col span={3}>秒</Col>
                <Col span={3}>分钟</Col>
                <Col span={3}>小时</Col>
                <Col span={3}>日</Col>
                <Col span={3}>月</Col>
                <Col span={3}>星期</Col>
              </Row>
              <Row gutter={8}>
                <Col span={3}>表达式字段:</Col>
                <Col span={3}>{this.state.v_second}</Col>
                <Col span={3}>{this.state.v_minute}</Col>
                <Col span={3}>{this.state.v_hour}</Col>
                <Col span={3}>{this.state.v_day}</Col>
                <Col span={3}>{this.state.v_month}</Col>
                <Col span={3}>{this.state.v_week}</Col>
              </Row>
              <br/>
              <Row gutter={8}>
                <Col span={3}>Cron 表达式:</Col>
                <Col span={21}><Input placeholder="" value={this.state.cron}
                                      onChange={this.onCronChange.bind(this, 'cron')}/></Col>
              </Row>
              <br/>
              <Row>
                <List
                  size="small"
                  header={<div>最近5次运行时间:</div>}
                  footer={null}
                  bordered
                  dataSource={this.props.fiveRecentTimedata}
                  renderItem={item => <List.Item>{item}</List.Item>}
                />
              </Row>

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

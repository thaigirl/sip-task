import {AnyAction, Reducer} from 'redux';
import {EffectsCommandMap} from 'dva';
import {lineChart, Info} from './service';

import {indexDto} from './data.d';

export interface StateType {
  triggerInfo: indexDto;
  lineChartInfo: any
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
    lineChart: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'index',
  state: {
    triggerInfo: {
      jobInfo: {},
      recordInfo: {},
      executorCount: 0
    },
    lineChartInfo: {}
  },

  effects: {
    * fetch({payload}, {call, put}) {
      const response = yield call(Info, payload);
      yield put({
        type: 'save',
        payload: {
          triggerInfo: {
            jobInfo: response.data.jobInfo,
            recordInfo: response.data.recordInfo,
            executorCount: response.data.executorCount
          },
        },
      });
    },
    * lineChart({payload}, {call, put}) {
      const response = yield call(lineChart, payload);
      yield put({
        type: 'save',
        payload: {
          lineChartInfo: response.data
        },
      });
    },

  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default Model;

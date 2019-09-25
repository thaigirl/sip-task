import {AnyAction, Reducer} from 'redux';
import {EffectsCommandMap} from 'dva';
import {queryRecord, removeRule, suggest} from './service';

import {TableListData} from './data.d';
import {executor, job} from "@/pages/task/job/data";
import {executorAll} from "@/pages/task/job/service";

export interface StateType {
  data: TableListData;
  executors: Array<executor>;
  jobs: Array<job>;
  updateModalVisible: boolean;
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
    remove: Effect;
    executorAll: Effect;
    suggest: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'record',
  state: {
    data: {
      list: [],
      pagination: {},
    },
    executors: [],
    jobs: [],
    updateModalVisible: false
  },

  effects: {
    * fetch({payload}, {call, put}) {
      const response = yield call(queryRecord, payload);
      yield put({
        type: 'save',
        payload: {
          data: {
            list: response.data.list,
            pagination: response.data.page,
          },
        },
      });
    },
    * remove({payload, callback}, {call, put}) {
      const response = yield call(removeRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    * executorAll({payload, callback}, {call, put}) {
      let response = yield call(executorAll, payload);
      yield put({
        type: 'save',
        payload: {
          executors: response.data
        },
      });
      if (callback) callback();
    },
    * suggest({payload, callback}, {call, put}) {
      let response = yield call(suggest, payload);
      yield put({
        type: 'save',
        payload: {
          jobs: response.data
        },
      });
      if (callback) callback();
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

import {AnyAction, Reducer} from 'redux';
import {EffectsCommandMap} from 'dva';
import {log, queryRecord, remove, suggest} from './service';

import {TableListData} from './data.d';
import {executor, job} from "@/pages/task/job/data";
import {executorAll} from "@/pages/task/job/service";
import {message} from "antd";

export interface StateType {
  data: TableListData;
  executors: Array<executor>;
  jobs: Array<job>;
  updateModalVisible: boolean;
  logInfo: any;
  search: any;
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
    log: Effect;
    reload: Effect;
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
    updateModalVisible: false,
    logInfo:{},
    search:{}
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
          search: payload
        },
      });
    },
    * remove({payload, callback}, {call, put}) {
      const response = yield call(remove, payload);
      if (response && response.code != 0) {
        yield put({
          type: 'save'
        });
      }else {
        yield put({
          type: 'reload'
        });
        message.success('删除成功');
        if (callback) callback();
      }
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
    * log({payload, callback}, {call, put}) {
      let response = yield call(log, payload);
      yield put({
        type: 'save',
        payload: {
          logInfo: response.data
        },
      });
      if (callback) callback();
    },
    * reload({payload, callback},{put, select}) {
      const search = yield select(state => state.record.search);
      console.log(search);
      yield put({type: 'fetch', payload: search});
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

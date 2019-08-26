import {AnyAction, Reducer} from 'redux';
import {EffectsCommandMap} from 'dva';
import {addJob, queryJob, removeJob, updateJob, executorAll} from './service';

import {TableListData,executor} from './data.d';

export interface StateType {
  data: TableListData;
  executors: Array<executor>
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
    add: Effect;
    remove: Effect;
    update: Effect;
    executorAll: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'executeJob',
  state: {
    data: {
      list: [],
      pagination: {},
    },
    executors: []
  },

  effects: {
    * fetch({payload}, {call, put}) {
      const response = yield call(queryJob, payload);
      yield put({
        type: 'save',
        payload: {
          list: response.data.list,
          pagination: response.data.page,
        },
      });
    },
    * add({payload, callback}, {call, put}) {
      const response = yield call(addJob, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    * remove({payload, callback}, {call, put}) {
      const response = yield call(removeJob, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    * update({payload, callback}, {call, put}) {
      const response = yield call(updateJob, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    * executorAll({payload, callback}, {call, put}) {
      const response = yield call(executorAll, payload);
      yield put({
        type: 'save',
        payload: {executors:response.data},
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

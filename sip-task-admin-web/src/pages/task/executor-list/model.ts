import {AnyAction, Reducer} from 'redux';
import {EffectsCommandMap} from 'dva';
import {addExecutor, queryExecutor, removeExecutor, updateExecutor} from './service';

import {TableListData} from './data.d';

export interface StateType {
  data: TableListData;
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
    add: Effect;
    remove: Effect;
    update: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'executor',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    search: {}
  },

  effects: {
    * fetch({payload}, {call, put, select}) {
      const response = yield call(queryExecutor, payload);
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
    * add({payload, callback}, {call, put, select}) {
      yield call(addExecutor, payload);
      // @ts-ignore
      const search = yield select(state => state.executor.search);
      yield put({
        type: 'fetch',
        payload: search
      });
      if (callback) callback();
    },
    * remove({payload, callback}, {call, put, select}) {
      yield call(removeExecutor, payload);
      // @ts-ignore
      const search = yield select(state => state.executor.search);
      yield put({
        type: 'fetch',
        payload: search
      });
      if (callback) callback();
    },
    * update({payload, callback}, {call, put, select}) {
      yield call(updateExecutor, payload);
      // @ts-ignore
      const search = yield select(state => state.executor.search);
      yield put({
        type: 'fetch',
        payload: search
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

import {AnyAction, Reducer} from 'redux';
import {EffectsCommandMap} from 'dva';
import {addExecutor, queryExecutor, removeExecutor, updateExecutor, fiveCron} from './service';

import {TableListData} from './data.d';

export interface StateType {
  data: TableListData;
  search: any;
  cron: any;
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
    reload: Effect;
    cron: Effect;
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
    search: {},
    cron: [],
  },

  effects: {
    * fetch({payload}, {call, put, select}) {
      const response = yield call(queryExecutor, payload);
      yield put({
        type: 'save',
        payload: {
          data: {
            list: response.data.list,
            pagination: {
              total: response.data.page.total,
              pageSize: response.data.page.pageSize,
              current: response.data.page.pageNum,
            },
          },
          search: payload
        },
      });
    },
    * add({payload, callback}, {call, put}) {
      yield call(addExecutor, payload);
      yield put({type: 'reload'});
      if (callback) callback();
    },
    * remove({payload, callback}, {call, put}) {
      yield call(removeExecutor, payload);
      yield put({type: 'reload'});
      if (callback) callback();
    },
    * update({payload, callback}, {call, put}) {
      yield call(updateExecutor, payload);
      yield put({type: 'reload'});
      if (callback) callback();
    },
    * reload({payload, callback}, {call, put, select}) {
      // @ts-ignore
      const search = yield select(state => state.executor.search);
      yield put({type: 'fetch', payload: {search}});
    },
    * cron({payload, callback}, {call, put}) {
      const response = yield call(fiveCron, payload);
      yield put({
        type: 'save',
        payload: {
          cron: response,
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

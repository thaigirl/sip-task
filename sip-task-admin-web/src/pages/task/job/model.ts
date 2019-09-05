import {AnyAction, Reducer} from 'redux';
import {EffectsCommandMap} from 'dva';
import {addJob, queryJob, removeJob, updateJob, executorAll} from './service';

import {TableListData,executor} from './data.d';

export interface StateType {
  data: TableListData;
  executors: Array<executor>;
  modalVisible: boolean;
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
    reload: Effect;
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
    executors: [],
    modalVisible: false
  },

  effects: {
    * fetch({payload}, {call, put}) {
      const response = yield call(queryJob, payload);
      yield put({
        type: 'save',
        payload: {
          data:{
            list: response.data.list,
            pagination: response.data.page,
          }
        },
      });
    },
    * add({payload, callback}, {call, put}) {
      yield call(addJob, payload);
      yield put({
        type: 'reload'
      });
      if (callback) callback();
    },
    * remove({payload, callback}, {call, put}) {
      yield call(removeJob, payload);
      yield put({
        type: 'reload'
      });
      if (callback) callback();
    },
    * update({payload, callback}, {call, put}) {
      let response = yield call(updateJob, payload);
      if (response && response.code != 0) {
        yield put({
          type: 'save',
          payload: {
            modalVisible: true
          },
        });
      }else {
        yield put({
          type: 'reload'
        });
        if (callback) callback();
      }
    },
    * executorAll({payload, callback}, {call, put}) {
      yield call(executorAll, payload);
      yield put({
        type: 'reload'
      });
      if (callback) callback();
    },
    * reload({payload, callback},{call, put, select}) {
      const search = yield select(state => state);
      yield put({type: 'fetch', payload: {search}});
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

import {AnyAction, Reducer} from 'redux';
import {EffectsCommandMap} from 'dva';
import {queryRecord, removeRule} from './service';

import {TableListData} from './data.d';

export interface StateType {
  data: TableListData;
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
    updateModalVisible: false
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryRecord, payload);
      yield put({
        type: 'save',
        payload: {
          data:{
            list: response.data.list,
            pagination: response.data.page,
          },
        },
      });
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeRule, payload);
      yield put({
        type: 'save',
        payload: response,
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

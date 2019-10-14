import {AnyAction, Reducer} from 'redux';
import {EffectsCommandMap} from 'dva';
import {addJob, executorAll, queryJob, removeJob, updateJob,run} from './service';

import {executor, TableListData} from './data.d';
import {message} from "antd";

export interface StateType {
  data: TableListData;
  executors: Array<executor>;
  updateModalVisible: boolean;
  createModalVisible: boolean;
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
    executorAll: Effect;
    reload: Effect;
    updateModalVisible: Effect;
    run: Effect;
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
    search: {},
    updateModalVisible: false,
    createModalVisible: false
  },

  effects: {
    * fetch({payload}, {call, put}) {
      console.log(payload);
      let flag = false;
      let createFlag = false;
      if (payload && payload.updateModalVisible){
        flag = payload.updateModalVisible;
      }
      if (payload && payload.createModalVisible){
        createFlag = payload.createModalVisible;
      }
      const response = yield call(queryJob, payload);
      yield put({
        type: 'save',
        payload: {
          data:{
            list: response.data.list,
            pagination: response.data.page,
          },
          updateModalVisible: flag,
          createModalVisible: createFlag,
          search: payload
        },
      });
    },
    * add({payload, callback}, {call, put}) {
      let response = yield call(addJob, payload);
      if (response && response.code != 0) {
        yield put({
          type: 'save',
          payload: {
            createModalVisible: true
          },
        });
      }else {
        yield put({
          type: 'reload',
          payload: {
            createModalVisible: false
          },
        });
        message.success('添加成功');
        if (callback) callback();
      }
    },
    * remove({payload, callback}, {call, put}) {
      let response = yield call(removeJob, payload);
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
    * update({payload, callback}, {call, put}) {
      let response = yield call(updateJob, payload);
      if (response && response.code != 0) {
        yield put({
          type: 'save',
          payload: {
            updateModalVisible: true
          },
        });
      }else {
        yield put({
          type: 'reload',
          payload: {
            updateModalVisible: false
          },
        });
        message.success('修改成功');
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
    * reload({payload, callback},{call, put, select}) {
      const search = yield select(state => state.executeJob.search);
      yield put({type: 'fetch', payload: search});
    },
    * updateModalVisible({payload}, {call, put}) {
      yield put({
        type: 'save',
        payload: {
          ...payload
        },
      });
    },
    * run({payload}, {call, put}) {
      yield call(run, payload);
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

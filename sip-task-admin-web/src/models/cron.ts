import {AnyAction, Reducer} from 'redux';
import {EffectsCommandMap} from 'dva';
import {fiveCron} from '../services/cron';

export interface StateType {
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
    cron: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Cron: ModelType = {
  namespace: 'cron',

  state: {
    cron: [],
  },

  effects: {
    * cron({payload, callback}, {call, put}) {
      const response = yield call(fiveCron, payload);
      yield put({
        type: 'save',
        payload: {
          cron: response.data || [],
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

export default Cron;

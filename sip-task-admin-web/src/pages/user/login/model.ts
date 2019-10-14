import {AnyAction, Reducer} from 'redux';
import {EffectsCommandMap} from 'dva';
import {routerRedux} from 'dva/router';
import {login} from './service';
import {getPageQuery, setAuthority} from './utils/utils';

export interface StateType {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'userLogin',

  state: {
    status: undefined,
  },

  effects: {
    * login({payload}, {call, put}) {
      const response = yield call(login, payload);

      // Login successfully
      if (response.success) {
        window.localStorage.setItem("auth", JSON.stringify(response.data));
        yield put({
          type: 'changeLoginStatus',
          payload: response,
        });
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let {redirect} = params as { redirect: string };
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace({pathname: '/'}));
      }
    },

  },

  reducers: {
    changeLoginStatus(state, {payload}) {
      setAuthority('admin');
      return {
        ...state,
        status: "ok",
        type: "account",
      };
    },
  },
};

export default Model;

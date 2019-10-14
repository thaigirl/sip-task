import request from '@/utils/request';
import {FormDataType} from './index';

export async function login(params: FormDataType) {
  return request('/api/user/login', {
    method: 'POST',
    data: params,
  });
}

export async function logout() {
  return request('/api/user/logout', {
    method: 'GET',
  });
}

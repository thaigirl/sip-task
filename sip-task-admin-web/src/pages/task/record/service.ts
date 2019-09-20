import request from '@/utils/request';
import { queryParam } from './data.d';

export async function queryRecord(params: queryParam) {
  return request('/api/record/list', {
    params,
  });
}

export async function removeRule(params: queryParam) {
  return request('/api/record/list', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}



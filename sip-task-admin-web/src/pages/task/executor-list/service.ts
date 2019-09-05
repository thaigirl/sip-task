import request from '@/utils/request';
import { TableListParams } from './data.d';

export async function queryExecutor(params: TableListParams) {
  return request('/api/executor/list', {
    params,
  });
}

export async function removeExecutor(params: TableListParams) {
  return request('/api/executor/delete', {
    method: 'DELETE',
    data:  params
  });
}

export async function addExecutor(params: TableListParams) {
  return request('/api/executor/insert', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateExecutor(params: TableListParams) {
  return request('/api/executor/update', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}

export async function fiveCron(params: any) {
  return request('/api/cron?cron='+params.cron, {
    method: 'GET',
    data: {
      ...params,
    },
  });
}

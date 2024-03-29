import request from '@/utils/request';
import { queryParam } from './data.d';

export async function queryJob(params: queryParam) {
  return request('/api/job/list', {
    params,
  });
}

export async function removeJob(params: any) {
  return request('/api/job/delete', {
    method: 'DELETE',
    data: params
  });
}

export async function addJob(params: queryParam) {
  return request('/api/job/insert', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateJob(params: queryParam) {
  return request('/api/job/update', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}

export async function executorAll(params: queryParam) {
  return request('/api/executor/all', {
    params,
  });
}

export async function run(id: number) {
  return request('/api/job/run/'+id, {
    method: 'POST',
  });
}

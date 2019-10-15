import request from '../utils/request';

export async function fiveCron(params: any) {
  return request(`/api/cron?cron=${params.cron}`, {
    method: 'GET',
    data: {
      ...params,
    },
  });
}

import request from '@/utils/request';

export async function Info() {
  return request('/api/index/info');
}

export async function lineChart(param: any) {
  return request('/api/index/lineChartInfo', {
    data: param
  });
}

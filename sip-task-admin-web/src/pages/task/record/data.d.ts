import {BaseItem, BasePagination, BaseTableListData} from '../page'

export interface TableListItem extends BaseItem {
  executorName: string;
  jobName: string;
  code: string;
  timeout: number;
  failRetryCount: number;
  startTime: number;
  endTime: number;
  status: string;
}

export interface TableListData extends BaseTableListData {
  list: TableListItem[]
}

export interface TableListPagination extends BasePagination {
}

export interface queryParam {
  executorId: number;
  jobId: number;
  status: string;
  code: string;
  desc: string;
  pageSize: number;
  pageNum: number;
}

export interface executor extends BaseItem {
  name: string;
}


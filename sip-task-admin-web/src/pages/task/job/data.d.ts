import {BaseItem, BasePagination, BaseTableListData} from '../page'

export interface TableListItem extends BaseItem {
  executorId: number;
  cron: string;
  desc: string;
  name: string;
  alarmEmail: string;
  strategy: string;
  timeout: number;
  failRetryCount: number;
  enable: boolean;
  code: string;
  executorName: string;
  param: Param[];
}

export interface Param {
  key: string,
  type: string,
  value: string
}

export interface TableListData extends BaseTableListData {
  list: TableListItem[]
}

export interface TableListPagination extends BasePagination {
}

export interface queryParam {
  executorId: string;
  enable: boolean;
  code: string;
  desc: string;
  pageSize: number;
  pageNum: number;
}

export interface executor extends BaseItem {
  name: string;
}

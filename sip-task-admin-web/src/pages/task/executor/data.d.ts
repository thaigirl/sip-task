export interface TableListItem {
  id: number;
  name: string;
  desc: string;
  order: number;
  addressList: string;
  createTime: number;
  createUser: string;
  updateTime: number;
  updateUser: string;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current:number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  name: string;
  pageSize: number;
  pageNum: number;
}

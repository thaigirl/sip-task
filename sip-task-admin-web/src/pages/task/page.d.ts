export interface BasePagination {
  total: number;
  pageSize: number;
  current: number;
}
export interface BaseItem {
  id: number
}
export interface BaseTableListData {
  pagination: Partial<BasePagination>;
}

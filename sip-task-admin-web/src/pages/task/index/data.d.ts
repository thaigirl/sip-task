export interface indexDto {
  jobInfo:job,
  recordInfo:record,
  executorCount:number
}

export interface job {
  totalCount: number;
  enableCount: number;
  disableCount: number;
}
export interface record {
  totalCount: number;
  waitExecCount: number;
  successCount: number;
  failCount: number;
  runingCount: number;
  timeOutCount: number;
}

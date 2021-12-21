export interface Page<T> {
  /**
   * 当前页
   */
  current: number;

  /**
   * 当前页
   */
  currentPage: number;
  data: T[];

  /**
   * 当前页的最后一项
   */
  endIndex: number;

  /**
   * 当前页的第一项
   */
  startIndex: number;

  /**
   * 是否是最后一页
   *
   * 默认值： false
   */
  lastPage: boolean;

  /**
   * 是否是第一页
   *
   * 默认值： false
   */
  firstPage: boolean;

  /**
   * 下一页
   */
  nextPage: number;

  /**
   * 上一页
   */
  previousPage: number;

  /**
   * 当前页条数
   */
  pageCount: number;

  pageSize: number;

  /**
   * 总条数
   */
  total: number;

  /**
   * 单位
   *
   * 默认：条
   */
  unit: string;
}

export interface PageParams {
  current?: number;
  pageSize?: number;
  [key: string]: any;
}

export interface BaseType<T> {
  data: T
}

export interface ErrorType {
  message: string
}

export interface LoginResType {
  token: string
}

export type ColumnsOptionType = ColumnOptionType[]
export interface ColumnOptionType {
  header_name?: string,
  type?: string,
  width?: number,
  editable?: boolean,
}

export interface TableBaseType {
  row: number,
  column: number,
}

type RowType = string[]
export type TableRowsType = RowType[]

export interface TableDataType {
  columns_option?: ColumnsOptionType
  table: TableRowsType
}

export interface TableDataReqType {
  table: TableRowsType
}
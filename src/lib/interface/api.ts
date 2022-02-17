export interface BaseType<T> {
  data: T
}

export interface ErrorType {
  message: string
}

export interface LoginResType {
  token: string
}

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
type TableType = RowType[]

export interface TableDataType {
  columns_option?: ColumnOptionType[]
  table: TableType
}

export interface TableDataReqType {
  table: TableType
}
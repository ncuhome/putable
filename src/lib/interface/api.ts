import { GridAlignment } from '@mui/x-data-grid'

export interface Base<T> {
  data: T
}

export interface Error {
  message: string
}

export interface LoginResult {
  token: string
}

export type ColumnOptions = ColumnOption[]
export interface ColumnOption {
  headerName?: string
  type?: string
  width?: number
  editable?: boolean
  align?: GridAlignment
  headerAlign?: GridAlignment
}

export interface TableBase {
  row: number
  column: number
}

type Row = string[]
export type Rows = Row[]

export interface TableData {
  column_options?: ColumnOptions
  table: Rows
}

export interface TableDataRequest {
  table: Rows
}

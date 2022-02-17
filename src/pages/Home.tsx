import * as React from 'react';

import DrawerLeft from "../components/DrawerLeft";
import Table from "../components/Table";
import styles from './index.module.css'
import {GridColDef, GridColumns, GridRowModel, GridRowsProp} from "@mui/x-data-grid";
import {useEffect, useState} from "react";
import {ColumnsOptionType, TableDataType, TableRowsType} from "../lib/interface/api";
import {globalStorage} from "../lib/storage/storage";

export default function Home() {
  const [tableRenderColumns, setTableRenderColumns] = useState<GridColumns>([])
  const [tableRenderRows, setTableRenderRows] = useState<GridRowsProp>([])
  const [tableColumnsOption, setTableColumnsOption] = useState<ColumnsOptionType>([])
  const [tableRows, setTableRows] = useState<TableRowsType>([])
  useEffect(() => {
    const columnsOption = globalStorage.get<ColumnsOptionType>('tableColumns')
    const rows = globalStorage.get<TableRowsType>('tableRows')
    if(columnsOption !== null) {
      setTableColumnsOption(columnsOption)
      setTableRenderColumns(handleRenderColumns(columnsOption))
      console.log(handleRenderColumns(columnsOption))
    }
    if(rows !== null) {
      setTableRows(rows)
      setTableRenderRows(handleRenderRows(rows))
      console.log(handleRenderRows(rows))
    }
  }, [])

  const handleRenderRows = (source: TableRowsType) => {
    return source.map((row, index) => {
      const rowData: GridRowModel = { id: index+1 }
      for(let i = 0, len = row.length; i < len; i++) {
        rowData[i+1] = row[i]
      }
      return rowData
    })
  }
  const handleRenderColumns = (source: ColumnsOptionType) => {
    return source.map((column, index) => {
      const columnData: GridColDef = { field: (index+1).toString(), ...column }
      return columnData
    })
  }

  //单元格修改
  const onCellCommit = (row: number, column: number, value: string) => {
    if(tableRows === undefined) return
    const newTableRows = [...tableRows]
    newTableRows[row][column] = value
    globalStorage.set('tableRows', newTableRows)
    setTableRows(newTableRows)
  }

  //请求获取到表格数据
  const tableDataHandler = (data: TableDataType) => {
    globalStorage.set('tableRows', data.table)
    globalStorage.set('tableColumns', data.columns_option)
    setTableRows(data.table)
    setTableRenderRows(handleRenderRows(data.table))
    if(data.columns_option === undefined) return
    setTableColumnsOption(data.columns_option)
    setTableRenderColumns(handleRenderColumns(data.columns_option))
  }

  return (
    <div className={styles.container}>
      <DrawerLeft tableRowsData={tableRows} tableDataHandler={tableDataHandler}/>
      <div className={styles.tableContainer}>
        <Table rows={tableRenderRows} columns={tableRenderColumns}
               onCellCommit={onCellCommit}/>
      </div>
    </div>
  );
}


import * as React from 'react';
import {DataGrid, GridColumns, GridEditRowsModel, GridRowsProp} from '@mui/x-data-grid';

interface Props {
  columns: GridColumns
  rows: GridRowsProp
  onCellCommit: (row: number, column: number, value: string) => void
}
export default function Index({ rows, columns, onCellCommit }: Props) {
  const [editRowsModel, setEditRowsModel] = React.useState<GridEditRowsModel>();

  const handleEditRowsModelChange = React.useCallback((model: GridEditRowsModel) => {
    setEditRowsModel(model);
  }, []);
  const cellEditCommitHandler = () => {
    if(editRowsModel === undefined) return
    const row = Object.keys(editRowsModel)[0]
    const column = Object.keys(editRowsModel[row])[0]
    const value = editRowsModel[row][column].value
    onCellCommit(+row-1, +column-1, value as string)
    /*
    console.log(editRowsModel)
    console.log(row)
    console.log(column)
    console.log(value)
     */
  }

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid rows={rows} columns={columns}
                editRowsModel={editRowsModel}
                onCellEditCommit={cellEditCommitHandler}
                onEditRowsModelChange={handleEditRowsModelChange}/>
    </div>
  );
}
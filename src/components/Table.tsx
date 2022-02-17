import * as React from 'react';
import { DataGrid, GridColumns, GridRowsProp } from '@mui/x-data-grid';
import {
  randomTraderName,
} from '@mui/x-data-grid-generator';

export default function Index() {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}

const columns: GridColumns = [
  { field: '1', headerName: 'a', type: 'string', width: 200, editable: true },
  { field: '2', headerName: 'b', type: 'string', width: 200, editable: true },
  { field: '3', headerName: 'c', type: 'string', width: 200, editable: true },
  { field: '4', headerName: 'd', type: 'string', width: 200, editable: true },
];

const rows: GridRowsProp = [
  {
    id: 1,
    1: randomTraderName(),
    2: randomTraderName(),
    3: randomTraderName(),
    4: randomTraderName(),
  },
  {
    id: 2,
    1: randomTraderName(),
    2: randomTraderName(),
    3: randomTraderName(),
    4: randomTraderName(),
  }
];

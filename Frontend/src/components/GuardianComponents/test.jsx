import * as React from 'react';
import { DataGrid, GridFooter, GridPagination } from '@mui/x-data-grid';

const CustomFooter = () => (
  <GridFooter>
    {/* Your custom text goes here */}
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px' }}>
      <div>
        {/* Your custom text */}
        <span style={{ marginRight: '16px' }}>Custom Footer Text</span>
      </div>
      <GridPagination />
    </div>
  </GridFooter>
);

export default function CustomDataGrid() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={[
          { id: 1, col1: 'Hello', col2: 'World' },
          // Add more rows as needed
        ]}
        columns={[
          { field: 'col1', headerName: 'Column 1', width: 150 },
          { field: 'col2', headerName: 'Column 2', width: 150 },
          // Add more columns as needed
        ]}
        pageSize={5}
        components={{
          Footer: CustomFooter,
        }}
      />
    </div>
  );
}

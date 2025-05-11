import { ReactNode } from 'react';

export interface RowData {
  id: number;
  [key: string]: any;
}

export interface ColumnDef {
  field: string;
  headerName: string;
  width?: number;
  pinned?: 'left' | 'right';
  renderCell?: (row: RowData) => ReactNode;
  filterable?: boolean;
  sortable?: boolean;
}

export interface DataGridProps {
  rows: RowData[];
  columns: ColumnDef[];
  className?: string;
}

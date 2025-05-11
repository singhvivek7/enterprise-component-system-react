import { formatDateTime } from '@/lib/utils';
import { ColumnDef } from './types';
import { Badge } from '@/components/ui/badge';

export const useColumns = () => {
  const columns: ColumnDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 80,
      pinned: 'left',
      filterable: true,
      sortable: true,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      filterable: true,
    },
    { field: 'email', headerName: 'Email', width: 200, filterable: true },
    {
      field: 'phone',
      headerName: 'Phone Number',
      width: 150,
      filterable: true,
    },
    { field: 'address', headerName: 'Address', width: 250 },
    { field: 'city', headerName: 'City', width: 120, filterable: true },
    { field: 'state', headerName: 'State', width: 120, filterable: true },
    { field: 'zip', headerName: 'ZIP Code', width: 100 },
    {
      field: 'country',
      headerName: 'Country',
      width: 120,
      filterable: true,
      sortable: true,
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 180,
      sortable: true,
      renderCell: row => formatDateTime(row.createdAt),
    },
    {
      field: 'updatedAt',
      headerName: 'Updated At',
      width: 180,
      sortable: true,
      renderCell: row => formatDateTime(row.updatedAt),
    },
    { field: 'status', headerName: 'Status', width: 100, filterable: true },
    {
      field: 'role',
      headerName: 'Role',
      width: 100,
      pinned: 'right',
      renderCell: row => <Badge>{row.role}</Badge>,
    },
    {
      field: 'lastLogin',
      headerName: 'Last Login',
      width: 180,
      renderCell: row => formatDateTime(row.lastLogin),
    },
    { field: 'isVerified', headerName: 'Verified', width: 100 },
  ];

  return columns;
};

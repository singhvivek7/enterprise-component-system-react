import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const downloadCSV = (rows: any[], columns: any[], filename: string) => {
  const headers = columns.map((col: any) => col.headerName).join(',');
  const csvRows = rows.map(row =>
    columns.map((col: any) => `"${row[col.field] || ''}"`).join(',')
  );
  const csv = [headers, ...csvRows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

export const downloadExcel = (
  rows: any[],
  columns: any[],
  filename: string
) => {
  import('xlsx').then(XLSX => {
    const worksheet = XLSX.utils.json_to_sheet(
      rows.map(row =>
        columns.reduce((obj: any, col: any) => {
          obj[col.headerName] = row[col.field];
          return obj;
        }, {})
      )
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, filename);
  });
};

export const formatDateTime = (dateInput: Date | string | number): string => {
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return '';

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;

  const formattedTime = `${hours}:${minutes} ${ampm}`;
  return `${day}/${month}/${year}, ${formattedTime}`;
};

import { useMemo } from 'react';
import DataGrid from '@/components/DataGrid/DataGrid';
import { generateMockData } from '@/components/DataGrid/mockData';
import { useColumns } from '@/components/DataGrid/useColumn';

export const DataGridDemo = () => {
  const columns = useMemo(useColumns, []);
  const rows = useMemo(() => generateMockData(10000), []);

  return (
    <section className="p-10 flex justify-center items-center flex-col">
      <h2 className="text-center text-4xl mb-6">1. Data Grid</h2>
      <DataGrid columns={columns} rows={rows} />
    </section>
  );
};

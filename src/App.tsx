import DataGrid from '@/components/DataGrid/DataGrid';
import { generateMockData } from '@/components/DataGrid/mockData';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { useColumns } from './components/DataGrid/useColumn';
import { useMemo } from 'react';

const App = () => {
  const columns = useMemo(useColumns, []);
  const rows = useMemo(() => generateMockData(10000), []);

  return (
    <main className="min-h-screen p-5">
      <header className="flex justify-end">
        <ThemeSwitcher />
      </header>
      <div className="p-10 flex justify-center items-center flex-col">
        <h2 className="text-center text-4xl">1. Data Grid</h2>
        <DataGrid columns={columns} rows={rows} />
      </div>
    </main>
  );
};

export default App;

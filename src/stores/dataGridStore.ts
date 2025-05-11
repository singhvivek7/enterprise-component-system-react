import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Filter {
  field: string;
  value: string;
}

interface Sort {
  field: string;
  direction: 'asc' | 'desc' | null;
}

interface DataGridState {
  filters: Filter[];
  setFilter: (field: string, value: string) => void;
  clearFilter: (field: string) => void;
  selectedRows: number[];
  toggleRowSelection: (rowId: number) => void;
  sort: Sort;
  setSort: (field: string, direction: 'asc' | 'desc' | null) => void;
}

export const useDataGridStore = create<DataGridState>()(
  persist(
    set => ({
      filters: [],
      setFilter: (field, value) =>
        set(state => {
          const filters = state.filters.filter(f => f.field !== field);
          if (value) filters.push({ field, value });
          return { filters };
        }),
      clearFilter: field =>
        set(state => ({
          filters: state.filters.filter(f => f.field !== field),
        })),
      selectedRows: [],
      toggleRowSelection: rowId =>
        set(state => {
          const selectedRows = state.selectedRows.includes(rowId)
            ? state.selectedRows.filter(id => id !== rowId)
            : [...state.selectedRows, rowId];
          return { selectedRows };
        }),
      sort: { field: '', direction: null },
      setSort: (field, direction) => set({ sort: { field, direction } }),
    }),
    { name: 'datagrid-storage' }
  )
);

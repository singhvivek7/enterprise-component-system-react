import { useRef, useState } from 'react';
import { ArrowDownUp, ArrowUp, ArrowDown } from 'lucide-react';
import { useDataGridStore } from '@/stores/dataGridStore';
import { cn, downloadCSV, downloadExcel } from '@/lib/utils';
import { DataGridProps } from './types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const DEFAULT_ROW_HEIGHT = 40;
const DEFAULT_HEADER_HEIGHT = 64;
const DEFAULT_COLUMN_WIDTH = 150;

const DataGrid = ({ rows, columns, className }: DataGridProps) => {
  const {
    filters,
    setFilter,
    selectedRows,
    toggleRowSelection,
    sort,
    setSort,
  } = useDataGridStore();
  const [scrollTop, setScrollTop] = useState(0);
  const [_, setScrollLeft] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredRows = rows.filter(row =>
    filters.every(({ field, value }) =>
      String(row[field]).toLowerCase().includes(value.toLowerCase())
    )
  );

  const sortedRows = [...filteredRows].sort((a, b) => {
    if (!sort.field || sort.direction === null) return 0;
    const valueA = a[sort.field];
    const valueB = b[sort.field];
    if (valueA == null || valueB == null) return 0;
    if (typeof valueA === 'string') {
      return sort.direction === 'asc'
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }
    return sort.direction === 'asc' ? valueA - valueB : valueB - valueA;
  });

  const totalHeight = sortedRows.length * DEFAULT_ROW_HEIGHT;
  const visibleRowsCount = Math.ceil(
    (gridRef.current?.clientHeight || 400 - DEFAULT_HEADER_HEIGHT) /
      DEFAULT_ROW_HEIGHT
  );
  const startIndex = Math.floor(scrollTop / DEFAULT_ROW_HEIGHT);
  const endIndex = Math.min(
    startIndex + visibleRowsCount + 1,
    sortedRows.length
  );
  const visibleRows = sortedRows.slice(startIndex, endIndex);

  const handleScroll = () => {
    if (gridRef.current) {
      setScrollTop(gridRef.current.scrollTop);
      setScrollLeft(gridRef.current.scrollLeft);
    }
  };

  const totalWidth = columns.reduce(
    (sum, col) => sum + (col.width || DEFAULT_COLUMN_WIDTH),
    0
  );

  const handleExportCSV = () => downloadCSV(sortedRows, columns, 'data.csv');
  const handleExportExcel = () =>
    downloadExcel(sortedRows, columns, 'data.xlsx');

  const handleSort = (field: string) => {
    if (sort.field === field) {
      const nextDirection =
        sort.direction === 'asc'
          ? 'desc'
          : sort.direction === 'desc'
          ? null
          : 'asc';
      setSort(field, nextDirection);
    } else {
      setSort(field, 'asc');
    }
  };

  const getColumnStyle = (col: any) => {
    const width = col.width || DEFAULT_COLUMN_WIDTH;

    const style: React.CSSProperties = {
      width,
      minWidth: width,
    };

    if (col.pinned === 'left') {
      let leftPosition = 0;
      const colIndex = columns.findIndex(c => c.field === col.field);

      for (let i = 0; i < colIndex; i++) {
        if (columns[i].pinned === 'left') {
          leftPosition += columns[i].width || DEFAULT_COLUMN_WIDTH;
        }
      }

      style.left = leftPosition;
    }

    if (col.pinned === 'right') {
      let rightPosition = 0;
      const colIndex = columns.findIndex(c => c.field === col.field);

      for (let i = columns.length - 1; i > colIndex; i--) {
        if (columns[i].pinned === 'right') {
          rightPosition += columns[i].width || DEFAULT_COLUMN_WIDTH;
        }
      }

      style.right = rightPosition;
    }

    return style;
  };

  return (
    <div className={cn('relative w-full', className)}>
      {/* Toolbar */}
      <div className="flex justify-end mb-2 space-x-2">
        <Button
          onClick={handleExportCSV}
          size="sm"
          variant="outline"
          className="cursor-pointer">
          Export CSV
        </Button>
        <Button
          onClick={handleExportExcel}
          size="sm"
          variant="outline"
          className="cursor-pointer">
          Export Excel
        </Button>
      </div>

      {/* Grid Container */}
      <div
        ref={gridRef}
        className="overflow-auto border rounded-md border-border"
        style={{ height: 400 }}
        onScroll={handleScroll}
        role="grid"
        aria-label="Data Grid">
        {/* Content Container */}
        <div style={{ minWidth: totalWidth, position: 'relative' }}>
          {/* Header */}
          <div
            className="sticky top-0 z-10 flex bg-muted"
            style={{ height: DEFAULT_HEADER_HEIGHT }}>
            {columns.map(col => (
              <div
                key={col.field}
                className={cn(
                  'flex items-center flex-col px-2 border-r border-border bg-muted',
                  col.pinned === 'left' && 'sticky left-0 z-20',
                  col.pinned === 'right' && 'sticky right-0 z-20',
                  col.sortable && 'cursor-pointer hover:bg-muted/80'
                )}
                style={getColumnStyle(col)}
                onClick={() => col.sortable && handleSort(col.field)}
                role={col.sortable ? 'button' : undefined}
                tabIndex={col.sortable ? 0 : undefined}
                onKeyDown={e =>
                  col.sortable && e.key === 'Enter' && handleSort(col.field)
                }
                aria-sort={
                  sort.field === col.field && sort.direction
                    ? sort.direction === 'asc'
                      ? 'ascending'
                      : 'descending'
                    : 'none'
                }>
                <div className="flex items-center w-full py-2">
                  <span className="font-medium truncate flex-1 text-sm">
                    {col.headerName}
                  </span>
                  {col.sortable && (
                    <span className="ml-1">
                      {sort.field === col.field && sort.direction === 'asc' ? (
                        <ArrowUp size={16} />
                      ) : sort.field === col.field &&
                        sort.direction === 'desc' ? (
                        <ArrowDown size={16} />
                      ) : (
                        <ArrowDownUp size={16} className="opacity-30" />
                      )}
                    </span>
                  )}
                </div>
                {col.filterable && (
                  <Input
                    type="text"
                    placeholder="Search..."
                    value={
                      filters.find(f => f.field === col.field)?.value || ''
                    }
                    onChange={e => setFilter(col.field, e.target.value)}
                    className="h-6 text-xs mb-1 w-full border border-foreground/20"
                    aria-label={`Filter ${col.headerName}`}
                    onClick={e => e.stopPropagation()}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Body */}
          <div style={{ height: totalHeight }}>
            <div
              style={{
                position: 'relative',
                top: startIndex * DEFAULT_ROW_HEIGHT,
                height: visibleRows.length * DEFAULT_ROW_HEIGHT,
              }}>
              {visibleRows.map((row, rowIndex) => (
                <div
                  key={row.id}
                  className={cn(
                    'flex border-t border-border',
                    selectedRows.includes(row.id)
                      ? 'bg-primary/10'
                      : rowIndex % 2 === 0
                      ? 'bg-background'
                      : 'bg-muted/30'
                  )}
                  style={{ height: DEFAULT_ROW_HEIGHT, minWidth: totalWidth }}
                  role="row"
                  onClick={() => toggleRowSelection(row.id)}
                  tabIndex={0}
                  onKeyDown={e =>
                    e.key === 'Enter' && toggleRowSelection(row.id)
                  }>
                  {columns.map(col => {
                    const cellContent = col.renderCell ? (
                      col.renderCell(row)
                    ) : (
                      <span className="truncate">{row[col.field]}</span>
                    );

                    const getBgClass = () => {
                      if (selectedRows.includes(row.id)) return 'bg-primary/10';
                      return rowIndex % 2 === 0 ? 'bg-background' : 'bg-muted';
                    };

                    return (
                      <div
                        key={`${row.id}-${col.field}`}
                        className={cn(
                          'flex items-center px-2 border-r border-border overflow-hidden',
                          col.pinned === 'left' && 'sticky left-0 z-10',
                          col.pinned === 'right' && 'sticky right-0 z-10',
                          col.pinned && getBgClass(),
                          col.pinned && 'shadow-sm'
                        )}
                        style={getColumnStyle(col)}
                        role="cell">
                        {cellContent}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataGrid;

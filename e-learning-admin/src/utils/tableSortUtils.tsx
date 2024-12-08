import { SortDirection } from '@/enums/sortDirection';
import { ChevronsDown, ChevronsUp, ChevronsUpDown } from 'lucide-react';
import React from 'react';

export type SortState<T> = {
  column: T | null;
  direction: SortDirection | null;
};

export function createSortHandlers<T>(
  setSortState: React.Dispatch<React.SetStateAction<SortState<T>>>,
  setSelectedSortField: (sortField: T) => void,
  setSelectedSortDir: (dir: SortDirection) => void
) {
  const handleSort = (column: T) => {
    setSortState((prevState) => {
      if (prevState.column === column && prevState.direction === SortDirection.ASC) {
        setSelectedSortField(column);
        setSelectedSortDir(SortDirection.DESC)
        return { column, direction: SortDirection.DESC };
      } else {
        setSelectedSortField(column);
        setSelectedSortDir(SortDirection.ASC)
        return { column, direction: SortDirection.ASC };
      }
    });
  };

  const getSortIndicator = (column: T, sortState: SortState<T>) => {
    if (sortState.column === column) {
      return sortState.direction === SortDirection.ASC ? (
        <span className='inline-flex text-muted-foreground'><ChevronsUp size={14} className='ms-1' /></span>
      ) : (
        <span className='inline-flex text-muted-foreground'><ChevronsDown size={14} className='ms-1' /></span>
      );
    }
    return <span className='inline-flex text-muted-foreground'><ChevronsUpDown size={14} className='ms-1' /></span>;
  };

  return { handleSort, getSortIndicator };
}
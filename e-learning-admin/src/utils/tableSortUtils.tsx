import { ChevronsDown, ChevronsUp, ChevronsUpDown } from 'lucide-react';
import React from 'react';

export type SortState<T> = {
  column: T | null;
  direction: 'asc' | 'desc' | null;
};

export function createSortHandlers<T>(
  setSortState: React.Dispatch<React.SetStateAction<SortState<T>>>,
  setSelectedOrderBy: (orderBy: T) => void
) {
  const handleSort = (column: T, ascValue: T, descValue: T) => {
    setSortState((prevState) => {
      if (prevState.column === column && prevState.direction === 'asc') {
        setSelectedOrderBy(descValue);
        return { column, direction: 'desc' };
      } else {
        setSelectedOrderBy(ascValue);
        return { column, direction: 'asc' };
      }
    });
  };

  const getSortIndicator = (column: T, sortState: SortState<T>) => {
    if (sortState.column === column) {
      return sortState.direction === 'asc' ? (
        <span className='inline-flex text-muted-foreground'><ChevronsUp size={14} className='ms-1' /></span>
      ) : (
        <span className='inline-flex text-muted-foreground'><ChevronsDown size={14} className='ms-1' /></span>
      );
    }
    return <span className='inline-flex text-muted-foreground'><ChevronsUpDown size={14} className='ms-1' /></span>;
  };

  return { handleSort, getSortIndicator };
}
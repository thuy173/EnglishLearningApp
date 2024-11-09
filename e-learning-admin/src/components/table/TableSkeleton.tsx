import React from 'react';
import { TableCell, TableRow } from '../ui/table';
import { Skeleton } from '../ui/skeleton';

interface TableSkeletonProps {
    columns: number;
    rows: number;
    hasCheckBox?: boolean;
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({ columns, rows, hasCheckBox = true }) => {
    return (
        <>
            {Array.from({ length: rows }).map((_, index) => (
                <TableRow key={index}>
                    {hasCheckBox && (
                        <TableCell className="text-center"><Skeleton className="h-4 w-4 mx-auto" /></TableCell>
                    )}
                    {Array.from({ length: hasCheckBox ? columns - 1 : columns }).map((_, rowIndex) => (
                        <TableCell key={rowIndex}><Skeleton className="h-4 w-full" /></TableCell>
                    ))}
                </TableRow>
            ))}
        </>
    );
};

export default TableSkeleton

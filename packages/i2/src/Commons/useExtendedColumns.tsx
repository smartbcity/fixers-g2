import React from "react"
import { MenuItem, MoreOptions } from "@smartb/g2-components";
import { CellProps, Column } from "@smartb/g2-layout";
import { useMemo } from "react";

export interface ExtandedColumnsParams<T extends object> {
    initialColumns: Column<T>[];
    /**
     * The additional columns to add to the table
     */
    additionnalColumns?: Column<T>[];
    /**
     * The i or the accessor of the columns you want to lock
     */
    blockedColumns?: string[];
    /**
     * The actions available on a organization
     */
    getActions?: (org: T) => MenuItem<{}>[]
}

export const useExtendedColumns = <T extends object>(extandParams: ExtandedColumnsParams<T>) => {
    const { initialColumns, additionnalColumns = [], blockedColumns, getActions } = extandParams;
    const columns = useMemo(() => {
        const actions = getActions ? [
            {
                id: 'moreoptions',
                Cell: ({ row }: CellProps<T>) => (
                    <MoreOptions
                        options={getActions(row.original)
                        }
                        onClick={(e) => e.stopPropagation()}
                    />
                )
            }
        ] : []
        const columns: Column<T>[] = [...initialColumns, ...additionnalColumns, ...actions];
        const columnsFiltered = blockedColumns ? columns.filter(col => !blockedColumns.includes(col.id as string) && !blockedColumns.includes(col.accessor as string)) : columns;
        return columnsFiltered
    }, [initialColumns, additionnalColumns, blockedColumns, getActions])
    return columns
}
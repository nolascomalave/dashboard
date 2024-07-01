'use client';
import {
    // createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable
} from '@tanstack/react-table';
import { useState, useMemo, useReducer } from 'react';

//TData
type User = {
    firstName: string
    lastName: string
    age: number
    visits: number
    progress: number
    status: string
}

const dataTable: User[] = [
    {
        "firstName": "Tanner",
        "lastName": "Linsley",
        "age": 33,
        "visits": 100,
        "progress": 50,
        "status": "Married"
    },
    {
        "firstName": "Kevin",
        "lastName": "Vandy",
        "age": 27,
        "visits": 200,
        "progress": 100,
        "status": "Single"
    }
];

export default function Table() {
    const rerender = useReducer(() => ({}), {})[1];
    //note: data needs a "stable" reference in order to prevent infinite re-renders
    //✅ GOOD: This will not cause an infinite loop of re-renders because `columns` is a stable reference
    const columns = useMemo(() => [
        { header: 'First Name',     accessorKey: 'firstName' },
        { header: 'Last Name',      accessorKey: 'lastName' },
        { header: 'Age',            accessorKey: 'age' },
        { header: 'Visits',         accessorKey: 'visits' },
        { header: 'Progress',       accessorKey: 'progress' },
        { header: 'Status',         accessorKey: 'status' }
    ], []);

    //✅ GOOD: This will not cause an infinite loop of re-renders because `data` is a stable reference
    const [data, setData] = useState(() => [
        // ...
    ]);
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    // ...render your table
    return (
        <div className="p-2">
          <table>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot>
              {table.getFooterGroups().map(footerGroup => (
                <tr key={footerGroup.id}>
                  {footerGroup.headers.map(header => (
                    <th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.footer,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </tfoot>
          </table>
          <div className="h-4" />
          <button onClick={() => rerender()} className="border p-2">
            Rerender
          </button>
        </div>
    )
}
'use client';

import Table from "@/components/Table";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();

const columns = [
    columnHelper.display({
        id: '#',
        header: '',
        cell: (props) => props.cell.row.index + 1,
        footer: (props) => props.table.getPaginationRowModel().rows.length ?? 0
    }),
    { header: "Quotation Number", accessorKey: "quote_num"/* , footer: '' */ },
    { header: "Quotation to", accessorKey: "customer"/* , footer: '' */ },
    { header: "Status", accessorKey: "status"/* , footer: '' */ },
    { header: "Cost", accessorKey: "cost"/* , footer: '' */ },
    { header: "Taxe"/* , footer: '' */, columns: [
        { header: "Total 1", accessorKey: "total1"/* , footer: '' */ },
        { header: "Total 2"/* , footer: '' */ , columns: [
            { header: "Total 3", accessorKey: "total3"/* , footer: '' */ },
            { header: "Total 4", accessorKey: "total4"/* , footer: '' */ },
            { header: "Total 5", accessorKey: "total5"/* , footer: '' */ }
        ]}
    ]},
    { header: "Total", accessorKey: "total"/* , footer: '' */ },
],
headerLayoutConfig = {
    '#': {
        style: {
            width: 0
        }
    }
},
cellLayoutConfig = {
    '#': {
        style: {
            textAlign: 'right'
        }
    }
};

export default function QuotationsTable() {
    return (
        <Table
            columns = {columns}
            headerLayoutConfig = {headerLayoutConfig}
            cellLayoutConfig = {cellLayoutConfig}
        />
    );
}
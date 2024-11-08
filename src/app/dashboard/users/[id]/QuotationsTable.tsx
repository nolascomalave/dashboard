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
    { header: "Amount", columns: [
        { header: "Cost", accessorKey: "cost" },
        { header: "Taxe", accessorKey: "taxe" },
        { header: "Total", accessorKey: "total" }
    ]}
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
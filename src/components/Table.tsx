'use client';

import { AccessorFnColumnDefBase, buildHeaderGroups, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import data from '@/assets/jsons/MOCK_DATA.json';
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from 'lucide-react';
import parse from 'html-react-parser';
import styles from './Table.module.scss';

type PersonData = {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	country: string;
	date_birth: Date | string;
}

const textMatches = (text: string) => {
	const regexp = new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');

	return parse(text.replace(regexp, '<span className="italic bg-secondary_layout">$&</span>'))
}

const getHeaderLevel = (header: any): {header: any, level: number} => {
	if(!header.isPlaceholder || header.subHeaders.length < 1 || (header.subHeaders.length === 1 && header.subHeaders[0].column.id !== header.column.id) || header.subHeaders.length > 1) {
		return {
			level: 1,
			header: header
		};
	}

	const subHeaderLevel = getHeaderLevel(header.subHeaders[0]);

	return {
		...subHeaderLevel,
		level: subHeaderLevel.level + 1
	};
}

export default function Table({
	columns = []
} : {
	columns: AccessorFnColumnDefBase<any>
}) {
	const [sorting, setSorting] = useState<string[]>([]);
	const [filtering, setFiltering] = useState<string>('');
	/* const columns = [
		{ header: "ID", 		accessorKey: "id", 			footer: '' },
		// { header: "Complete Name", accessorFn: (row: PersonData) => `${row.first_name} ${row.last_name}`},
		// { header: "Name", 		accessorKey: "first_name", 	footer: 'My Name' },
		// { header: "Surname", 	accessorKey: "last_name", 	footer: '' },
		{ header: "Nombres Completos", columns: [
			{ header: "Complete Name", accessorFn: (row: PersonData) => `${row.first_name} ${row.last_name}`},
			{ header: "Name", 		accessorKey: "first_name" },
			{ header: "Surname", 	accessorKey: "last_name" }
		] },
		{ header: "Email", 		accessorKey: "email", 		footer: '' },
		{ header: "Country", 	accessorKey: "country", 	footer: '' },
		{ header: "Date Birth", accessorKey: "date_birth" cell: (info: {getValue: () => string}) => dayjs(info.getValue()).format('DD/MM/YYYY') },
	]; */

	const table = useReactTable({
		data: data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			columnOrder: sorting,
			globalFilter: filtering.trim()
		},
		onColumnOrderChange: setSorting
	}),
	headerGroups = table.getHeaderGroups();

	/* useEffect(() => {
		console.log(table.getFooterGroups());
	}, []); */

	return (
		<div className={styles.TableContainer}>
			{/* <input value={filtering} onChange={(e: any) => setFiltering(e.target.value)} /> */}
			<table>
				<thead>
				{ (() => {
						let columnsRows: { [key: string | symbol | number]: {header: any, level: number, counter: number} } = {};

						return headerGroups.map((headerGroup) => (
								<tr
									key={headerGroup.id}
								>
									{
										headerGroup.headers.map((header) => {
											const OrderIcon = { "asc": ChevronUp, "desc": ChevronDown }[header.column.getIsSorted() ?? null] ?? null;

											if(!columnsRows[header.column.id]) {
												let headerLevel = getHeaderLevel(header);

												columnsRows[header.column.id] = {
													...headerLevel,
													counter: 0
												};
											}

											columnsRows[header.column.id].counter++;

											if(columnsRows[header.column.id].counter > 1) {
												return null;
											}

											console.log(columnsRows[header.column.id].header);

											return (
												<th
													key={header.id}
													colSpan={header.colSpan}
													rowSpan={columnsRows[header.column.id].level}
													onClick={header.column.getToggleSortingHandler()}
												>
													<div className="flex justify-center items-center gap-2">
														<span>
															{flexRender(columnsRows[header.column.id].header.column.columnDef.header, columnsRows[header.column.id].header.getContext())}
														</span>
														{OrderIcon && <OrderIcon width={10} heigth={10} />}
													</div>
												</th>
											)
										})
									}
								</tr>
							)
						)})()
					}
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
										)
									}
								</th>
							))}
						</tr>
					))}
				</tfoot>
			</table>

			{/* <button onClick={table.firstPage}>
				First Page
			</button>
			<button onClick={table.previousPage}>
				Previous Page
			</button>
			<button onClick={table.nextPage}>
				Next Page
			</button>
			<button onClick={table.lastPage}>
				Last Page
			</button> */}
		</div>
	);
}
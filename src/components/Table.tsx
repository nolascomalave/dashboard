'use client';

import { AccessorFnColumnDefBase, buildHeaderGroups, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
// import data from '@/assets/jsons/MOCK_DATA.json';
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
	data = [],
	columns = [],
	headerLayoutConfig = {},
	cellLayoutConfig = {}
} : {
	columns: AccessorFnColumnDefBase<any>,
	headerLayoutConfig: { [key: string | number | symbol]: any };
	cellLayoutConfig: { [key: string | number | symbol]: any };
	data: { [key: string | number | symbol]: any }[]
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
	headerGroups = table.getHeaderGroups(),
	rowsModel = table.getRowModel().rows;

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

											return (
												<th
													{...(headerLayoutConfig[header.column.id] ?? {})}
													key={header.id}
													colSpan={header.colSpan}
													rowSpan={columnsRows[header.column.id].level}
													onClick={header.column.getToggleSortingHandler()}
												>
													{!columnsRows[header.column.id].header.column.columnDef.header ? null : (
														<div className="flex justify-center items-center gap-2">
															<span>
																{flexRender(columnsRows[header.column.id].header.column.columnDef.header, columnsRows[header.column.id].header.getContext())}
															</span>
															{OrderIcon && <OrderIcon width={15} heigth={15} />}
														</div>
													)}
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
					{(() => {
						if(rowsModel.length < 1) {
							const headers = (headerGroups[headerGroups.length - 1] ?? {}).headers;

							return (
								<tr>
									<td colSpan={headers.length} className={styles.noDataMessage}>No Data</td>
								</tr>
							);
						}

						return rowsModel.map(row => (
							<tr key={row.id}>
								{row.getVisibleCells().map(cell => (
									<td key={cell.id} {...(cellLayoutConfig[cell.column.id] ?? {})}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						));
					})()}
				</tbody>
				<tfoot>
					{(() => {
						const firstFooterRow = headerGroups[0] ?? null,
							lastFooterRow = headerGroups[headerGroups.length - 1] ?? null;

						if(!firstFooterRow) {
							return null;
						}

						return (
							<tr key={firstFooterRow.id}>
								{lastFooterRow.headers.map(header => header.isPlaceholder ? null :(
									<td key={header.id} {...(cellLayoutConfig[header.column.id] ?? {})}>
										{rowsModel.length ? (
											flexRender(
												header.column.columnDef.footer,
												header.getContext()
											)
										) : <div className="py-2"></div>}
									</td>
								))}
							</tr>
						);
					})()}
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
import { buildHeaderGroups, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import data from '@/assets/jsons/MOCK_DATA.json';
import dayjs from "dayjs";
import { useState } from "react";
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

export default function Table() {
	const [sorting, setSorting] = useState<string[]>([]);
	const [filtering, setFiltering] = useState<string>('');
	const columns = [
		{ header: "ID", 		accessorKey: "id", 			footer: '' },
		// { header: "Complete Name", accessorFn: (row: PersonData) => `${row.first_name} ${row.last_name}`},
		// { header: "Name", 		accessorKey: "first_name", 	footer: 'My Name' },
		// { header: "Surname", 	accessorKey: "last_name", 	footer: '' },
		{ header: "Nombres Completos", columns: [
			{ header: "Complete Name", accessorFn: (row: PersonData) => `${row.first_name} ${row.last_name}`},
			{ header: "Name", 		accessorKey: "first_name", 	/* footer: 'My Name' */ },
			{ header: "Surname", 	accessorKey: "last_name", 	/* footer: '' */ }
		] },
		{ header: "Email", 		accessorKey: "email", 		footer: '' },
		{ header: "Country", 	accessorKey: "country", 	footer: '' },
		{ header: "Date Birth", accessorKey: "date_birth", 	/* footer: 'My Date Birth', */ cell: (info: {getValue: () => string}) => dayjs(info.getValue()).format('DD/MM/YYYY') },
	];

	const table = useReactTable<PersonData>({
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
	});


	return (
		<div className={styles.TableContainer}>
			<input value={filtering} onChange={(e: any) => setFiltering(e.target.value)} />
			<table>
				<thead>
					{ table.getHeaderGroups().map(headerGroup => (
						<tr
							key={headerGroup.id}>
							{
								headerGroup.headers.map(header => {
									const OrderIcon = { "asc": ChevronUp, "desc": ChevronDown }[header.column.getIsSorted() ?? null] ?? null;

									return (
										<th
											key={header.id}
											colSpan={header.colSpan}
											onClick={header.isPlaceholder ? undefined : header.column.getToggleSortingHandler()}
										>
												{
													header.isPlaceholder ?
														null
													:
														<div className="flex justify-center gap-2">
															<span>
																{flexRender(header.column.columnDef.header, header.getContext())}
															</span>
															{OrderIcon && !header.isPlaceholder && <OrderIcon width={10} heigth={10} />}
														</div>
												}
										</th>
									)
								})
							}
						</tr>
					)) }
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

			<button onClick={table.firstPage}>
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
			</button>
		</div>
	);
}
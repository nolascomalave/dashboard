import QuotationsTable from "./QuotationsTable";

export default async function Quotations({ id }: { id: number | string }) {
    return (
        <div className="quotations rounded-sm px-4 py-2 border-b border-gray-100 text-xl">
            <b className="flex-shrink-0">QUOTES</b>
            <QuotationsTable />
        </div>
    );
}
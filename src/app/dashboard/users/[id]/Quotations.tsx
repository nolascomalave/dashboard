export default async function Quotations({ id }: { id: number | string }) {

    await new Promise(res => setTimeout(res, 5000));

    return (
        <div className="quotations rounded-sm">
            <div className="px-4 py-2 border-b border-gray-100 text-xl">
                <b>QUOTES</b>
            </div>
        </div>
    );
}
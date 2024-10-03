import InputSearch from "@/components/InputSearch";
import { Suspense/* , useEffect, useRef, useState */ } from "react";
import { Plus } from 'lucide-react';
import Link from 'next/link';
import UsersList from "./UsersList";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DatalistSectionLoader from "@/components/DatalistSectionLoader";

export default async function Page({
    searchParams = {
        page: '1'
    }
}: {
    searchParams?: {
        query?: string;
        page?: string | number;
    };
}) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const session = await getServerSession(authOptions);

    return <>
        <div className="filters w-100 flex-shrink-0 flex justify-end gap-2">
            <div className="flex items-center gap-2">
                <InputSearch placeholder = 'Search...' />
                <Link
                    href="/dashboard/users/add"
                    className="flex text-sm items-center gap-1 bg-primary_layout focus:outline-none hover:bg-secondary_layout text-white font-bold p-2 px-3 rounded"
                >
                    <Plus
                        width={20}
                        height={20}
                        style={{
                            width: '1rem',
                            height: '1rem'
                        }}
                    />
                    New
                </Link>
            </div>
        </div>

        <Suspense key={query + currentPage} fallback={<DatalistSectionLoader />}>
            <UsersList
                searchParams = {searchParams}
                session={session}
            />
        </Suspense>
    </>
}
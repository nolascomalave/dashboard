'use server';

import InputSearch from "@/components/InputSearch";
import { Suspense/* , useEffect, useRef, useState */ } from "react";
import { Plus } from 'lucide-react';
import Link from 'next/link';
import UsersList from "./UsersList";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DatalistSectionLoader from "@/components/DatalistSectionLoader";
import FilterUsersList from "./FilterUsersList";

export default async function Page({
    searchParams = {
        page: '1',
    }
}: {
    searchParams?: {
        query?: string;
        page?: string | number;
        status?: string;
    };
}) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const session = await getServerSession(authOptions);

    let status = {
        Active: true,
        Inactive: true
    };

    if(!!searchParams) {
        try {
            status = JSON.parse(searchParams.status ?? '');
        } catch(e: any) {
            // No se captura el error.
        }

        Object.keys(status).forEach(el => {
            status[el] = status[el] === false ? false : true;
        });
    }

    return <>

        <FilterUsersList {...searchParams} status={status} />

        <Suspense key={query + currentPage} fallback={<DatalistSectionLoader />}>
            <UsersList
                searchParams = {{...searchParams, status}}
                session={session}
            />
        </Suspense>
    </>
}
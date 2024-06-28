'use client';
import InputSearch from "@/components/InputSearch";
import { DropdownMenuCheckboxes } from "@/components/DropDownCheckboxes";
import { useState } from "react";
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
    const [status, setStatus]: [
        {
            Active: boolean,
            Inactive: boolean,
            Annulled: boolean
        },
        (val: any) => void
    ] = useState({
        Active: true,
        Inactive: true,
        Annulled: true
    });

    return <>
        <div className="filters w-100 flex-shrink-0 flex justify-between gap-2">
            <DropdownMenuCheckboxes
                title="Filter"
                Icon="SlidersHorizontal"
                options = {[
                    {
                        title: 'Active',
                        state: status.Active,
                        setState: (val: boolean) => setStatus({...status, Active: val})
                    },
                    {
                        title: 'Inactive',
                        state: status.Inactive,
                        setState: (val: boolean) => setStatus({...status, Inactive: val})
                    },
                    {
                        title: 'Annulled',
                        state: status.Annulled,
                        setState: (val: boolean) => setStatus({...status, Annulled: val})
                    }
                ]}
            />
            <div className="flex items-center gap-2">
                <InputSearch placeholder = 'Search...' />
                <Link
                    href="/dashboard/users/form"
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
        <div className="h-full">

        </div>
    </>
}
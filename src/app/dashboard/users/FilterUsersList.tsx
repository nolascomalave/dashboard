'use client';

import { DropdownMenuCheckboxes } from "@/components/DropDownCheckboxes";
import { Plus, Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from 'next/link'
import styles from '@/components/InputSearch.module.scss';
import clsx from "clsx";
import { useDebouncedCallback } from "use-debounce";
import { toast } from "sonner";

const initialStatus = {
    Active: true,
    Inactive: true
}

export default function FilterUsersList({
    search,
    status: queryStatus
}: {
    search?: string;
    status?: {
        Active: boolean;
        Inactive: boolean;
    };
}) {
    const { replace } = useRouter(),
        searchParams = useSearchParams(),
        [ status, setStatus ] = useState<{Active: boolean, Inactive: boolean}>(queryStatus ?? initialStatus),
        pathname = usePathname();

    const handleSearch = useDebouncedCallback((query?: {name: string, value: string}) => {
        const params = new URLSearchParams(searchParams);

        if(query !== undefined) {
            if (query.value.trim()) {
                params.set(query.name, query.value);
            } else {
                params.delete(query.name);
            }
        }

        replace(`${pathname}?${params.toString()}`);
    }, 300);

    const handleStatusChange = (name: string, val: boolean) => {
        const existsActive = Object.keys(status).some((el: string) => ((el === name ? val : status[el]) === true));

        if(!existsActive) {
            return toast.error("You can't uncheck all status", {
                position: 'bottom-left',
                closeButton: true,
                duration: 3000
            });
        }

        setStatus({...status, [name]: val});
    };

    useEffect(() => {
        let statusQuery: string | string[] = [];

        Object.keys(initialStatus).forEach(el => {
            statusQuery.push(`"${el}":${(!(el in status) || status[el] === false) ? false : true}`);
        });

        statusQuery = `{${statusQuery.join(',')}}`;

        handleSearch({name: 'status', value: statusQuery});
    }, [status]);

    return (
        <div className="filters w-100 flex-shrink-0 flex justify-between gap-2">
            <DropdownMenuCheckboxes
                title="Filter"
                Icon="SlidersHorizontal"
                options = {[
                    {
                        title: 'Status',
                        options: [
                            {
                                title: 'Active',
                                state: status.Active,
                                setState: (val: boolean) => handleStatusChange('Active', val)
                            },
                            {
                                title: 'Inactive',
                                state: status.Inactive,
                                setState: (val: boolean) => handleStatusChange('Inactive', val)
                            }/* ,
                            {
                                title: 'Annulled',
                                state: status.Annulled,
                                setState: (val: boolean) => setStatus({...status, Annulled: val})
                            } */
                        ]
                    }
                ]}
            />

            <div className="flex items-center gap-2">
                {/* <InputSearch placeholder = 'Search...' /> */}
                <div
                    className={clsx({
                        "w-full relative flex flex-1 flex-shrink-0": true,
                        [styles.InputSearch]: true
                    })}
                    style={{
                        maxWidth: '800px'
                    }}
                >

                    <label htmlFor="voice-search" className="sr-only">Search</label>
                    <div className="relative w-full">
                        <input
                            type="text" id="voice-search"
                            className={"border border-gray-300 text-sm rounded-lg block w-full p-2 pe-10"}
                            placeholder={'Search...'}
                            onChange={(e) => handleSearch({
                                name: "search",
                                value: e.target.value
                            })}
                            defaultValue={search/* searchParams.get('query')?.toString() */}
                            required
                        />
                        <Search
                            width={20}
                            height={20}
                            className='w-9 h-9 text-inherit absolute inset-y-0 end-0 flex items-center pe-3 opacity-60'
                        />
                    </div>
                </div>

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
    );
}
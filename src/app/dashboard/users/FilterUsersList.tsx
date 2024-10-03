import { DropdownMenuCheckboxes } from "@/components/DropDownCheckboxes";
import InputSearch from "@/components/InputSearch";
import { Link, Plus, Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from '@/components/InputSearch.module.scss';
import clsx from "clsx";
import { useDebouncedCallback } from "use-debounce";

const initialStatus = {
    Active: true,
    Inactive: true
}

export default function FilterUsersList() {
    const { replace } = useRouter(),
        searchParams = useSearchParams(),
        [ status, setStatus ] = useState<{Active: boolean, Inactive: boolean}>(initialStatus),
        pathname = usePathname();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);

        // params.set('page', '1');

        if (term.trim()) {
            params.set('query', term);
        } else {
            params.delete('query');
        }

        replace(`${pathname}?${params.toString()}`);
    }, 300);

    useEffect(() => {
        handleSearch
    }, [status]);

    return (
        <>
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
                    }/* ,
                    {
                        title: 'Annulled',
                        state: status.Annulled,
                        setState: (val: boolean) => setStatus({...status, Annulled: val})
                    } */
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
                            // onChange={(e) => handleSearch(e.target.value)}
                            defaultValue={searchParams.get('query')?.toString()}
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
        </>
    );
}
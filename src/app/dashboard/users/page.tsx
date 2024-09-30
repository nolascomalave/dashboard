'use client';

import InputSearch from "@/components/InputSearch";
import { DropdownMenuCheckboxes } from "@/components/DropDownCheckboxes";
import { useEffect, useState } from "react";
import { Plus } from 'lucide-react';
import Link from 'next/link';
/* import Table from "@/components/Table"; */
import { usePathname } from "next/navigation";
/* import clsx from "clsx";
import styles from './styles.module.scss'; */
import EntityCard from "@/components/EntityCard";
import { ClientFetch } from "@/util/Fetching";
import { useSession } from "next-auth/react"
import { toast } from "sonner";
import { CompleteEntityUser } from "@/assets/types/users";
import ConfirmModal from "@/components/ConfirmModal";
/* import { useRouter } from "next/router"; */

export default function Page() {
    const { data: session } = useSession(),
        // router = useRouter(),
        pathname = usePathname(),
        [ users, setUsers ] = useState<CompleteEntityUser[]>([]);
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
    }),
    [ isOpenActInactModal, setIsOpenActInactModal] = useState(false);

    const openActInactModal = () => {
        setIsOpenActInactModal(true);
        console.log('Is Opened!');
    }

    const fetchUsers = async () => {
        const ftc = new ClientFetch();

        try {
            const res = await ftc.get({
                url: `${process.env.API}/system-subscription-users/`,
                headers: {
                    authorization: `Bearer ${session?.backendTokens.accessToken}`
                },
            });

            if(res.status !== 200) {
                if(res.status === 401) {
                    // return router.push('/login');
                }

                throw 'error';
            }

            const { data } = await res.json();

            setUsers(data);
        } catch(e: any) {
            toast.error('An unexpected error has occurred.', {
                position: 'bottom-left',
                closeButton: true,
                duration: Infinity
            });
        }
    }

    useEffect(() => {
        console.log('Is in page', pathname === '/dashboard/users');
    }, [pathname]);

    useEffect(() => {
        if(!!session) {
            fetchUsers();
        }
    }, [session]);

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
        <div
            className={"w-full h-full grid grid-cols-1 sm:grid-cols-2 grid-rows-none content-start lg:grid-cols-3 xl:grid-cols-4 grid-flow-row gap-4 md:gap-8"}
        >
            {users.map((user, key: number) => (
                <div key={key} className="flex justify-center">
                    <EntityCard
                        User = {user}
                        hrefEdit = {`/dashboard/users/edit/${user.id_system_subscription_user}`}
                        image = {!user.photo ? '' : `${process.env.API}/storage/entity/entity-${user.id_entity}/${user.photo}`}
                        activateAction = { openActInactModal }
                        inactivateAction = { openActInactModal }
                    />
                </div>
            ))}
            {/* <EntityCard/>
            <EntityCard/>
            <EntityCard/>
            <EntityCard/>
            <EntityCard/> */}
            {/* <div className="w-full p-4 bg-black"></div>
            <div className="w-full p-4 bg-red-400"></div>
            <div className="w-full p-4 bg-green-400"></div> */}
            {/* <Table/> */}
        </div>

        <ConfirmModal
            isOpen = { isOpenActInactModal }
            setIsOpen = { setIsOpenActInactModal }
        />
    </>
}
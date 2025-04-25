'use server';

import { CompleteEntity } from "@/assets/types/entity";
import DatalistSectionMessage from "@/components/DatalistSectionMessage";
import EntityCard from "@/components/EntityCard";
import Formats from '@/util/Formats';

export default async function CustomersList({
    searchParams = {},
    session
}: {
    searchParams: {
        search?: string;
        page?: number | string;
        status?: {
            Active?: boolean;
            Inactive?: boolean;
        }
    };
    session: any;
}) {
    const entities: CompleteEntity[] = [];

    let params: string | {[key: string | number | symbol]: any} = {},
        error = null;

    if('page' in searchParams && searchParams.page !== undefined) {
        params.page = searchParams.page;
    }

    if('search' in searchParams && searchParams.search !== undefined) {
        params.search = searchParams.search;
    }

    if('status' in searchParams && searchParams.status !== undefined) {
        params.status = searchParams.status;
    }

    try {
        const res = await fetch(`${process.env.API}/entity${!searchParams ? '' : ('?' + Formats.objectToParams(params))}`, {
            headers: {
                authorization: `Bearer ${session?.backendTokens.accessToken}`
            },
            cache: 'no-store'
        });

        if(res.status !== 200) {
            if(res.status === 401) {
                // return router.push('/login');
            }

            throw 'error';
        }

        const { data } = await res.json();

        entities.push(...(data ?? []));
    } catch(e: any) {
        // throw new Error('Failed to fetch entities.');
        error = 'Failed to fetch customers';
        /* toast.error('An unexpected error has occurred.', {
            position: 'bottom-left',
            closeButton: true,
            duration: Infinity
        }); */
    }

    return (
        <>
            {(!error && entities.length > 0) ? (
                <div
                    className={"w-full h-full grid grid-cols-1 sm:grid-cols-2 grid-rows-none content-start lg:grid-cols-3 xl:grid-cols-4 grid-flow-row gap-4 md:gap-8"}
                >
                    {entities.map((user, key: number) => (
                        <div key={key} className="flex justify-center">
                            <EntityCard
                                session={session}
                                Entity = {user}
                                CurrentEntity = {(!!session && !!session.user && user.system_subscription_user_id === session.user.id) ? session.user : null}
                                hrefEdit = {`/dashboard/customers/edit/${user.system_subscription_user_id}`}
                                // image = {!user.photo ? '' : `${process.env.API}/storage/entity/entity-${user.entity_id}/${user.photo}`}
                                /* activateAction = { openActInactModal } */
                                /* inactivateAction = { openActInactModal } */
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <DatalistSectionMessage isError={!!error}>{!error ? 'Customers not found!' : error}</DatalistSectionMessage>
            )}
        </>
    );
}
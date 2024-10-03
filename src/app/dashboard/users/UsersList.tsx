import { CompleteEntityUser } from "@/assets/types/users";
import DatalistSectionMessage from "@/components/DatalistSectionMessage";
import EntityCard from "@/components/EntityCard";

export default async function UsersList({
    searchParams = {},
    session
}: {
    searchParams: {
        query?: string;
        page?: number | string;
    };
    session: any;
}) {
    const users: CompleteEntityUser[] = [];

    let params: string | string[] = [],
        error = null;

    if('page' in searchParams && searchParams.page !== undefined) {
        params.push(`page=${parseInt(typeof searchParams.page === 'string' ? searchParams.page : searchParams.page.toString())}`);
    }

    if('query' in searchParams && searchParams.query !== undefined) {
        params.push(`search=${searchParams.query.trim()}`);
    }

    params = params.length < 1 ? '' : `?${params.join('&')}`;

    try {
        const res = await fetch(`${process.env.API}/system-subscription-users${params}`, {
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

        users.push(...(data ?? []));
    } catch(e: any) {
        // throw new Error('Failed to fetch users.');
        error = 'Failed to fetch users';
        /* toast.error('An unexpected error has occurred.', {
            position: 'bottom-left',
            closeButton: true,
            duration: Infinity
        }); */
    }

    return (
        <>
            {(!error && users.length > 0) ? (
                <div
                    className={"w-full h-full grid grid-cols-1 sm:grid-cols-2 grid-rows-none content-start lg:grid-cols-3 xl:grid-cols-4 grid-flow-row gap-4 md:gap-8"}
                >
                    {users.map((user, key: number) => (
                        <div key={key} className="flex justify-center">
                            <EntityCard
                                session={session}
                                User = {user}
                                CurrentUser = {(!!session && !!session.user && user.id_system_subscription_user === session.user.id) ? session.user : null}
                                hrefEdit = {`/dashboard/users/edit/${user.id_system_subscription_user}`}
                                image = {!user.photo ? '' : `${process.env.API}/storage/entity/entity-${user.id_entity}/${user.photo}`}
                                /* activateAction = { openActInactModal } */
                                /* inactivateAction = { openActInactModal } */
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <DatalistSectionMessage isError={!!error}>{!error ? 'Users not found!' : error}</DatalistSectionMessage>
            )}
        </>
    );
}
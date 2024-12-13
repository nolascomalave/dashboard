'use server';

import { redirect } from 'next/navigation';
import { CompleteEntity } from "@/assets/types/entity";
import { ServerFetch } from "@/util/Fetching";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { unstable_noStore as noStore } from 'next/cache';

export async function getEntity(id: number | string) {
    noStore();

    const session = await getServerSession(authOptions),
        ftc = new ServerFetch();
    let entity: undefined | CompleteEntity = undefined,
        closeInmediatly: null | {
            fn?: 'success' | 'error' | 'info' | 'warning';
            message: string;
            options?: undefined | {[key: string]: any};
        } = null,
        toRedirect = false,
        status: undefined | number = undefined;

    try {
        const res = await ftc.get({
            url: `${process.env.API}/entity/${id}`,
            data: {
                allEntityInfo: true
            },
            headers: {
                authorization: `Bearer ${session?.backendTokens.accessToken}`,
                'Cache-Control': 'no-store'
            },
            cache: "no-store"
        });

        if(res.status === 400 || res.status === 500) {
            throw res.status;
        } else if(res.status === 401) {
            throw 'redirect';
        } else if(res.status === 404) {
            closeInmediatly = {
                fn: 'warning',
                message: 'Entity not found!',
                options: {
                position: 'bottom-left',
                closeButton: true,
                    duration: 5000
                }
            };
        }

        status = res.status;
        entity = await res.json();
    } catch(e: any) {
        if(e === 'redirect') {
            toRedirect = true;
        } else {
            closeInmediatly = {
                fn: 'error',
                message: 'An unexpected error has occurred.',
                options: {
                    position: 'bottom-left',
                    closeButton: true,
                    duration: Infinity
                }
            };
        }
    }

    if(toRedirect) {
        return redirect('/login');
    }

    return {
        entity,
        closeInmediatly,
        status,
        session
    };
}
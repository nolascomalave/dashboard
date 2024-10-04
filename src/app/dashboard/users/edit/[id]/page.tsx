'use server';

import { redirect, useRouter } from 'next/navigation';
import UserForm from '@/layouts/UserForm';
import { getServerSession } from 'next-auth';
import { ServerFetch } from '@/util/Fetching';
import { CompleteEntityUser } from '@/assets/types/users';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Page({ params: { id } }: { params: { id: string } }) {
    const session = await getServerSession(authOptions),
        ftc = new ServerFetch();
    let user: undefined | CompleteEntityUser = undefined,
        closeInmediatly: null | {
            fn?: 'success' | 'error' | 'info' | 'warning';
            message: string;
            options?: undefined | {[key: string]: any};
        } = null,
        toRedirect = false;

    try {
        const res = await ftc.get({
            url: `${process.env.API}/system-subscription-users/${id}`,
            data: {
                allEntityInfo: true
            },
            headers: {
                authorization: `Bearer ${session?.backendTokens.accessToken}`
            },
        });

        if(res.status === 400 || res.status === 500) {
            throw res.status;
        } else if(res.status === 401) {
            throw 'redirect';
        } else if(res.status === 404) {
            closeInmediatly = {
                fn: 'warning',
                message: 'User not found!',
                options: {
                position: 'bottom-left',
                closeButton: true,
                    duration: 5000
                }
            };
        }

        user = await res.json();
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

    return (
        <div
            className='bg-white rounded-md m-auto'
            style={{
                boxShadow: '0 0 0.5rem 0 rgb(225,225,225)',
            }}
        >
            <UserForm
                className='p-8'
                isModal={true}
                user={user}
                initialLoading={true}
            />
        </div>
    );
}
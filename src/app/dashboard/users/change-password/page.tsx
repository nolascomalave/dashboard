'use server';

import { redirect } from 'next/navigation';
import { getUser } from '../actions';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ChangePasswordForm from '@/layouts/ChangePasswordForm';

export default async function page()  {
    const session = await getServerSession(authOptions);

    // await new Promise(res => setTimeout(() => res(true), 10000));

    if(!session) {
        return redirect('/login');
    }

    const { user, closeInmediatly } = await getUser(session.id);

    return (
        <div className='w-full h-full flex items-center justify-center'>
            <div
                className='bg-white rounded-md m-auto'
                style={{
                    boxShadow: '0 0 0.5rem 0 rgb(225,225,225)',
                }}
            >
                <ChangePasswordForm
                    session={session}
                    User={user}
                    FormContainerStyle={{
                        padding: '2rem !important'
                    }}
                />
            </div>
        </div>
    );
}
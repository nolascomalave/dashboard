'use server';

import { getUser } from '../actions';
import { notFound } from 'next/navigation';
import UserCard from './UserCard';
import Info from './Info';

export default async function ProfileInfo({ id }: { id: string }) {
    const { user, status, session } = await getUser(id);

    // await new Promise(res => setTimeout(() => res(true), 10000));

    if(status === 404 || !user) {
        return notFound();
    }

    return (
        <>
            <div className='info w-full flex-col'>
                <UserCard user={user} session={session} />

                <Info User={user} />
            </div>
        </>
    );
};
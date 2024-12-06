'use server';

import { getEntity } from '../actions';
import { notFound } from 'next/navigation';
import CustomerCard from './CustomerCard';
import Info from './Info';

export default async function ProfileInfo({ id }: { id: string }) {
    const { entity, status, session } = await getEntity(id);

    // await new Promise(res => setTimeout(() => res(true), 10000));

    if(status === 404 || !entity) {
        return notFound();
    }

    return (
        <>
            <div className='info w-full flex-col'>
                <CustomerCard customer={entity} session={session} />

                <Info Customer={entity} />
            </div>
        </>
    );
};
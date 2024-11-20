'use server';

import CustomerForm from '@/layouts/CustomerForm';
import { getEntity } from '../../actions';
import { notFound } from 'next/navigation';

export default async function Page({ params: { id } }: { params: { id: string } }) {
    const { entity, status } = await getEntity(id);

    if(status === 404 || !entity) {
        return notFound();
    }

    return (
        <div
            className='bg-white rounded-md m-auto'
            style={{
                boxShadow: '0 0 0.5rem 0 rgb(225,225,225)',
            }}
        >
            <CustomerForm
                className='p-8'
                isModal={true}
                customer={entity}
                initialLoading={true}
            />
        </div>
    );
}
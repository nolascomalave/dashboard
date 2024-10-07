'use server';

import UserForm from '@/layouts/UserForm';
import { getUser } from '../../actions';

export default async function Page({ params: { id } }: { params: { id: string } }) {
    const { user } = await getUser(id);

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
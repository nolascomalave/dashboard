'use client';

import { useRouter } from 'next/navigation';
import UserForm from '@/layouts/UserForm';

export default function Page() {
    const router = useRouter();

    const closeModal = () => {
        router.push('/dashboard/users');
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
                closeModal={closeModal}
                isModal={true}
            />
        </div>
    );
}
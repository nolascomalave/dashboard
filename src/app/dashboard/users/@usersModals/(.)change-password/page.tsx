'use server';

import { redirect } from 'next/navigation';
import { Modal } from '@/layouts/UI/Modal';
import { getUser } from '../../actions';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ChangePasswordForm from '@/layouts/ChangePasswordForm';

export default async function Page() {
    const session = await getServerSession(authOptions);

    // await new Promise(res => setTimeout(() => res(true), 10000));

    if(!session) {
        return redirect('/login');
    }

    const { user, closeInmediatly } = await getUser(session.id);

    return (
        <Modal
            title = {"Change Password"}
            closeInmediatly={null}
            // passCloseFunction={false}
            ModalContentClass='w-full'
            ModalContentStyles={{
                maxWidth: '20rem'
            }}
        >
            <ChangePasswordForm
                session={session}
                User={user}
            />
        </Modal>
    );
}
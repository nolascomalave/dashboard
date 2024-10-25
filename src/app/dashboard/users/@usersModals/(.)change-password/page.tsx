'use server';

import { redirect } from 'next/navigation';
import { Modal } from '@/layouts/UI/Modal';
import { getUser } from '../../actions';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UserForm from '@/layouts/UserForm';
import { Input } from '@/components/ui/input';

export default async function Page() {
    const session = await getServerSession(authOptions);

    // await new Promise(res => setTimeout(() => res(true), 10000));

    if(!session) {
        return redirect('/login');
    }

    const { user, closeInmediatly } = await getUser(session.id);

    return (
        <Modal title = {"New User"} closeInmediatly={null} passCloseFunction={false} >
            Holas
        </Modal>
    );
}
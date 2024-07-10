import { getServerSession } from 'next-auth';
import AsideNavbar from '@/layouts/AsideNavbar';
import { redirect } from 'next/navigation';

export default async function Layout({ children, usersModals }: { children: React.ReactNode, usersModals: React.ReactNode }) {
    const session = await getServerSession();

    if(!session) {
        redirect('/login');
    }

    console.log(session);

    return (
        <main className='flex h-lvh'>
            <AsideNavbar/>
            <div
                className='w-full p-4 flex flex-col gap-4 max-h-full overflow-auto'
                style={{
                    zIndex: 0
                }}
            >
                { children }
                { usersModals }
            </div>
        </main>
    );
};
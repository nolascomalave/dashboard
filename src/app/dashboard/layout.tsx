import Link from 'next/link';
import AsideNavbar from '@/layouts/AsideNavbar';

export default function Layout({ children, usersModals }: { children: React.ReactNode, usersModals: React.ReactNode }) {
    return (
        <main className='flex h-lvh'>
            <AsideNavbar/>
            <div className='w-full p-4 flex flex-col gap-4 max-h-full overflow-auto' style={{zIndex: 0}}>
                { children }
                { usersModals }
            </div>
        </main>
    );
};
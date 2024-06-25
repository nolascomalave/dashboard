import Link from 'next/link';
import AsideNavbar from '@/layouts/AsideNavbar';

export default function Layout({ children, auth }: { children: React.ReactNode, auth: React.ReactNode }) {
    return (
        <main className='flex h-lvh'>
            <AsideNavbar/>
            <div className='w-full p-4 flex flex-col gap-4' style={{zIndex: 0}}>
                <Link href="/dashboard/login">Open modal</Link>
                { children }
                { auth }
            </div>
        </main>
    );
};
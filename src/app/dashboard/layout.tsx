import AsideNavbar from '@/layouts/AsideNavbar';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className='flex h-lvh'>
            <AsideNavbar/>
            Hola
            { children }
        </main>
    );
};
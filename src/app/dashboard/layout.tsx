import Navbar from '@/layouts/Navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className='flex h-lvh'>
            <Navbar/>
            Hola
            { children }
        </main>
    );
};
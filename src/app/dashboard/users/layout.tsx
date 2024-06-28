export default function Layout({ children, usersModals }: { children: React.ReactNode, usersModals: React.ReactNode }) {
    return <>
        { children }
        { usersModals }
    </>;
}
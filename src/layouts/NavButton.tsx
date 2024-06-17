import Link from "next/link";

export default function NavButton({
    href,
    text,
    Icon = <></>,
    options
} : {
    options?: any[];
    text: string;
    href: string;
    Icon: React.ReactNode
}) {
    /* if(options) {
        return (
            <button className="opt-btn flex w-full items-center gap-2">
                <LogOut width={18} height={18}/>

                <p>
                    Log out
                </p>
            </button>
        );
    } */
    return (
        <Link
            href={'/dashboard/' + href}
            className='opt-btn flex w-full items-center gap-2'
        >
            { Icon }
            <p className="w-full">{text}</p>
        </Link>
    );
}
import clsx from "clsx";
import Link from "next/link";
import styles from './NavButton.module.scss';

export default function NavButton({
    isContracted,
    href,
    text,
    Icon = <></>,
    options
} : {
    isContracted?: boolean,
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
            className={clsx({
                [styles.NavButton]: true,
                'opt-btn flex w-full items-center gap-2': true,
                'contracted' : (isContracted === true)
            })}
        >
            { Icon }
            <p>{text}</p>
        </Link>
    );
}
'use client';
import Image from "next/image";
import styles from './AsideNavbar.module.scss';
import {
    LogOut,
    UserRoundCog,
    PanelLeftClose,
    PanelRightClose
} from 'lucide-react';
import AsideNavbarDetailOption from './AsideNavbarDetailOption';
import clsx from 'clsx';
import { useCounterStore } from "@/store/UIStore";

export default function AsideNavbar() {
    const { sidebar } = useCounterStore(
        (state) => state
    );
    const { setSidebar } = useCounterStore();

    return (
        <aside className={clsx({
            [styles.AsideNavbar]: true,
            'relative': true,
            'contracted': sidebar.isContracted
        })}>
            <header className='Navbar__header flex items-center gap-1'>
                <Image
                    src="/Images/IRMS-Logo.svg"
                    alt="IRMS Logo"
                    width={100}
                    height={100}
                    priority
                    className="Navbar__header__logo flex-shrink-0"
                />

                <div className='Navbar__header__text'>
                    <h1 className='Navbar__header__text__title'>
                        IRMS
                    </h1>
                    <h4 className='Navbar__header__text__subtitle'>
                        Information and Resources Management System
                    </h4>
                </div>
            </header>

            <div
                className="rounded-sm flex-shrink-0"
                style={{
                    backgroundColor: 'rgb(203, 213, 225)',
                    padding: '0.03125rem',
                    width: '90%',
                    margin: 'auto'
                }}
            ></div>

            <ul className="Navbar__menu">
                <li>
                    <AsideNavbarDetailOption
                        title='Administrator'
                        Icon={<UserRoundCog width={18} height={18} />}
                        isContracted={sidebar.isContracted}
                    />
                </li>
            </ul>

            <div
                className="rounded-sm flex-shrink-0"
                style={{
                    backgroundColor: 'rgb(203, 213, 225)',
                    padding: '0.03125rem',
                    width: '90%',
                    margin: 'auto'
                }}
            ></div>

            <footer className='Navbar__footer flex-shrink-0'>
                <button className="opt-btn flex w-full items-center gap-2">
                    <LogOut width={18} height={18}/>

                    <p>
                        Log out
                    </p>
                </button>
                {/* <p className='Navbar__footer__text'>
                    © 2021 IRMS. All rights reserved.
                </p> */}
            </footer>

            <button
                className='Navbar__aspect-button absolute rounded-r-full p-2 ps-1 top-2 left-full text-white'
                onClick={() => setSidebar({isContracted: !sidebar.isContracted})}
            >
                {sidebar.isContracted ? (
                    <PanelRightClose />
                ) : (
                    <PanelLeftClose />
                )}
            </button>
        </aside>
    )
}
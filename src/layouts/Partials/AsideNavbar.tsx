'use client';
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from './AsideNavbar.module.scss';
import * as LudiceIcons from 'lucide-react';
import AsideNavbarDetailOption from './AsideNavbarDetailOption';
import clsx from 'clsx';
import { useCounterStore } from "@/store/UIStore";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const menuData = [
    {
        title: 'Customers',
        Icon: 'CircleUserRound',
        options: [
            {
                href: '/customers',
                title: 'Customers',
                Icon: 'CircleUserRound'
            }
        ]
    },
    {
        title: 'Users',
        Icon: 'UserRoundCog',
        options: [
            {
                href: '/users',
                title: 'Users',
                Icon: 'UserRoundCog'
            }
        ]
    }
];

export default function AsideNavbar() {
    const router = useRouter();
    const { sidebar } = useCounterStore(
        (state) => state
    );
    const { setSidebar } = useCounterStore();
    const [mouseOverMenu, setMouseOverMenu] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const visibleInterval = useRef();

    const changeVisibility = (visible: boolean = true) => {
        // setMouseOverMenu(visible);
        if(visibleInterval.current !== null) {
            visibleInterval.current = clearInterval(visibleInterval.current);
        }

        if(visible === true) {
            setMouseOverMenu(visible);
        } else {
            visibleInterval.current = setTimeout(() => {
                setMouseOverMenu(visible);
            }, 1000);
        }
    }

    /* useEffect(() => {
        if(mouseOverMenu === true) {
            // visibleInterval.current = setTimeout(() => {
                setIsVisible(true);
                // setMouseOverMenu(visible);
            // }, visible === true ? 100 : 600);
        }

        //setIsVisible(mouseOverMenu);
    }, [mouseOverMenu]) */

    return (
        <aside
            className={clsx({
                [styles.AsideNavbar]: true,
                'relative hidden sm:flex': true,
                'contracted': sidebar.isContracted
            })}
            style={{
                zIndex: 1
            }}
            onMouseOver={() => changeVisibility(true)}
            onMouseOut={() => changeVisibility(false)}
        >
            <header className='Navbar__header'>
                <Link href={'/dashboard'} className="flex items-center gap-1">
                    <Image
                        src="/Images/logo.png" // src="/Images/IRMS-Logo.svg"
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
                </Link>
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
                {menuData.map((el, i) => {
                    const Icon = LudiceIcons[el.Icon];
                    return (
                        <li key={i}>
                            <AsideNavbarDetailOption
                                title={el.title}
                                Icon={<Icon width={18} height={18} />}
                                isContracted={sidebar.isContracted}
                                options={el.options}
                            />
                        </li>
                    )
                })}
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
                <button
                    className="flex w-full items-center gap-2"
                    onClick={() => signOut({
                        redirect: false
                    }).then(() => router.push('/login'))}
                >
                    <LudiceIcons.LogOut width={18} height={18}/>

                    <p>
                        Log out
                    </p>
                </button>
                {/* <p className='Navbar__footer__text'>
                    © 2021 IRMS. All rights reserved.
                </p> */}
            </footer>

            <div
                className="absolute top-2 left-full"
                style={{
                    display: mouseOverMenu === true ? 'initial' : 'none'
                }}
            >
                <button
                    className='Navbar__aspect-button rounded-r-full p-2 ps-1 text-white'
                    onClick={() => setSidebar({isContracted: !sidebar.isContracted})}
                >
                    {sidebar.isContracted ? (
                        <LudiceIcons.PanelRightClose />
                    ) : (
                        <LudiceIcons.PanelLeftClose />
                    )}
                </button>
            </div>
        </aside>
    )
}
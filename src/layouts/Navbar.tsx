import Link from 'next/link';
import Image from "next/image";
import styles from './Navbar.module.scss';
import NavButton from './NavButton';
import {
    LogOut,
    UsersRound
} from 'lucide-react';

export default function Navbar() {
    return (
        <nav className={styles.Navbar}>
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

            <ul className="Navbar__menu h-full">
                <li>
                    <NavButton
                        href={'/dashboard/users'}
                        text='Users'
                        Icon={<UsersRound width={18} height={18} />}
                    />
                </li>

                <li>
                <details className="group transition-all duration-150 h-10 open:h-28 overflow-hidden w-56">
        <summary className="transition-all duration-500 flex cursor-pointer items-center rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>

          <span className="ml-3 text-sm font-medium"> Teams </span>

          <span className="ml-auto shrink-0 transition duration-300 group-open:-rotate-180">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </span>
        </summary>

        <nav className="mt-1.5 ml-8 flex flex-col transition-all duration-500">
          <a href="" className="flex items-center rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>

            <span className="ml-3 text-sm font-medium"> Banned Users </span>
          </a>

          <a href="" className="flex items-center rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>

            <span className="ml-3 text-sm font-medium"> Calendar </span>
          </a>
        </nav>
      </details>
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
        </nav>
    )
}
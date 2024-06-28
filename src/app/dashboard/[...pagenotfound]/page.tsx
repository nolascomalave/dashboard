import Link from 'next/link'
import { Manrope } from "next/font/google";
import clsx from 'clsx';
import colors from '@/assets/scss/vars.module.scss';

const manrope = Manrope({ subsets: ["latin"] });

export default function NotFound() {
  return (
    <section className='flex w-full h-full items-center justify-center'>
        <div className='text-center max-[10rem]'>
          <p>Oops! Page Not Found</p>
          <h2
            className={clsx(manrope, 'text-8xl font-black')}
            style={{
              letterSpacing: '-0.15em',
              textShadow: `-0.06125em 0.06125em 0 ${colors.fond},
                0.06125em 0.06125em 0 ${colors.fond},
                0.06125em -0.06125em 0 ${colors.fond},
                -0.06125em -0.06125em 0 ${colors.fond}`
            }}
          >
            <b>4</b><b>0</b><b>4</b>
          </h2>
          <p>Whe are sorry, but the page you requested was not found</p>
          <div className='inline-block mt-4'>
            <Link
              href="/dashboard"
              className="flex text-sm items-center gap-1 bg-primary_layout focus:outline-none hover:bg-secondary_layout text-white font-bold p-2 px-3 rounded"
            >Return Home</Link>
          </div>
        </div>
    </section>
  )
}
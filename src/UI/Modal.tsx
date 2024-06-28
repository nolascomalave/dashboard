'use client'

import { useRouter } from 'next/navigation';
import styles from './Modal.module.scss';
import clsx from 'clsx';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import React from 'react';


export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const closeModal = () => {
    router.back();
  }

  return createPortal(
    (
        <div
            className={clsx({
                'flex justify-center items-center fixed top-0 right-0 bottom-0 left-0': true,
                [styles.Modal]: true
            })}
            style={{
                // zIndex: 1000,
                backgroundColor: 'rgba(0,0,0,0.5)'
            }}
            onClick={closeModal}
        >
            <div
                className='Modal__content bg-white rounded-md text-secondary_color'
                onClick = {(e) => e.stopPropagation()}
            >
                <header className='Modal__content__header px-4 py-2 rounded-t-md border-b border-primary_layout relative'>
                    Header title
                    <button
                        className='Modal__content__header__close absolute border border-secondary_color w-7 h-7 p-1 bg-fond opacity-50'
                        style={{
                            top: '-0.75rem',
                            right: '-0.75rem',
                            borderRadius: '50%'
                        }}
                        onClick={closeModal}
                    >
                        <X
                            width={20}
                            height={20} style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                                objectPosition: 'center'
                            }}
                        />
                    </button>
                </header>
                <div>{React.cloneElement(children, { closeModal })}</div>
            </div>
        </div>
    ),
    document.body
  );
}
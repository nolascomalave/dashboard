'use client';

import { useRouter } from 'next/navigation';
import styles from './Modal.module.scss';
import clsx from 'clsx';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';


export function Modal({
    title,
    closeInmediatly = null,
    children,
    passCloseFunction = true,
    ModalContentClass,
    ModalContentStyles
}: {
    title: any;
    closeInmediatly: null | {
        fn?: 'success' | 'error' | 'info' | 'warning';
        message: string;
        options?: undefined | {[key: string]: any};
    };
    children: React.ReactNode | string;
    passCloseFunction?: boolean;
    ModalContentClass?: string;
    ModalContentStyles?: React.CSSProperties;
}) {
  const router = useRouter(),
    [ isDisabledCloseBtnModal, setIsDisabledCloseBtnModal ] = useState<Boolean>(false),
    Title = !((typeof title === 'string') || (typeof title === 'number') ) ? title : null;

  const closeModal = () => {
    router.back();
  }

  useEffect(() => {
    if(closeInmediatly !== null) {
        (!closeInmediatly.fn ? toast : toast[closeInmediatly.fn](closeInmediatly.message, closeInmediatly.options));
        closeModal();
    }
  });

  return createPortal(
    (
        <div
            className={clsx({
                'flex justify-center items-center fixed top-0 right-0 bottom-0 left-0': true,
                [styles.Modal]: true,
                padding: '2rem'
            })}
            style={{
                // zIndex: 1000,
                backgroundColor: 'rgba(0,0,0,0.5)'
            }}
            // onClick={closeModal}
        >
            <div
                className={`Modal__content relative flex flex-col bg-white rounded-md text-secondary_color ${ModalContentClass}`.trim()}
                style = {ModalContentStyles}
                // onClick = {(e) => e.stopPropagation()}
            >
                <header className='Modal__content__header flex-shrink-0 px-4 py-2 rounded-t-md border-b border-primary_layout relative'>
                    { Title === null ? title : (<Title></Title>) }
                    {!isDisabledCloseBtnModal && (
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
                    )}
                </header>

                { passCloseFunction ? React.cloneElement(children, { closeModal, isDisabledCloseBtnModal, setIsDisabledCloseBtnModal }) : children }
            </div>
        </div>
    ),
    document.body
  );
}
'use client';

import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './ConfirmModal.module.scss';
import useMutationObserver from '@/hooks/useMutationObserver';
import { motion, AnimatePresence } from 'framer-motion';

const backdrop = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 }
};

const dialog = {
    visible: { scale: 1, rotate: 0 },
    hidden: { scale: 0.25, rotate: -90 },
}

const ConfirmModal = ({
    isOpen,
    setIsOpen
} : {
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => any,
}) => {

    const closeModal = () => setIsOpen(false);

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className={styles.fixedContainer}
                        key="modal"
                        variants={backdrop}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        style={{
                            backgroundColor: "rgba(0, 0, 0, 0.5)"
                        }}
                        transition={{
                            duration: 0.25
                        }}
                    />

                    <div
                        className={clsx({
                            [styles.fixedContainer]: true,
                        })}
                        onClick={closeModal}
                    >
                        <motion.div
                            className={clsx({
                                [styles.dialog]: true,
                                "rounded-md": true
                            })}
                            onClick = {e => e.stopPropagation()}
                            variants={dialog}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            transition={{
                                duration: 0.25
                            }}
                        >
                            <section></section>
                            <footer className='border-t'>
                                <button className='hover:bg-red-50 hover:text-red-600' onClick={closeModal}>Cancel</button>
                                <div className='border-l'></div>
                                <button>Accept</button>
                                {/* <button
                                    type="button"
                                    className="flex text-sm items-center gap-1 bg-primary_layout focus:outline-none hover:bg-secondary_layout text-white font-bold p-2 px-3 rounded disabled:border disabled:border-input disabled:text-input disabled:bg-transparent"
                                >
                                        Cancel
                                </button>

                                <button
                                    type="button"
                                    className="flex text-sm items-center gap-1 bg-primary_layout focus:outline-none hover:bg-secondary_layout text-white font-bold p-2 px-3 rounded disabled:border disabled:border-input disabled:text-input disabled:bg-transparent"
                                >
                                        Accept
                                </button> */}
                            </footer>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    , document.body);
};

export default ConfirmModal;
'use client';

import clsx from 'clsx';
import { createPortal } from 'react-dom';
import styles from './ConfirmModal.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import { CircleAlert, CircleCheckBig, CircleHelp, CircleX, LoaderCircle } from 'lucide-react';

type ConfirmVariantsType = {
    SUCCESS: 'success';
    WARNING: 'warning';
    ERROR: 'error';
}

const ConfirmVariants = {
        SUCCESS: 'success',
        WARNING: 'warning',
        ERROR: 'error',
        QUESTION: 'question'
    },
    ArrayVariants = Object.keys(ConfirmVariants).map((el: string) => ConfirmVariants[el]);

const backdrop = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 }
};

const dialog = {
    visible: { scale: 1, rotate: 0 },
    hidden: { scale: 0, rotate: -90 },
}

const ConfirmModal = ({
    isOpen,
    setIsOpen,
    variant = ConfirmVariants.QUESTION,
    title,
    text,
    textStyles,
    acceptAction,
    cancelAction,
    noCancelButton = false,
    AcceptTextButton = 'Accept',
    CancelTextButton = 'Cancel',
    showLoader = false,
    disabled = false,
    preventCloseWithBackdrop = false
} : {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => any;
    variant?: string;
    title?: string | number | bigint;
    text: string | number | bigint | React.ReactElement;
    textStyles?: {[key: string | number | symbol]: any}
    acceptAction?: (closeAction: () => any) => any;
    cancelAction?: (closeAction: () => any) => any;
    noCancelButton?: boolean;
    AcceptTextButton?: string;
    CancelTextButton?: string;
    showLoader?: boolean;
    disabled?: boolean;
    preventCloseWithBackdrop?: boolean;
}) => {

    const closeModal = () => setIsOpen(false);

    return createPortal(
        <div>
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
                                [styles.fixedContainer]: true
                            })}
                            onClick={(!!showLoader || !!disabled || !!preventCloseWithBackdrop) ? undefined : closeModal}
                        >
                            <motion.div
                                className={clsx({
                                    [styles.dialog]: true,
                                    "rounded-md relative": true
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
                                <section>
                                    {ArrayVariants.includes(variant) && (
                                        <div className='icon flex items-center justify-center'>
                                            {variant === ConfirmVariants.SUCCESS ? (
                                                <CircleCheckBig
                                                    className='text-green-600'
                                                    style={{
                                                        width: '3rem',
                                                        height: '3rem'
                                                    }}
                                                    width={50}
                                                    height={50}
                                                />
                                            ) : (variant === ConfirmVariants.WARNING ? (
                                                <CircleAlert
                                                    className='text-yellow-400'
                                                    style={{
                                                        width: '3rem',
                                                        height: '3rem'
                                                    }}
                                                    width={50}
                                                    height={50}
                                                />
                                            ) : (variant === ConfirmVariants.WARNING ? (
                                                <CircleX
                                                    className='text-red-700'
                                                    style={{
                                                        width: '3rem',
                                                        height: '3rem'
                                                    }}
                                                    width={50}
                                                    height={50}
                                                />
                                            ) : (
                                                <CircleHelp
                                                    style={{
                                                        width: '3rem',
                                                        height: '3rem'
                                                    }}
                                                    width={50}
                                                    height={50}
                                                />
                                            )))}
                                        </div>
                                    )}
                                    {(title !== undefined && (typeof title === 'string' ? title : title.toString()).trim().length > 0) && (
                                        <h2 className='title my-2'>
                                            {title}
                                        </h2>
                                    )}

                                    <p style={textStyles}>
                                        {text}
                                    </p>
                                </section>
                                <footer className='border-t'>
                                    {!noCancelButton && (
                                        <>
                                            <button
                                                disabled={disabled}
                                                onClick={!cancelAction ? closeModal : () => cancelAction(closeModal)}
                                            >
                                                {CancelTextButton}
                                            </button>
                                            <div className='border-l'></div>
                                        </>
                                    )}
                                    <button
                                        disabled={disabled}
                                        className = 'accept'
                                        onClick = {!acceptAction ? closeModal : () => acceptAction(closeModal)}
                                    >
                                        {AcceptTextButton}
                                    </button>
                                </footer>

                                {showLoader && (
                                    <div className='loader'>
                                        <LoaderCircle
                                            className='loading-circle'
                                            width={10}
                                            height={10}
                                            style={{
                                                width: '3rem',
                                                height: '3rem'
                                            }}
                                        />
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </div>
    , document.body);
};

export default ConfirmModal;
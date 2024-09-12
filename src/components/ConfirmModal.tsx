'use client';

import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const ConfirmModal = ({
    isOpen,
    setIsOpen
} : {
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => any,
}) => {
    const [isShown, setIsShown] = useState<boolean>(false),
        interval = useRef();

    const clearAnimationTimeout = () => {
        if(interval.current) {
            interval.current = clearTimeout(interval.current);
        }
    };

    const addAnimationTimeout = (fn: () => any) => {
        interval.current = setTimeout(() => {
            fn()
        }, 500);
    };

    useEffect(() => {
        clearAnimationTimeout();

        if(!isShown) {
            addAnimationTimeout(() => setIsOpen(false));
        }
    }, [isShown]);

    useEffect(() => {
        clearAnimationTimeout();

        if(!!isOpen) {
            addAnimationTimeout(() => setIsShown(true));
        }
    }, [isOpen]);

    return createPortal(
        <div className={clsx({
            "isOpen": isOpen,
            "isShown": isShown
        })}>
            <div></div>
        </div>
    , document.body);
};

export default ConfirmModal;
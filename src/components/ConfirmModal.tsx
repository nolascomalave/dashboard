'use client';

import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './ConfirmModal.module.scss';
import useMutationObserver from '@/hooks/useMutationObserver';

const ConfirmModal = ({
    isOpen,
    setIsOpen
} : {
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => any,
}) => {
    const [isShown, setIsShown] = useState<boolean>(isOpen),
        backdropRef = useRef(),
        interval = useRef();

    /* useMutationObserver(backdropRef, () => {
        console.log(backdropRef.current);
    }, {
        attributes: true,
        attributeFilter: ['style']
    }); */

    const clearAnimationTimeout = () => {
        if(interval.current) {
            interval.current = clearTimeout(interval.current);
        }
    };

    const addAnimationTimeout = (fn: () => any) => {
        interval.current = setTimeout(() => {
            fn()
        }, 1000);
    };

    useEffect(() => {
        clearAnimationTimeout();

        if(!isShown) {
            addAnimationTimeout(() => setIsOpen(false));
        }
    }, [isShown]);

    useEffect(() => {
        if(backdropRef.current) {
            /* let dothis = function(whichone, color){
                whichone.onmouseover = function(){
                this.style.color = color;
                whichone.onmouseout = function(){
                    this.style.color = "black";
                }
                };
            }
            dothis(backdropRef.current, "red"); */

            let observer = new MutationObserver(function(mutations) {
                console.log(mutations);
            });

            // Notify me of style changes
            let observerConfig = {
                attributes: true,
                attributeFilter: ["style"]
            };

            observer.observe(backdropRef.current, observerConfig);

            return () => observer.disconnect();
        }
    }, []);

    return createPortal(
        <div
            className={clsx({
                [styles.ConfirmModal]: true,
                "isOpen": isOpen,
                "isShown": isShown
            })}
        >
            <div
                onClick={() => setIsShown(false)}
            >
                {isOpen && (<div></div>)}
                <div id="div1" ref={backdropRef} className="select"><p>Text in p 1</p></div>
                <br/>
                <br/>
                <br/>
                <br/>
                <div id="div2" className="select"><p>Text in p 2</p></div>
            </div>
        </div>
    , document.body);
};

export default ConfirmModal;
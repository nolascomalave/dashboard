'use client';

import { useEffect } from "react";

const useMutationObserver = (
    ref: React.Reference,
    callback: (mutations?: MutationRecord[]) => any,
    options: {
        attributes?: boolean,
        characterData?: boolean,
        childList?: boolean,
        subtree?: boolean,
        attributeFilter?: string[]
    } = {
        attributes: true,
        characterData: true,
        childList: true,
        subtree: true
    }
) => {
    useEffect(() => {
        if (ref.current) {
            const observer = new MutationObserver(callback);
            observer.observe(ref.current, options);
            return () => observer.disconnect();
        }
    }, [callback, options]);
};

export default useMutationObserver;
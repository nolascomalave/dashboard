'use client';

import { useState, useEffect } from "react";
import style from './useItemsSelector.module.scss';
import clsx from "clsx";

export function Checkbox({
    className,
    keyItem,
    value,
    controller,
    ...props
}: {
    className?: string;
    keyItem: string | number;
    value: any;
    controller?: {
        checked: boolean;
        unsubscribe: (uniqueKey: string | number | symbol) => void;
        subscribe: (uniqueKey: string | number | symbol, value: any) => void;
        check: (uniqueKey: string | number | symbol) => void;
        uncheck: (uniqueKey: string | number | symbol) => void;
    };
    props?: {[key: string | number | symbol]: any}
}) {
    useEffect(() => {
        if(!!controller) {
            controller.subscribe(keyItem, value);

            return (() => controller.unsubscribe(keyItem));
        }
    }, []);

    return (
        <label className={clsx({
            [style['item-selector-checkbox']]: true,
            'border rounded-full cursor-pointer': true,
            ...(!className ? {} : {
                [className]: true
            })
        })}>
            <div></div>
            <input
                {...props}
                type='checkbox'
                checked={!controller ? undefined : controller.checked}
                value={typeof value === 'string' ? value : undefined}
                onChange={!controller ? undefined : (e: any) => {
                    if(e.target.checked) {
                        return controller.check(keyItem);
                    }

                    controller.uncheck(keyItem);
                }}
            />
        </label>
    );
}

export default function useItemsSelector() {
    const [ items, setItems ] = useState<{[uniqueKey: string | number | symbol]: any}>({});
    const [ subscriptions, setSubscription ] = useState<{[uniqueKey: string | number | symbol]: boolean}>({});

    const subscribe = (key: string | number | symbol, value: any) => {
        let newSubscriptions = {...subscriptions};

        newSubscriptions[key] = value;
        setSubscription(newSubscriptions);
    }

    const unsubscribe = (key: string | number | symbol) => {
        if(key in subscriptions) {
            let newSubscriptions = {...subscriptions};

            delete newSubscriptions[key];

            setSubscription(newSubscriptions);
        }
    }

    const check = (uniqueKey: string | number | symbol) => {
        let newItems = {...items};

        newItems[uniqueKey] = true;
        setItems(newItems);
    };

    const uncheck = (uniqueKey: string | number | symbol) => {
        if(uniqueKey in items) {
            let newItems = {...items};

            delete newItems[uniqueKey];

            setItems(newItems);
        }
    };

    const checkAll = () => {
        let newItems: {[key: string | number | symbol]: boolean} = {};

        for(let subscription in subscriptions) {
            newItems[subscription] = true;
        }

        setItems(newItems);
    };

    const uncheckAll = () => setItems({});

    return {
        selectionMode: Object.keys(items).length < 1 ? 'none' : (Object.keys(items).length === Object.keys(subscriptions).length ? 'all' : 'partial'),
        getAllSelected: () => {
            let newItems: {[key: string | number | symbol]: any} = {};

            for(let item in items) {
                newItems[item] = subscriptions[item];
            }

            return newItems;
        },
        globalController: {
            checkAll,
            uncheckAll
        },
        register: (keyValue: string | number | symbol) => ({
            checked: (keyValue in items) && items[keyValue] === true,
            subscribe,
            unsubscribe,
            check,
            uncheck
        })
    };
}
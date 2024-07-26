'use client';

import clsx from 'clsx';
import styles from './EntityCard.module.scss';
import { Ellipsis, UserRound } from 'lucide-react';
import useItemsSelector, { Checkbox } from '@/hooks/useItemsSelector';

export default function EntityCard({
    image,
    selectableController,
    children
}: {
    image?: string,
    selectableController?: {
        keyItem?: string | number | symbol;
        value?: any;
        checked: boolean;
        subscribe: (key: string | number | symbol, value: any) => void;
        unsubscribe: (key: string | number | symbol) => void;
        check: (uniqueKey: string | number | symbol) => void;
        uncheck: (uniqueKey: string | number | symbol) => void;
    };
    children?: React.ReactNode
}) {
    const { keyItem, value, ...controller } = selectableController ?? {};

    return (
        <div
            className={clsx({
                [styles['entity-card']]: true,
                'bg-white': true
            })}
            style={{
                boxShadow: '0px 9px 20px rgba(46, 35, 94, 0.07)',
                maxWidth: '315px'
            }}
        >
            <div className='px-4 pt-4'>
                <div className='flex justify-center items-center margin-auto relative'>
                    {(!!selectableController && (typeof keyItem === 'string' || typeof keyItem === 'number')) && (
                        <Checkbox
                            keyItem={keyItem}
                            value={value}
                            className='absolute top-0 left-0'
                            {...(!selectableController ? {} : {controller: controller})}
                        />
                    )}

                    <button
                        type='button'
                        className={clsx({
                            'rounded-full text-primary_color bg-primary_layout': true,
                            'opacity-75': !image
                        })}
                        style={{
                            width: '3rem',
                            height: '3rem'
                        }}
                    >
                        {!image ? (
                            <UserRound
                                width={10}
                                height={10}
                                className='w-full h-full object-cover object-center rounded-full'
                            />
                        ) : (
                            <img
                                className='w-full h-full object-cover object-center'
                                src={image}
                                alt={"Photo"}
                            />
                        )}
                    </button>

                    <button
                        type='button'
                        className='absolute top-0 right-0'
                    >
                        <Ellipsis width={15} height={15} />
                    </button>
                </div>
            </div>
            <div className='text-center'>
                <p><b>Nolasco Malavé</b></p>
                <p>MALAVEN</p>
                <p>User Master</p>
            </div>
            <div className='flex'>
                <button
                    type='button'
                    className='w-full'
                >
                    View Profile
                </button>
                <button
                    type='button'
                    className='w-full border-s border-e'
                >
                    Edit
                </button>
                <button
                    type='button'
                    className='w-full'
                >
                    Delete
                </button>
            </div>
        </div>
    )
}
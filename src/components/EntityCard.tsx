'use client';

import clsx from 'clsx';
import styles from './EntityCard.module.scss';
import { Ellipsis, UserRound } from 'lucide-react';
import /* useItemsSelector, */ { Checkbox } from '@/hooks/useItemsSelector';
import { CompleteEntityUser } from '@/assets/types/users';
import Link from 'next/link';
import { Badge, badgeVariants } from "@/components/ui/badge";

export default function EntityCard({
    image,
    selectableController,
    User,
    CurrentUser,
    hrefEdit,
    activateAction,
    inactivateAction
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
    User: CompleteEntityUser;
    CurrentUser?: CompleteEntityUser | null;
    hrefEdit: string;
    activateAction: (User: CompleteEntityUser) => any;
    inactivateAction: (User: CompleteEntityUser) => any;
}) {
    const { keyItem, value, ...controller } = selectableController ?? {};

    return (
        <div
            className={clsx({
                [styles['entity-card']]: true,
                'bg-white w-full flex flex-col': true
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
                            'rounded-full text-primary_color duration-100 bg-primary_layout focus:bg-secondary_layout hover:bg-secondary_layout': true
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

                    {(User.inactivated_at_system_subscription_user ?? null) !== null ? (
                        <Badge variant = "outline" className={"absolute top-0 right-0 text-[0.6rem] text-red-700 border-red-700 opacity-75"}>Inactive</Badge>
                    ) : (
                        <Badge variant = "outline" className={"absolute top-0 right-0 text-[0.6rem] text-emerald-700 border-emerald-700 opacity-75"}>Active</Badge>
                    )}
                    {/* <button
                        type='button'
                        className='absolute top-0 right-0'
                    >
                        <Ellipsis width={15} height={15} />
                    </button> */}
                </div>
            </div>
            <div className='h-full text-center mt-2 mb-4'>
                <p><b>{ User.name }</b></p>
                <p>{ User.username.toUpperCase() }</p>
                { User.is_admin == 1 ? <p className='opacity-50'>Master User</p> : null }
            </div>

            {((!!User.is_admin && User.username.toLowerCase() === 'admin' && (!CurrentUser || CurrentUser.id !== User.id_system_subscription_user)) || (!!CurrentUser && CurrentUser.id === User.id_system_subscription_user)) ? null : (
                <div className='flex pt-[0.0625rem] gap-[0.0625rem] bg-gray-100'>
                    {/* <button
                        type='button'
                        className='w-full px-2 py-1 duration-150 hover:text-secondary_layout focus:text-secondary_layout'
                    >
                        View Profile
                    </button> */}
                    <Link
                        href = {hrefEdit}
                        className='w-full text-center bg-white px-2 py-1 duration-150 hover:text-secondary_layout focus:text-secondary_layout'
                    >
                        Edit
                    </Link>
                    {((User.inactivated_at_system_subscription_user ?? null) !== null && (!CurrentUser || CurrentUser.id !== User.id_system_subscription_user)) ? (
                        <button
                            type='button'
                            className='w-full bg-white px-2 py-1 duration-150 hover:text-green-600 focus:text-green-600'
                            onClick={() => activateAction(User)}
                        >
                            Activate
                        </button>
                    ) : (
                        <>
                            <button
                                type='button'
                                className='w-full bg-white px-2 py-1 duration-150 hover:text-red-700 focus:text-red-700'
                                onClick={() => inactivateAction(User)}
                            >
                                Inactivate
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    )
}
'use client';

import clsx from 'clsx';
import styles from './UserCard.module.scss';
import { UserRound } from 'lucide-react';
import { Checkbox } from '@/hooks/useItemsSelector';
import { useProcessedCompleteEntity } from "@/store/ProcessedCompleteEntity";
import { CompleteEntityUser } from '@/assets/types/users';
import Link from 'next/link';
import { Badge } from "@/components/ui/badge";
import ConfirmModal from './ConfirmModal';
import { useEffect, useState } from 'react';
import { ClientFetch } from '@/util/Fetching';
import { toast } from "sonner";

export default function UserCard({
    session,
    // image,
    selectableController,
    User,
    CurrentUser,
    hrefEdit
}: {
    session: any;
    // image?: string,
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
    hrefEdit: string
}) {
    const [ userData, setUserData ] = useState<CompleteEntityUser>(User),
        { keyItem, value, ...controller } = selectableController ?? {},
        [ isSettingUserStatus, setIsSettingUserStatus ] = useState<boolean>(false),
        [ isDisabledModal, setIsDisabledModal ] = useState<boolean>(false),
        [ isOpenActInactModal, setIsOpenActInactModal] = useState(false);
    const { User: processedUser, setUser } = useProcessedCompleteEntity((state) => state);

    const openActInactModal = () => {
        setIsDisabledModal(false);
        setIsOpenActInactModal(true);
    };

    const changingUserStatus = async (closeModal: () => any, id_system_subscription_user: number, is_inactive: boolean) => {
        setIsSettingUserStatus(true);
        setIsDisabledModal(true);

        const ftc = new ClientFetch();

        try {
            const res = await ftc.patch({
                url: `${process.env.API}/system-subscription-users/change-status`,
                data: {
                    type: is_inactive ? 'ACTIVE' : 'INACTIVE',
                    id_system_subscription_user
                },
                headers: {
                    authorization: `Bearer ${session?.backendTokens.accessToken}`
                }
            });

            if(res.status !== 200) {
                if(res.status === 401) {
                    // return router.push('/login');
                }

                throw 'error';
            }

            const { data, message } = await res.json();

            closeModal();

            setUserData({
                ...User,
                inactivated_at_system_subscription_user: data.inactivated_at,
                inactivated_by_system_subscription_user: data.inactivated_by
            });

            toast[is_inactive ? 'success' : 'warning'](message, {
                position: 'bottom-right',
                closeButton: true
            });
        } catch(e: any) {
            toast.error('An unexpected error has occurred.', {
                position: 'bottom-left',
                closeButton: true,
                duration: Infinity
            });
            setIsDisabledModal(false);
        }

        setIsSettingUserStatus(false);
    };

    useEffect(() => {
        setUserData(User);
    }, [User]);

    useEffect(() => {
        if(!processedUser || processedUser.id_system_subscription_user != userData.id_system_subscription_user) {
            return;
        }

        setUserData(processedUser);
        setUser(null);
    }, [processedUser]);

    return (
        <>
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

                        <div
                            className={clsx({
                                'rounded-full text-primary_color duration-100 bg-primary_layout': true
                            })}
                            style={{
                                width: '3rem',
                                height: '3rem'
                            }}
                        >
                            {(!userData.photo || userData.photo.trim().length < 1) ? (
                                <UserRound
                                    width={10}
                                    height={10}
                                    className='w-full h-full object-cover object-center rounded-full'
                                />
                            ) : (
                                <img
                                    className='w-full h-full object-cover object-center rounded-full'
                                    src={`${process.env.API}/storage/entity/entity-${userData.id_entity}/${userData.photo}`}
                                    alt={"Photo"}
                                />
                            )}
                        </div>

                        {(userData.inactivated_at_system_subscription_user ?? null) !== null ? (
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
                    <p>
                        <Link
                            href = {`/dashboard/users/${userData.id_system_subscription_user}`}
                            className='font-bold cursor-pointer focus:underline focus:decoration-solid hover:underline hover:decoration-solid'
                        >
                            { userData.name }
                        </Link>
                    </p>
                    <p>{ userData.username.toUpperCase() }</p>
                    { userData.is_admin == 1 ? <p className='opacity-50'>Master User</p> : null }
                </div>

                {((!!userData.is_admin && userData.username.toLowerCase() === 'admin' && (!CurrentUser || CurrentUser.id !== userData.id_system_subscription_user)) || (!!CurrentUser && CurrentUser.id === userData.id_system_subscription_user)) ? null : (
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
                        {((userData.inactivated_at_system_subscription_user ?? null) !== null && (!CurrentUser || CurrentUser.id !== userData.id_system_subscription_user)) ? (
                            <button
                                type='button'
                                className='w-full bg-white px-2 py-1 duration-150 hover:text-green-600 focus:text-green-600'
                                onClick={openActInactModal}
                            >
                                Activate
                            </button>
                        ) : (
                            <>
                                <button
                                    type='button'
                                    className='w-full bg-white px-2 py-1 duration-150 hover:text-red-700 focus:text-red-700'
                                    onClick={openActInactModal}
                                >
                                    Inactivate
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>

            <ConfirmModal
                isOpen = { isOpenActInactModal }
                setIsOpen = { setIsOpenActInactModal }
                title = {(!!userData?.inactivated_at_system_subscription_user ? 'Activate' : 'Inactivate') + " user"}
                showLoader = {isSettingUserStatus}
                disabled = {isDisabledModal}
                acceptAction = {closeModal => changingUserStatus(closeModal, userData?.id_system_subscription_user ?? 0, !!userData?.inactivated_at_system_subscription_user)}
                text = {(
                    <>
                        Are you sure to {!!userData?.inactivated_at_system_subscription_user ? 'activate' : 'inactivate'} the user "<b>{userData?.username.toUpperCase()}</b>"?
                        {!userData?.inactivated_at_system_subscription_user && (
                            <>
                                <br/>
                                You can activate again in another moment.
                            </>
                        )}
                    </>
                )}
            />
        </>
    )
}
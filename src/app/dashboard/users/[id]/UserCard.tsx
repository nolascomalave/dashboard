'use client';

import { CompleteEntityUser } from "@/assets/types/users";
import ConfirmModal from "@/components/ConfirmModal";
import SimpleTooltip from "@/components/SimpleTooltip";
import { useProcessedCompleteEntity } from "@/store/ProcessedCompleteEntity";
import { ClientFetch } from "@/util/Fetching";
import { KeyRound, Mail, Mails, Pencil, PhoneCall, UserRound, UserRoundCheck, UserRoundMinus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const getJsonFromString = (string: any) => {
    if(typeof string === 'object') return string;

    try {
        return JSON.parse(string);
    } catch(e: any) {
        return null;
    }
}

export default function UserCard({
    user,
    session
}: {
    user: CompleteEntityUser,
    session: any;
}) {
    const [ userData, setUserData ] = useState<CompleteEntityUser>(user),
        [ isDisabledModal, setIsDisabledModal ] = useState<boolean>(false),
        [ isSettingUserStatus, setIsSettingUserStatus ] = useState<boolean>(false),
        [ isOpenActInactModal, setIsOpenActInactModal] = useState(false);
    const { User: processedUser, setUser } = useProcessedCompleteEntity((state) => state),
        [ userEmails, setUserEmails ] = useState<string[]>(userData.emails ?? []),
        [ userPhones, setUserPhones ] = useState<string[]>(userData.phones ?? []),
        router = useRouter(),
        isAdminSession = session.user.is_admin && session.user.username.toLowerCase() === 'admin',
        isAdminUser = userData.is_admin && userData.username.toLowerCase() === 'admin',
        isUserSessionAndUserSame = session.user.id === userData.id_system_subscription_user;

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
                ...user,
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
        if(!processedUser || processedUser.id_system_subscription_user != userData.id_system_subscription_user) {
            return;
        }

        setUserData(processedUser);
        setUser(null);
    }, [processedUser]);

    useEffect(() => {
        setUserEmails(getJsonFromString(userData.emails) ?? []);
        setUserPhones(getJsonFromString(userData.phones) ?? []);
    }, [userData]);

    return (
        <>
            <div
                className='entity-card bg-white rounded-sm w-full'
            >
                <div className='p-3 rounded-t-sm'>
                    <div
                        className = 'rounded-full text-primary_color duration-100 bg-primary_layout m-auto'
                        style = {{
                            width: '4rem',
                            height: '4rem'
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

                    <div className='flex flex-col gap-2 mt-4 text-center w-full' style={{ lineHeight: '0.9rem' }}>
                        <SimpleTooltip text={userData.name}>
                            <p className='name font-bold text-[1.125rem] w-full truncate'>{userData.name}</p>
                        </SimpleTooltip>
                        <p className='name font-light uppercase w-full truncate'>{userData.username}</p>
                    </div>

                    {((userEmails.length + userPhones.length) > 0 && (Array.isArray(userEmails) || Array.isArray(userPhones))) && (
                        <div className='flex justify-center gap-4 mt-4 w-full'>
                            {(userEmails.length > 0 && Array.isArray(userEmails)) && (
                                <SimpleTooltip
                                    selectable={true}
                                    text={(userEmails).map((el: string, i: number) => (
                                        <p className={userEmails.length === (i + 1) ? undefined : 'mb-1'} key={`user-email-${i}`}>{el}</p>
                                    ))}
                                >
                                    <button className="flex w-7 h-7 p-1 bg-primary_layout text-primary_color rounded-full">
                                        {userEmails.length > 0 ? (
                                            <Mail
                                                width={10}
                                                height={10}
                                                className='w-full h-full object-cover object-center rounded-full'
                                            />
                                        ): (
                                            <Mails
                                                width={10}
                                                height={10}
                                                className='w-full h-full object-cover object-center rounded-full'
                                            />
                                        )}
                                    </button>
                                </SimpleTooltip>
                            )}

                            {(userPhones.length > 0 && Array.isArray(userPhones)) && (
                                <SimpleTooltip
                                    selectable={true}
                                    text={userPhones.map((el: string, i: number) => (
                                        <p className={userPhones.length === (i + 1) ? undefined : 'mb-1'} key={`user-phone-${i}`}>{el}</p>
                                    ))}
                                >
                                    <button className="flex w-7 h-7 p-1 bg-primary_layout text-primary_color rounded-full">
                                        <PhoneCall
                                            width={10}
                                            height={10}
                                            className='w-full h-full object-cover object-center rounded-full'
                                        />
                                    </button>
                                </SimpleTooltip>
                            )}
                        </div>
                    )}
                </div>

                {/* {((!!userData.is_admin && userData.username.toLowerCase() === 'admin' && (!session.user || session.user.id !== userData.id_system_subscription_user)) || (!!session.user && session.user.id === userData.id_system_subscription_user)) ? null : (
                    <div className='flex rounded-b-sm pt-[0.0625rem] gap-[0.0625rem] bg-gray-100'>
                        <SimpleTooltip text={'Edit'} >
                            <button type='button' className='flex justify-center items-center w-full bg-white px-3 py-2'>
                                <Pencil />
                            </button>
                        </SimpleTooltip>
                        <SimpleTooltip text={(!!userData.inactivated_at_system_subscription_user || !!userData.inactivated_at) ? 'Activate' : 'Inactivate'} >
                            <button
                                type='button'
                                className='flex justify-center items-center w-full bg-white px-3 py-2'
                                onClick={openActInactModal}
                            >
                                {(!!userData.inactivated_at_system_subscription_user || !!userData.inactivated_at) ? (
                                    <UserRoundCheck />
                                ) : (
                                    <UserRoundMinus />
                                )}
                            </button>
                        </SimpleTooltip>
                        <SimpleTooltip text={'Change Password'} >
                            <button type='button' className='flex justify-center items-center w-full bg-white px-3 py-2'>
                                <KeyRound />
                            </button>
                        </SimpleTooltip>
                    </div>
                )} */}

                <div className='flex rounded-b-sm pt-[0.0625rem] gap-[0.0625rem] bg-gray-100'>
                    {(isAdminSession || (isAdminUser && session.user.id === userData.id_system_subscription_user) || !isAdminUser) && (
                        <SimpleTooltip text={'Edit'} >
                            <button
                                type='button'
                                className='flex justify-center items-center w-full bg-white px-3 py-2'
                                onClick={() => router.push(`/dashboard/users/edit/${userData.id_system_subscription_user}`)}
                            >
                                <Pencil />
                            </button>
                        </SimpleTooltip>
                    )}

                    {(isAdminSession || (!isUserSessionAndUserSame && !isAdminUser)) && (
                        <SimpleTooltip text={(!!userData.inactivated_at_system_subscription_user || !!userData.inactivated_at) ? 'Activate' : 'Inactivate'} >
                            <button
                                type='button'
                                className='flex justify-center items-center w-full bg-white px-3 py-2'
                                onClick={openActInactModal}
                            >
                                {(!!userData.inactivated_at_system_subscription_user || !!userData.inactivated_at) ? (
                                    <UserRoundCheck />
                                ) : (
                                    <UserRoundMinus />
                                )}
                            </button>
                        </SimpleTooltip>
                    )}

                    {(isAdminSession || isUserSessionAndUserSame) && (
                        <SimpleTooltip text={'Change Password'} >
                            <button type='button' className='flex justify-center items-center w-full bg-white px-3 py-2'>
                                <KeyRound />
                            </button>
                        </SimpleTooltip>
                    )}
                </div>
            </div>

            <ConfirmModal
                isOpen = { isOpenActInactModal }
                setIsOpen = { setIsOpenActInactModal }
                title = {(!!userData?.inactivated_at_system_subscription_user ? 'Activate' : 'Inactivate') + " user"}
                showLoader = {isSettingUserStatus}
                disabled = {isDisabledModal}
                acceptAction = {closeModal => changingUserStatus(closeModal, userData?.id_system_subscription_user ?? 0, (!!userData.inactivated_at_system_subscription_user || !!userData.inactivated_at))}
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
    );
}
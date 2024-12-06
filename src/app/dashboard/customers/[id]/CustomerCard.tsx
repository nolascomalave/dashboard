'use client';

import { CompleteEntity } from "@/assets/types/entity";
import SimpleTooltip from "@/components/SimpleTooltip";
import { useProcessedCompleteEntity } from "@/store/ProcessedCompleteEntity";
import { ClientFetch } from "@/util/Fetching";
import { Mail, Mails, PhoneCall, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { copyTextToClipboard } from "@/util/functionals";

const getJsonFromString = (string: any) => {
    if(typeof string === 'object') return string;

    try {
        return JSON.parse(string);
    } catch(e: any) {
        return null;
    }
}

export default function CustomerCard({
    customer,
    session
}: {
    customer: CompleteEntity,
    session: any;
}) {
    const [ customerData, setCustomerData ] = useState<CompleteEntity>(customer),
        [ isDisabledModal, setIsDisabledModal ] = useState<boolean>(false),
        [ isSettingUserStatus, setIsSettingUserStatus ] = useState<boolean>(false),
        [ isOpenActInactModal, setIsOpenActInactModal] = useState(false),
        [ isOpenConfirmResetPassword, setIsOpenConfirmResetPassword] = useState(false);
    const { User: processedUser, setUser } = useProcessedCompleteEntity((state) => state),
        [ customerEmails, setCustomerEmails ] = useState<string[]>(customerData.emails ?? []),
        [ customerPhones, setCustomerPhones ] = useState<string[]>(customerData.phones ?? []),
        router = useRouter(),
        isAdminSession = session.user.is_admin && session.user.username.toLowerCase() === 'admin',
        isAdminUser = false, // customerData.is_admin && customerData.username.toLowerCase() === 'admin',
        isUserSessionAndUserSame = session.user.id === customerData.id_system_subscription_user;

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

            /* setCustomerData({
                ...customer,
                inactivated_at_system_subscription_user: data.inactivated_at,
                inactivated_by_system_subscription_user: data.inactivated_by
            }); */

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

    /* useEffect(() => {
        if(!processedUser || processedUser.id_system_subscription_user != customerData.id_system_subscription_user) {
            return;
        }

        setCustomerData(processedUser);
        setUser(null);
    }, [processedUser]); */

    useEffect(() => {
        setCustomerEmails(getJsonFromString(customerData.emails) ?? []);
        setCustomerPhones(getJsonFromString(customerData.phones) ?? []);
    }, [customerData]);

    return (
        <>
            <div
                className='entity-card rounded-sm w-full'
            >
                <div className='p-3 rounded-t-sm'>
                    <div
                        className = 'rounded-full text-primary_color duration-100 bg-primary_layout m-auto'
                        style = {{
                            width: '4rem',
                            height: '4rem'
                        }}
                    >
                        {(!customerData.photo || customerData.photo.trim().length < 1) ? (
                            <UserRound
                                width={10}
                                height={10}
                                className='w-full h-full object-cover object-center rounded-full'
                            />
                        ) : (
                            <img
                                className='w-full h-full object-cover object-center rounded-full'
                                src={`${process.env.API}/storage/entity/entity-${customerData.id}/${customerData.photo}`}
                                alt={"Photo"}
                            />
                        )}
                    </div>

                    <div className='flex flex-col gap-2 mt-4 text-center w-full' style={{ lineHeight: '0.9rem' }}>
                        <SimpleTooltip text={customerData.name}>
                            <p className='name font-bold text-[1.125rem] w-full truncate'>{customerData.name}</p>
                        </SimpleTooltip>
                        {/* <p className='name font-light uppercase w-full truncate'>{customerData.username}</p> */}
                    </div>

                    {((customerEmails.length + customerPhones.length) > 0 && (Array.isArray(customerEmails) || Array.isArray(customerPhones))) && (
                        <div className='flex justify-center gap-4 mt-4 w-full'>
                            {(customerEmails.length > 0 && Array.isArray(customerEmails)) && (
                                <SimpleTooltip
                                    selectable={true}
                                    text={(customerEmails).map((el: string, i: number) => (
                                        <p className={customerEmails.length === (i + 1) ? undefined : 'mb-1'} key={`user-email-${i}`}>{el}</p>
                                    ))}
                                >
                                    <button
                                        className="flex w-7 h-7 p-1 bg-primary_layout text-primary_color rounded-full"
                                        onClick={() => {
                                            const text: string[] = [];

                                            customerEmails.forEach(email => text.push(email));

                                            copyTextToClipboard(customerEmails.join("\n")).then((result) => {
                                                if(result !== null) {
                                                    toast.info('Text Copied!', {
                                                        richColors: false
                                                    });
                                                }
                                            });
                                        }}
                                    >
                                        {customerEmails.length > 0 ? (
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

                            {(customerPhones.length > 0 && Array.isArray(customerPhones)) && (
                                <SimpleTooltip
                                    selectable={true}
                                    text={customerPhones.map((el: string, i: number) => (
                                        <p className={customerPhones.length === (i + 1) ? undefined : 'mb-1'} key={`user-phone-${i}`}>{el}</p>
                                    ))}
                                >
                                    <button
                                        className="flex w-7 h-7 p-1 bg-primary_layout text-primary_color rounded-full"
                                        onClick={() => {
                                            const text: string[] = [];

                                            customerPhones.forEach(email => text.push(email));

                                            copyTextToClipboard(customerPhones.join("\n")).then((result) => {
                                                if(result !== null) {
                                                    toast.info('Text Copied!', {
                                                        richColors: false
                                                    });
                                                }
                                            });
                                        }}
                                    >
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

                {/* {((!!customerData.is_admin && customerData.username.toLowerCase() === 'admin' && (!session.user || session.user.id !== customerData.id_system_subscription_user)) || (!!session.user && session.user.id === customerData.id_system_subscription_user)) ? null : (
                    <div className='flex rounded-b-sm pt-[0.0625rem] gap-[0.0625rem] bg-gray-100'>
                        <SimpleTooltip text={'Edit'} >
                            <button type='button' className='flex justify-center items-center w-full bg-white px-3 py-2'>
                                <Pencil />
                            </button>
                        </SimpleTooltip>
                        <SimpleTooltip text={(!!customerData.inactivated_at_system_subscription_user || !!customerData.inactivated_at) ? 'Activate' : 'Inactivate'} >
                            <button
                                type='button'
                                className='flex justify-center items-center w-full bg-white px-3 py-2'
                                onClick={openActInactModal}
                            >
                                {(!!customerData.inactivated_at_system_subscription_user || !!customerData.inactivated_at) ? (
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

                {/* <div className='flex rounded-b-sm pt-[0.0625rem] gap-[0.0625rem] bg-gray-100'>
                    {((isAdminSession || (isAdminUser && session.user.id === customerData.id_system_subscription_user) || !isAdminUser) && !(isAdminUser && customerData.username.toLowerCase() === 'admin')) && (
                        <SimpleTooltip text={'Edit'} >
                            <button
                                type='button'
                                className='flex justify-center items-center w-full bg-white px-3 py-2'
                                onClick={() => router.push(`/dashboard/users/edit/${customerData.id_system_subscription_user}`)}
                            >
                                <Pencil />
                            </button>
                        </SimpleTooltip>
                    )}

                    {(!isUserSessionAndUserSame && (isAdminSession || !isAdminUser)) && (
                        <SimpleTooltip text={(!!customerData.inactivated_at_system_subscription_user || !!customerData.inactivated_at) ? 'Activate' : 'Inactivate'} >
                            <button
                                type='button'
                                className='flex justify-center items-center w-full bg-white px-3 py-2'
                                onClick={openActInactModal}
                            >
                                {(!!customerData.inactivated_at_system_subscription_user || !!customerData.inactivated_at) ? (
                                    <UserRoundCheck />
                                ) : (
                                    <UserRoundMinus />
                                )}
                            </button>
                        </SimpleTooltip>
                    )}

                    {(((isAdminSession && !isAdminUser) || isUserSessionAndUserSame) && !customerData.inactivated_at_system_subscription_user && !customerData.inactivated_at) && (
                        <SimpleTooltip text={(isUserSessionAndUserSame ? 'Change' : 'Reset').concat(' Password')} >
                            <button
                                type='button'
                                className='flex justify-center items-center w-full bg-white px-3 py-2'
                                onClick={isUserSessionAndUserSame ? () => router.push(`/dashboard/users/change-password`) : (() => {
                                    setIsDisabledModal(false);
                                    setIsOpenConfirmResetPassword(true);
                                })}
                            >
                                <KeyRound />
                            </button>
                        </SimpleTooltip>
                    )}
                </div> */}
            </div>
        </>
    );
}
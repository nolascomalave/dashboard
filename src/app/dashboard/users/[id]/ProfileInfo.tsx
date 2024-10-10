'use server';

import { Mail, Mails, PhoneCall, UserRound } from 'lucide-react';
import { getUser } from '../actions';
import { notFound } from 'next/navigation';
import SimpleTooltip from '@/components/SimpleTooltip';
import { Skeleton } from '@/components/ui/skeleton';

export default async function ProfileInfo({ id }: { id: string }) {
    const { user, status } = await getUser(id);

    // await new Promise(res => setTimeout(() => res(true), 10000));

    if(status === 404 || !user) {
        return notFound();
    }

    return (
        <div className='info w-full'>
            <div
                className='entity-card p-3 bg-white rounded-sm w-full'
            >
                <div
                    className = 'rounded-full text-primary_color duration-100 bg-primary_layout m-auto'
                    style = {{
                        width: '4rem',
                        height: '4rem'
                    }}
                >
                    {(!user.photo || user.photo.trim().length < 1) ? (
                        <UserRound
                            width={10}
                            height={10}
                            className='w-full h-full object-cover object-center rounded-full'
                        />
                    ) : (
                        <img
                            className='w-full h-full object-cover object-center rounded-full'
                            src={`${process.env.API}/storage/entity/entity-${user.id_entity}/${user.photo}`}
                            alt={"Photo"}
                        />
                    )}
                </div>

                <div className='flex flex-col gap-2 mt-4 text-center w-full' style={{ lineHeight: '0.9rem' }}>
                    <SimpleTooltip text={user.name}>
                        <p className='name font-bold text-[1.125rem] w-full truncate'>{user.name}</p>
                    </SimpleTooltip>
                    <p className='name font-light uppercase w-full truncate'>{user.username}</p>
                </div>

                {((user.emails ?? []).length + (user.phones ?? []).length) > 0 && (
                    <div className='flex justify-center gap-4 mt-4 w-full'>
                        {(user.emails ?? []).length > 0 && (
                            <SimpleTooltip
                                text={(user.emails ?? []).map((el: string, i: number) => (
                                    <p className={(user.emails ?? []).length === (i + 1) ? undefined : 'mb-1'}>{el}</p>
                                ))}
                            >
                                <button className="flex w-7 h-7 p-1 bg-primary_layout text-primary_color rounded-full">
                                    {(user.emails ?? []).length > 0 ? (
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

                        {(user.phones ?? []).length > 0 && (
                            <SimpleTooltip
                                text={(user.phones ?? []).map((el: string, i: number) => (
                                    <p className={(user.phones ?? []).length === (i + 1) ? undefined : 'mb-1'}>{el}</p>
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
        </div>
    );
};
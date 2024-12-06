'use client';

import clsx from 'clsx';
import styles from './UserCard.module.scss';
import { Edit, UserRound } from 'lucide-react';
import { Checkbox } from '@/hooks/useItemsSelector';
// import { useProcessedCompleteEntity } from "@/store/ProcessedCompleteEntity";
import { CompleteEntity } from '@/assets/types/entity';
import { Ellipsis } from 'lucide-react';
import Link from 'next/link';
import { Badge } from "@/components/ui/badge";
import ConfirmModal from './ConfirmModal';
import { useEffect, useState } from 'react';
import { ClientFetch } from '@/util/Fetching';
import { toast } from "sonner";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation';

export default function EntityCard({
    session,
    // image,
    selectableController,
    Entity,
    CurrentEntity,
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
    Entity: CompleteEntity;
    CurrentEntity?: CompleteEntity | null;
    hrefEdit: string
}) {
    const [ entityData, setEntityData ] = useState<CompleteEntity>(Entity),
        { keyItem, value, ...controller } = selectableController ?? {};
    const router = useRouter();
    // const { User: processedUser, setUser } = useProcessedCompleteEntity((state) => state);

    useEffect(() => {
        setEntityData(Entity);
    }, [Entity]);

    /* useEffect(() => {
        if(!processedUser || processedUser.id != entityData.id) {
            return;
        }

        setEntityData(processedUser);
        setUser(null);
    }, [processedUser]); */

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
                            {(!entityData.photo || entityData.photo.trim().length < 1) ? (
                                <UserRound
                                    width={10}
                                    height={10}
                                    className='w-full h-full object-cover object-center rounded-full'
                                />
                            ) : (
                                <img
                                    className='w-full h-full object-cover object-center rounded-full'
                                    src={`${process.env.API}/storage/entity/entity-${entityData.id}/${entityData.photo}`}
                                    alt={"Photo"}
                                />
                            )}
                        </div>

                        <DropdownMenu modal={false}>
                            <DropdownMenuTrigger asChild>
                                <button
                                    type='button'
                                    className='absolute top-0 right-0'
                                >
                                    <Ellipsis width={15} height={15} />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent hideWhenDetached className="bg-primary_layout text-primary_color">
                                <DropdownMenuItem className='flex items-center gap-2 w-full h-full cursor-pointer' onClick={() => router.push(`/dashboard/customers/edit/${entityData.id}`)}>
                                    <Edit className='w-4 h-4' width={10} height={10}/>
                                    Editar
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <div className='h-full text-center mt-2 mb-4'>
                    <p>
                        <Link
                            href = {`/dashboard/customers/${entityData.id}`}
                            className='font-bold cursor-pointer focus:underline focus:decoration-solid hover:underline hover:decoration-solid'
                        >
                            { entityData.name }
                        </Link>
                    </p>
                    { (entityData.emails ?? []).length < 1 ? null : (
                        <p className='opacity-50 text-sm'>
                            {entityData.emails[0].toLowerCase()}
                        </p>
                    )}
                    {/* { entityData.is_admin == 1 ? <p className='opacity-50'>Master User</p> : null } */}
                </div>

                <div className='flex pt-[0.0625rem] gap-[0.0625rem] bg-gray-100 text-sm'>
                    <div className='w-full text-center bg-white px-2 py-1 leading-4'>
                        <p>0</p>
                        <p>Quotations</p>
                    </div>
                    <div className='w-full text-center bg-white px-2 py-1 leading-4'>
                        <p>0</p>
                        <p>Orders</p>
                    </div>
                    {/* <Link
                        href = {hrefEdit}
                        className='w-full text-center bg-white px-2 py-1 duration-150 hover:text-secondary_layout focus:text-secondary_layout'
                    >
                        Edit
                    </Link>
                    <button
                        type='button'
                        className='w-full bg-white px-2 py-1 duration-150 hover:text-green-600 focus:text-green-600'
                        onClick={openActInactModal}
                    >
                        Activate
                    </button>
                    <button
                        type='button'
                        className='w-full bg-white px-2 py-1 duration-150 hover:text-red-700 focus:text-red-700'
                        onClick={openActInactModal}
                    >
                        Inactivate
                    </button> */}
                </div>
            </div>
        </>
    )
}
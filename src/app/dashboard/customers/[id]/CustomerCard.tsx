'use client';

import { CompleteEntity } from "@/assets/types/entity";
import SimpleTooltip from "@/components/SimpleTooltip";
import { useProcessedCompleteEntityUser } from "@/store/ProcessedCompleteEntityUser";
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
        [ customerEmails, setCustomerEmails ] = useState<string[]>(customerData.emails ?? []),
        [ customerPhones, setCustomerPhones ] = useState<string[]>(customerData.phones ?? [])

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
            </div>
        </>
    );
}
'use client';

import { CompleteEntity } from "@/assets/types/entity";
import SimpleTooltip from "@/components/SimpleTooltip";
import { useProcessedCompleteEntityUser } from "@/store/ProcessedCompleteEntityUser";
import Formats from "@/util/Formats";
import { Edit } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Info({ Customer }: { Customer: CompleteEntity }) {
    /* const [ userData, setCustomerData ] = useState<CompleteEntity>(Customer),
        [ names, setNames ] = useState(Customer.names ?? ''),
        [ surnames, setSurnames ] = useState(Customer.surnames ?? ''),
        [ documents, setDocuments ] = useState(Formats.getJsonFromString(Customer.documents) ?? []),
        [ phones, setPhones ] = useState(Formats.getJsonFromString(Customer.phones) ?? []),
        [ emails, setEmails ] = useState(Formats.getJsonFromString(Customer.emails) ?? []); */

    const names = Customer.names ?? '',
        surnames = Customer.surnames ?? '',
        documents = Formats.getJsonFromString(Customer.documents) ?? [],
        phones = Formats.getJsonFromString(Customer.phones) ?? [],
        emails = Formats.getJsonFromString(Customer.emails) ?? [];

    // const { Customer: processedCustomer } = useProcessedCompleteEntityUser((state) => state);

    return (
        <div className="entity-info">
            <div className="flex justify-between items-center px-4 py-2 border-b border-gray-100">
                <b>INFO</b>
                <Link className="focus:outline-none duration-200 focus:text-secondary_layout hover:text-secondary_layout" href={`/dashboard/customers/edit/${Customer.id}`}>
                    <Edit className='w-5 h-5' width={10} height={10}/>
                </Link>
            </div>
            <ul className="px-4 py-2 flex flex-col gap-4">
                {/* {names.length > 0 && names.map(typename => (
                    <li>
                        <b className="opacity-65 text-[0.7rem]">{typename.type}</b>
                        <ul className="pl-2 font-extralight">
                            {typename.names.map(name => (
                                <li><span title={name}>{name}</span></li>
                            ))}
                        </ul>
                    </li>
                ))} */}

                {names.length > 0 && (
                    <li>
                        <b className="opacity-65 text-[0.7rem]">NAMES</b>
                        <ul className="pl-2 font-extralight">
                            <li>
                                <SimpleTooltip selectable={true} text={names}>
                                    <span>{names}</span>
                                </SimpleTooltip>
                            </li>
                        </ul>
                    </li>
                )}

                {surnames.length > 0 && (
                    <li>
                        <b className="opacity-65 text-[0.7rem]">LASTNAMES</b>
                        <ul className="pl-2 font-extralight">
                            <li><SimpleTooltip selectable={true} text={surnames}><span>{surnames}</span></SimpleTooltip></li>
                        </ul>
                    </li>
                )}

                {documents.length > 0 && (
                    <li>
                        <b className="opacity-65 text-[0.7rem]">DOCUMENTS</b>
                        <ul className="pl-2 font-extralight">
                            {documents.map((doc, index) => (
                                <li key={`customer-doc-${index}`}><SimpleTooltip selectable={true} text={doc.category}><b>{doc.symbol}:</b></SimpleTooltip> <SimpleTooltip selectable={true} text={doc.document}><span>{doc.document}</span></SimpleTooltip></li>
                            ))}
                        </ul>
                    </li>
                )}

                {emails.length > 0 && (
                    <li>
                        <b className="opacity-65 text-[0.7rem]">EMAILS</b>
                        <ul className="pl-2 font-extralight">
                            {emails.map((email, index) => (
                                <li key={`customer-email-${index}`}><SimpleTooltip selectable={true} text={email}><span>{email}</span></SimpleTooltip></li>
                            ))}
                        </ul>
                    </li>
                )}

                {phones.length > 0 && (
                    <li>
                        <b className="opacity-65 text-[0.7rem]">PHONES</b>
                        <ul className="pl-2 font-extralight">
                            {phones.map((phone, index) => (
                                <li key={`customer-phone-${index}`}><SimpleTooltip selectable={true} text={phone}><span>{phone}</span></SimpleTooltip></li>
                            ))}
                        </ul>
                    </li>
                )}
            </ul>
        </div>
    );
};
'use client';

import { CompleteEntityUser } from "@/assets/types/users";
import SimpleTooltip from "@/components/SimpleTooltip";
import { useProcessedCompleteEntity } from "@/store/ProcessedCompleteEntity";
import Formats from "@/util/Formats";
import { useEffect, useState } from "react";

export default function Info({ User }: { User: CompleteEntityUser }) {
    const [ userData, setUserData ] = useState<CompleteEntityUser>(User),
        [ names, setNames ] = useState(User.names ?? ''),
        [ surnames, setSurnames ] = useState(User.surnames ?? ''),
        [ documents, setDocuments ] = useState(Formats.getJsonFromString(User.documents) ?? []),
        [ phones, setPhones ] = useState(Formats.getJsonFromString(User.phones) ?? []),
        [ emails, setEmails ] = useState(Formats.getJsonFromString(User.emails) ?? []);
    const { User: processedUser } = useProcessedCompleteEntity((state) => state);

    useEffect(() => {
        if(!processedUser || processedUser.id_system_subscription_user != userData.id_system_subscription_user) {
            return;
        }

        setUserData(processedUser);

        setNames(processedUser.names ?? '');
        setSurnames(processedUser.surnames ?? '');
        setDocuments(Formats.getJsonFromString(processedUser.documents) ?? []);
        setPhones(Formats.getJsonFromString(processedUser.phones) ?? []);
        setEmails(Formats.getJsonFromString(processedUser.emails) ?? []);
    }, [processedUser]);

    return (
        <div className="entity-info">
            <div className="px-4 py-2 border-b border-gray-100">
                <b>INFO</b>
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
                            <li><SimpleTooltip selectable={true} text={names}><span>{names}</span></SimpleTooltip></li>
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
                            {documents.map(doc => (
                                <li><SimpleTooltip selectable={true} text={doc.category}><b>{doc.symbol}:</b></SimpleTooltip> <SimpleTooltip selectable={true} text={doc.document}><span>{doc.document}</span></SimpleTooltip></li>
                            ))}
                        </ul>
                    </li>
                )}

                {emails.length > 0 && (
                    <li>
                        <b className="opacity-65 text-[0.7rem]">EMAILS</b>
                        <ul className="pl-2 font-extralight">
                            {emails.map(email => (
                                <li><SimpleTooltip selectable={true} text={email}><span>{email}</span></SimpleTooltip></li>
                            ))}
                        </ul>
                    </li>
                )}

                {phones.length > 0 && (
                    <li>
                        <b className="opacity-65 text-[0.7rem]">PHONES</b>
                        <ul className="pl-2 font-extralight">
                            {phones.map(phone => (
                                <li><SimpleTooltip selectable={true} text={phone}><span>{phone}</span></SimpleTooltip></li>
                            ))}
                        </ul>
                    </li>
                )}
            </ul>
        </div>
    );
};
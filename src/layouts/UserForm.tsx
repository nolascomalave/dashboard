'use client';
// import { InputWithLabel } from "@/components/InputWithLabel";
import { useSession } from "next-auth/react"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { useFormik } from 'formik';
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import ModalFooter from "@/layouts/UI/ModalFooter";
import { ClientFetch } from "@/util/Fetching.js";
import FormErrorMessage from "@/components/FormErrorMessage";
import { useRouter } from "next/navigation";
import { toast } from 'sonner';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea";
import { userSchema, genders } from "@/util/ValidationSchemas/userForm";
import { useEffect, useState } from "react";
import ImageCropSelector from "@/components/ImageCropSelector";

type Inputs = {
    first_name: string;
    second_name: string;
    first_surname: string;
    second_surname: string;
    gender: 'M' | 'F';
    ssn: string | number;
    email: string;
    first_phone: string | number;
    second_phone: string | number;
    address: string,
    photo: any
};

const FormInputContainer = ({children}: {children: React.ReactNode}) => (
    <div
        className="w-full items-center gap-1.5"
        style={{
            width: 'calc(50% - 0.5rem)'
        }}
    >
        {children}
    </div>
);

export default function UserForm({
    closeModal = () => undefined,
    clasName,
    isModal = false,
    ...props
}: {
    closeModal?: () => void,
    clasName?: string,
    isModal: boolean,
    props?: any[]
}) {
    const { data: session } = useSession(),
        router = useRouter(),
        [formID, setFormID] = useState<undefined | string>(undefined),
        [isLoading, setIsLoading] = useState<boolean>(false),
        {
            register,
            handleSubmit,
            /* control,
            watch, */
            setValue,
            setError,
            formState: { errors },
        } = useForm<Inputs>({
            resolver: zodResolver(userSchema),
        }),
        genderRegister = register("gender");


    const onSubmit: SubmitHandler<Inputs> = async (inputs) => {
        setIsLoading(true);

        const ftc = new ClientFetch(),
            data = new FormData();
        let names = [],
            phones = [],
            inputFields: { [key: string]: null | {field: string; alias: string}} = {
                'names.0': {
                    field: 'first_name',
                    alias: 'First name'
                },
                'phones.0': {
                    field: 'first_phone',
                    alias: 'First phone'
                },
                ...((inputs.second_phone ?? '').toString().trim().length > 0 ? {
                    'phones.1': {
                        field: 'second_phone',
                        alias: 'Second phone'
                    }
                } : {}),
                'emails.0': {
                    field: 'mail',
                    alias: 'Email'
                },
                'documents.0': {
                    field: 'ssn',
                    alias: 'Social security number'
                },
                'gender': null,
                'address': null,
                'photo': null
            };

        if(!!inputs.photo) {
            data.append('photo', inputs.photo);
        }

        names.push({
            name: inputs.first_name,
            id_entity_name_type: 1,
            order: 1
        });

        if((inputs.second_name ?? '').trim().length > 0) {
            names.push({
                name: inputs.second_name,
                id_entity_name_type: 1,
                order: 2
            });

            inputFields['names.1'] = {
                field: 'second_name',
                alias: 'Second name'
            };
        }

        names.push({
            name: inputs.first_surname,
            id_entity_surname_type: 2,
            order: 1
        });

        inputFields[(inputs.second_name ?? '').trim().length > 0 ? 'names.2' : 'names.1'] = {
            field: 'first_surname',
            alias: 'First surname'
        };

        if((inputs.second_surname ?? '').trim().length > 0) {
            names.push({
                name: inputs.second_surname,
                id_entity_surname_type: 2,
                order: 2
            });

            inputFields[(inputs.second_name ?? '').trim().length > 0 ? 'names.3' : 'names.2'] = {
                field: 'second_surname',
                alias: 'Second surname'
            };
        }

        data.append('names', JSON.stringify(names));

        data.append('gender', inputs.gender);

        data.append('documents', JSON.stringify([{
            document: inputs.ssn,
            id_entity_document_category: 1,
            order: 1
        }]));

        phones.push({
            phone: inputs.first_phone,
            order: 1
        });

        if((inputs.second_phone ?? '').toString().trim().length > 0) {
            phones.push({
                phone: inputs.second_phone,
                order: 2
            });
        }

        data.append('phones', JSON.stringify(phones));

        data.append('emails', JSON.stringify([{
            phone: inputs.email,
            order: 1
        }]));

        data.append('address', inputs.address);

        /* let newData: {[key: string]: any} = {};

        for (const key of data.keys()) {
            newData[key] = data.get(key);
        }

        delete newData.photo; */

        try {
            const res = await ftc.post({
                url: `${process.env.API}/system-subscription-users`,
                data: data,
                headers: {
                    authorization: `Bearer ${session?.backendTokens.accessToken}`
                },
            });

            setIsLoading(false);

            switch(res.status) {
                case 401:
                    return router.push('/login');
                case 400:
                case 201:
                    const response = await res.json();

                    if(res.status === 400) {

                        let fields: any = {};

                        response.message.forEach((err: string) => {
                            const field = err.split(' ')[0],
                                alias = inputFields[field] !== null ? inputFields[field].alias : null;

                            if(field in fields) {
                                return;
                            }

                            fields[field] = (alias ?? '').concat(' ' + err.split(' ').slice(1).join(' ')).trim();
                        });

                        const fieldsKey = Object.keys(fields);

                        if(Object.keys(inputFields).some((key: string) => fieldsKey.includes(key))) {
                            fieldsKey.forEach((field: string) => setError(inputFields[field] === null ? field : inputFields[field].field, {message: fields[field]}));
                        } else {
                            throw 'error';
                        }
                    } else {
                        toast.success(`User was created`, {
                            position: 'bottom-right',
                            closeButton: true,
                        });
                    }
                    break;
                case 500:
                default:
                    throw 'error';
            }
        } catch(e: any) {
            setIsLoading(false);
            /* toast.error('An unexpected error has occurred.', {
                position: 'bottom-left',
                closeButton: true,
                duration: Infinity
            }); */
            throw 'An unexpected error has occurred.';
        }
    };

    useEffect(() => {
        setFormID(`user-form-${Date.now()}`)
    }, []);

    return (
        <>
            <form
                id={formID}
                className="Modal__content__body"
                onSubmit={handleSubmit(async (data) => {
                    toast.promise(onSubmit(data), {
                        loading: 'Creating User...',
                        // success: () => `User was created`,
                        error: (error: string) => error,
                    });
                })}
            >
                <div
                    {...props}
                    className={clsx({
                        "w-full h-full flex justify-center items-center": true,
                        ...(!clasName ? {} : {[clasName]: true})
                    })}
                >
                    <div
                        className="flex flex-wrap gap-4"
                        style={{
                            minWidth: '12.5rem',
                            width: '30rem',
                            maxWidth: '100%'
                        }}
                    >
                        <div
                            className="w-full"
                        >
                            <div className="m-auto flex flex-col justify-center items-center gap-1.5">
                                <ImageCropSelector
                                    /* disabled = {photoRegister.disabled}
                                    max = {photoRegister.max}
                                    maxLength = {photoRegister.maxLength}
                                    min = {photoRegister.min}
                                    minLength = {photoRegister.minLength}
                                    name = {photoRegister.name}
                                    onBlur = {photoRegister.onBlur}
                                    onChange = {photoRegister.onChange}
                                    pattern = {photoRegister.pattern}
                                    required = {photoRegister.required}
                                    refference = {photoRegister.ref} */
                                    name="photo"
                                    onChange={(e: { target: { name: 'photo', files: FileList } }) => {
                                        console.log(e.target.files[0]);
                                        setValue('photo', e.target.files[0]);
                                    }}
                                />
                                <Label htmlFor="photo" className="m-auto">Photo</Label>
                                {errors.photo?.message && <FormErrorMessage className="m-auto">{errors.photo?.message}</FormErrorMessage>}
                            </div>
                        </div>

                        <FormInputContainer>
                            <Label htmlFor="first_name">First Name</Label>
                            <Input
                                type="string"
                                id="first_name"
                                {...register("first_name", {disabled: isLoading})}
                                placeholder="Name"
                            />
                            {errors.first_name?.message && <FormErrorMessage>{errors.first_name?.message}</FormErrorMessage>}
                        </FormInputContainer>

                        <FormInputContainer>
                            <Label htmlFor="second_name">Second Name</Label>
                            <Input
                                type="string"
                                id="second_name"
                                {...register("second_name", {disabled: isLoading})}
                                placeholder="Name"
                            />
                            {errors.second_name?.message && <FormErrorMessage>{errors.second_name?.message}</FormErrorMessage>}
                        </FormInputContainer>

                        <FormInputContainer>
                            <Label htmlFor="first_surname">First Surname</Label>
                            <Input
                                type="string"
                                id="first_surname"
                                {...register("first_surname", {disabled: isLoading})}
                                placeholder="Surname"
                            />
                            {errors.first_surname?.message && <FormErrorMessage>{errors.first_surname?.message}</FormErrorMessage>}
                        </FormInputContainer>

                        <FormInputContainer>
                            <Label htmlFor="second_surname">Second Surname</Label>
                            <Input
                                type="string"
                                id="second_surname"
                                {...register("second_surname", {disabled: isLoading})}
                                placeholder="Surname"
                            />
                            {errors.second_surname?.message && <FormErrorMessage>{errors.second_surname?.message}</FormErrorMessage>}
                        </FormInputContainer>

                        <FormInputContainer>
                            <Label htmlFor="gender">Gender</Label>
                            <Select
                                name={genderRegister.name}
                                disabled={genderRegister.disabled}
                                required={genderRegister.required}
                                onValueChange={(val: string) => genderRegister.onChange({target: {name: 'gender', value: val}})}
                            >
                                <SelectTrigger id="gender" className="w-full">
                                    <SelectValue placeholder="Select a gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Gender</SelectLabel>
                                        {Object.keys(genders).map((el: string, i: number) => {
                                            return (
                                                <SelectItem key={i} value={el}>{genders[el]}</SelectItem>
                                            );
                                        })}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {errors.gender?.message && <FormErrorMessage>{errors.gender?.message}</FormErrorMessage>}
                        </FormInputContainer>

                        <FormInputContainer>
                            <Label htmlFor="ssn">SSN</Label>
                            <Input
                                type="string"
                                id="ssn"
                                {...register("ssn", {disabled: isLoading})}
                                placeholder="Social Security Number"
                            />
                            {errors.ssn?.message && <FormErrorMessage>{errors.ssn?.message}</FormErrorMessage>}
                        </FormInputContainer>

                        <FormInputContainer>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                type="email"
                                id="email"
                                {...register("email", {disabled: isLoading})}
                                placeholder="Email"
                            />
                            {errors.email?.message && <FormErrorMessage>{errors.email?.message}</FormErrorMessage>}
                        </FormInputContainer>

                        <FormInputContainer>
                            <Label htmlFor="first_phone">First Phone</Label>
                            <Input
                                type="string"
                                id="first_phone"
                                {...register("first_phone", {disabled: isLoading})}
                                placeholder="Phone"
                            />
                            {errors.first_phone?.message && <FormErrorMessage>{errors.first_phone?.message}</FormErrorMessage>}
                        </FormInputContainer>

                        <FormInputContainer>
                            <Label htmlFor="second_phone">Second Phone</Label>
                            <Input
                                type="string"
                                id="second_phone"
                                {...register("second_phone", {disabled: isLoading})}
                                placeholder="Phone"
                            />
                            {errors.second_phone?.message && <FormErrorMessage>{errors.second_phone?.message}</FormErrorMessage>}
                        </FormInputContainer>

                        <div
                            className="w-full items-center gap-1.5"
                        >
                            <Label htmlFor="address">Address</Label>
                            <Textarea
                                id="address"
                                {...register("address", {disabled: isLoading})}
                                placeholder="Address"
                                rows={3}
                                style={{
                                    minHeight: '5rem'
                                }}
                            />
                            {errors.address?.message && <FormErrorMessage>{errors.address?.message}</FormErrorMessage>}
                        </div>
                    </div>
                </div>
            </form>

            <ModalFooter>
                <div
                    className="flex items-center gap-2"
                    style={{
                        justifyContent: 'flex-end'
                    }}
                >
                    <button
                        type="button"
                        className="flex text-sm items-center gap-1 bg-primary_layout focus:outline-none hover:bg-secondary_layout text-white font-bold p-2 px-3 rounded disabled:border disabled:border-input disabled:text-input disabled:bg-transparent"
                        disabled={isLoading}
                        onClick={closeModal}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        form={formID}
                        className="flex text-sm items-center gap-1 bg-primary_layout focus:outline-none hover:bg-secondary_layout text-white font-bold p-2 px-3 rounded disabled:border disabled:border-input disabled:text-input disabled:bg-transparent"
                        disabled={isLoading}
                    >
                        Accept
                    </button>
                </div>
            </ModalFooter>
        </>
    );
}
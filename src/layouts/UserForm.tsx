'use client';
// import { InputWithLabel } from "@/components/InputWithLabel";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { useFormik } from 'formik';
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import ModalFooter from "@/layouts/UI/ModalFooter";
import { ClientFetch } from "@/util/Fetching.js";

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
import HandlerErrors from "@/util/HandlerErrors";

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

const ErrorMessage = ({children, className}: {children: React.ReactNode, className?: string}) => {
    return (
        <p
            className={className}
            style={{
                color: 'rgb(220 38 38)',
                marginTop: '0.5rem',
                fontSize: '0.75rem',
                lineHeight: '1'
            }}
        >
            {children}
        </p>
    )
}

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
    const [formID, setFormID] = useState<undefined | string>(undefined),
        {
            register,
            handleSubmit,
            /* control,
            watch, */
            setValue,
            setError,
            getValues,
            formState: { errors },
        } = useForm<Inputs>({
            resolver: zodResolver(userSchema),
        }),
        genderRegister = register("gender");


    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const ftc = new ClientFetch();

        /* const body = new FormData();

        Object.keys(data).forEach(el => body.append(el, data[el])); */

        try {
            const response = await ftc.post({
                url: `${process.env.API}/system-subscription-users/add`,
                data: data
            });

            if(response.status !== 201) {
                throw response.status;
            }

            console.log(await response.json());
        } catch(e: any) {
            console.log(e);
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
                onSubmit={handleSubmit(onSubmit)}
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
                                        setValue('photo', e.target.files[0]);
                                    }}
                                />
                                <Label htmlFor="photo" className="m-auto">Photo</Label>
                                {errors.photo?.message && <ErrorMessage className="m-auto">{errors.photo?.message}</ErrorMessage>}
                            </div>
                        </div>

                        <FormInputContainer>
                            <Label htmlFor="first_name">First Name</Label>
                            <Input
                                type="string"
                                id="first_name"
                                {...register("first_name")}
                                placeholder="Name"
                            />
                            {errors.first_name?.message && <ErrorMessage>{errors.first_name?.message}</ErrorMessage>}
                        </FormInputContainer>

                        <FormInputContainer>
                            <Label htmlFor="second_name">Second Name</Label>
                            <Input
                                type="string"
                                id="second_name"
                                {...register("second_name")}
                                placeholder="Name"
                            />
                            {errors.second_name?.message && <ErrorMessage>{errors.second_name?.message}</ErrorMessage>}
                        </FormInputContainer>

                        <FormInputContainer>
                            <Label htmlFor="first_surname">First Surname</Label>
                            <Input
                                type="string"
                                id="first_surname"
                                {...register("first_surname")}
                                placeholder="Surname"
                            />
                            {errors.first_surname?.message && <ErrorMessage>{errors.first_surname?.message}</ErrorMessage>}
                        </FormInputContainer>

                        <FormInputContainer>
                            <Label htmlFor="second_surname">Second Surname</Label>
                            <Input
                                type="string"
                                id="second_surname"
                                {...register("second_surname")}
                                placeholder="Surname"
                            />
                            {errors.second_surname?.message && <ErrorMessage>{errors.second_surname?.message}</ErrorMessage>}
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
                            {errors.gender?.message && <ErrorMessage>{errors.gender?.message}</ErrorMessage>}
                        </FormInputContainer>

                        <FormInputContainer>
                            <Label htmlFor="ssn">SSN</Label>
                            <Input
                                type="string"
                                id="ssn"
                                {...register("ssn")}
                                placeholder="Social Security Number"
                            />
                            {errors.ssn?.message && <ErrorMessage>{errors.ssn?.message}</ErrorMessage>}
                        </FormInputContainer>

                        <FormInputContainer>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                type="email"
                                id="email"
                                {...register("email")}
                                placeholder="Email"
                            />
                            {errors.email?.message && <ErrorMessage>{errors.email?.message}</ErrorMessage>}
                        </FormInputContainer>

                        <FormInputContainer>
                            <Label htmlFor="first_phone">First Phone</Label>
                            <Input
                                type="string"
                                id="first_phone"
                                {...register("first_phone")}
                                placeholder="Phone"
                            />
                            {errors.first_phone?.message && <ErrorMessage>{errors.first_phone?.message}</ErrorMessage>}
                        </FormInputContainer>

                        <FormInputContainer>
                            <Label htmlFor="second_phone">Second Phone</Label>
                            <Input
                                type="string"
                                id="second_phone"
                                {...register("second_phone")}
                                placeholder="Phone"
                            />
                            {errors.second_phone?.message && <ErrorMessage>{errors.second_phone?.message}</ErrorMessage>}
                        </FormInputContainer>

                        <div
                            className="w-full items-center gap-1.5"
                        >
                            <Label htmlFor="address">Address</Label>
                            <Textarea
                                id="address"
                                {...register("address")}
                                placeholder="Address"
                                rows={3}
                                style={{
                                    minHeight: '5rem'
                                }}
                            />
                            {errors.address?.message && <ErrorMessage>{errors.address?.message}</ErrorMessage>}
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
                        className="flex text-sm items-center gap-1 bg-primary_layout focus:outline-none hover:bg-secondary_layout text-white font-bold p-2 px-3 rounded"
                        onClick={closeModal}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        form={formID}
                        className="flex text-sm items-center gap-1 bg-primary_layout focus:outline-none hover:bg-secondary_layout text-white font-bold p-2 px-3 rounded"
                    >
                        Accept
                    </button>
                </div>
            </ModalFooter>
        </>
    );
}
'use client';

import { useEffect, useState } from "react";
import ModalFooter from "./UI/ModalFooter";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { CircleCheckBig, CircleX, Eye, EyeOff } from "lucide-react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { changePasswordSchema } from "@/util/ValidationSchemas/changePasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormErrorMessage from "@/components/FormErrorMessage";
import ModalLoader from "./UI/ModalLoader";
import { ClientFetch } from "@/util/Fetching";
import { CompleteEntityUser } from "@/assets/types/users";
import { Session } from "inspector";
import { toast } from "sonner";
import { signOut } from "next-auth/react";

type Inputs = {
    current_password: string,
    new_password: string,
    confirm_new_password: string
};

export default function ChangePasswordForm({
    // backOnClose = false,
    session,
    closeModal,
    setIsDisabledCloseBtnModal,
    FormContainerStyle
}: {
    // backOnClose?: boolean,
    session?: Session;
    closeModal?: () => void;
    isDisabledCloseBtnModal?: boolean;
    setIsDisabledCloseBtnModal?: (val: boolean) => void;
    FormContainerStyle?: Properties<string | number, string & {}>;
}) {
    const [formID, setFormID] = useState<undefined | string>(undefined),
        router = useRouter(),
        [ isVisibleCurrentPassword, setIsVisibleCurrentPassword ] = useState<boolean>(false),
        [ isVisibleNewPassword, setIsVisibleNewPassword ] = useState<boolean>(false),
        [ isVisibleConfirmPassword, setIsVisibleConfirmPassword ] = useState<boolean>(false),
        [ isLoading, setIsLoading ] = useState<boolean>(false),
        {
            control,
            register,
            handleSubmit,
            setError,
            formState: { errors },
        } = useForm<Inputs>({
            resolver: zodResolver(changePasswordSchema),
            values: {
                current_password: '',
                new_password: '',
                confirm_new_password: ''
            }
        });

    closeModal ??= () => router.push('/dashboard');

    const onSubmit: SubmitHandler<Inputs> = async (inputs) => {
        setIsLoading(true);

        const ftc = new ClientFetch();

        try {
            const res = await ftc.patch({
                url: `${process.env.API}/system-subscription-users/change-password`,
                data: {
                    system_subscription_user_id: session?.user.system_subscription_user_id,
                    current_password: inputs.current_password,
                    new_password: inputs.new_password
                },
                headers: {
                    authorization: `Bearer ${session?.backendTokens.accessToken}`
                }
            });

            if(res.status !== 200) {
                console.log(res.status);
                if(res.status === 401) {
                    throw 401;
                    // return router.push('/login');
                }

                throw 'error';
            }

            const { message } = await res.json();

            toast.success(
                <>
                    {message}
                    <br/>
                    Now you must log in.
                </>, {
                position: 'bottom-right',
                closeButton: true
            });

            // closeModal();

            await signOut({
                redirect: false
            });

            router.push('/login');

            setIsLoading(false);
        } catch(e: any) {

            if(e === 401) {
                setError('current_password', {
                    message: 'Invalid password.'
                });
            } else {
                toast.error('An unexpected error has occurred.', {
                    position: 'bottom-left',
                    closeButton: true,
                    duration: Infinity
                });
            }

            setIsLoading(false);
        }
    }

    useEffect(() => {
        if(setIsDisabledCloseBtnModal) {
            setIsDisabledCloseBtnModal(isLoading);
        }
    }, [isLoading]);

    useEffect(() => {
        setFormID(`user-form-${Date.now()}`);
    }, []);

    return (
        <>
            <form
                className="Modal__content__body flex flex-col px-4 py-2 gap-2"
                id={formID}
                style={FormContainerStyle}
                onSubmit={handleSubmit(async (data) => {
                    if(data.new_password !== data.confirm_new_password) {
                        return setError('confirm_new_password', {
                            message: 'Please, make sure your password match.'
                        });
                    } else if(data.new_password === data.current_password) {
                        return setError('new_password', {
                            message: 'The new password must not be the same as the current password.'
                        });
                    }

                    onSubmit(data);
                })}
            >
                <div
                    className="w-full items-center gap-1.5"
                >
                    <Label htmlFor="current_password">Current Password</Label>
                    <div className="flex gap-2 items-center">
                        <Input
                            type={isVisibleCurrentPassword ? "text" : "password"}
                            id="current_password"
                            {...register('current_password', {disabled: isLoading})}
                            placeholder="***..."
                        />
                        <button type="button" className="w-6 h-6 flex justify-center items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm" onClick={() => setIsVisibleCurrentPassword(!isVisibleCurrentPassword)}>
                            {isVisibleCurrentPassword ? (
                                <EyeOff style={{
                                    width: '1rem',
                                    height: '1rem'
                                }} />
                            ) : (
                                <Eye style={{
                                    width: '1rem',
                                    height: '1rem'
                                }} />
                            )}
                        </button>
                    </div>

                    {errors.current_password?.message && <FormErrorMessage>{errors.current_password?.message}</FormErrorMessage>}
                </div>

                <div
                    className="w-full items-center gap-1.5"
                >
                    <Controller
                        name="new_password"
                        control={control}
                        render={({ field }) => {
                            const haveMinLetter = /[a-z]/g.test(field.value),
                                haveMaxLetter = /[A-Z]/g.test(field.value),
                                haveNumber = /[0-9]/g.test(field.value),
                                haveSpecial = /[^a-z0-9A-Z]/g.test(field.value);
                            const iconParams = {width: 10, height: 10, style: {width: '1rem', height: '1rem'}}

                            return (
                                <>
                                    <Label htmlFor="new_password">New Password</Label>
                                    <div className="flex gap-2 items-center">
                                        <Input
                                            {...field}
                                            type={isVisibleNewPassword ? "text" : "password"}
                                            id="new_password"
                                            placeholder="***..."
                                            disabled={isLoading}
                                        />
                                        <button type="button" className="w-6 h-6 flex justify-center items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm" onClick={() => setIsVisibleNewPassword(!isVisibleNewPassword)}>
                                            {isVisibleNewPassword ? (
                                                <EyeOff style={{
                                                    width: '1rem',
                                                    height: '1rem'
                                                }} />
                                            ) : (
                                                <Eye style={{
                                                    width: '1rem',
                                                    height: '1rem'
                                                }} />
                                            )}
                                        </button>
                                    </div>

                                    {((field.value ?? '').length > 0 && !errors.new_password) && (
                                        <div className="mt-1" style={{fontSize: '0.75rem'}}>
                                            <p className="font-bold">The new password must contain at least:</p>
                                            <ul className="ps-2">
                                                <li className={"flex gap-2"}>
                                                    {haveMinLetter ? (
                                                        <CircleCheckBig {...iconParams} className="text-green-600" />
                                                    ) : (
                                                        <CircleX {...iconParams} className="text-red-700" />
                                                    )} A lowercase letter.
                                                </li>
                                                <li className={"flex gap-2"}>
                                                    {haveMaxLetter ? (
                                                        <CircleCheckBig {...iconParams} className="text-green-600" />
                                                    ) : (
                                                        <CircleX {...iconParams} className="text-red-700" />
                                                    )} A capital letter
                                                </li>
                                                <li className={"flex gap-2"}>
                                                    {haveNumber ? (
                                                        <CircleCheckBig {...iconParams} className="text-green-600" />
                                                    ) : (
                                                        <CircleX {...iconParams} className="text-red-700" />
                                                    )} A number.
                                                </li>
                                                <li className={"flex gap-2"}>
                                                    {haveSpecial ? (
                                                        <CircleCheckBig {...iconParams} className="text-green-600" />
                                                    ) : (
                                                        <CircleX {...iconParams} className="text-red-700" />
                                                    )} A special character.
                                                </li>
                                            </ul>
                                        </div>
                                    )}

                                    {errors.new_password?.message && <FormErrorMessage>{errors.new_password?.message}</FormErrorMessage>}
                                </>
                            );
                        }}
                    />
                </div>

                <div
                    className="w-full items-center gap-1.5"
                >
                    <Label htmlFor="confirm_new_password">Confirm New Password</Label>
                    <div className="flex gap-2 items-center">
                        <Input
                            type={isVisibleConfirmPassword ? "text" : "password"}
                            id="confirm_new_password"
                            {...register('confirm_new_password', {disabled: isLoading})}
                            placeholder="***..."
                        />
                        <button type="button" className="w-6 h-6 flex justify-center items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm" onClick={() => setIsVisibleConfirmPassword(!isVisibleConfirmPassword)}>
                            {isVisibleConfirmPassword ? (
                                <EyeOff style={{
                                    width: '1rem',
                                    height: '1rem'
                                }} />
                            ) : (
                                <Eye style={{
                                    width: '1rem',
                                    height: '1rem'
                                }} />
                            )}
                        </button>
                    </div>

                    {errors.confirm_new_password?.message && <FormErrorMessage>{errors.confirm_new_password?.message}</FormErrorMessage>}
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

            {isLoading && <ModalLoader/>}
        </>
    );
}
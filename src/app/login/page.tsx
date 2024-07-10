'use client';

import { signIn } from 'next-auth/react';
import clsx from 'clsx';
import styles from './login.module.scss';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/util/ValidationSchemas/loginSchema';
import { Label } from '@radix-ui/react-dropdown-menu';
import { Input } from '@/components/ui/input';
import Button from '@/components/Button';
import { LoaderCircle, LogIn } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import FormErrorMessage from '@/components/FormErrorMessage';
import Image from 'next/image';
import { ClientFetch } from '@/util/Fetching';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner'

type LoginInputs = {
    id_system_subscription: number,
    username: string,
    password: string
};

const aliases = {
    id_system_subscription: 'Entity ID',
    username: 'Username',
    password: 'Password'
}

export default function Login() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const {
            register,
            handleSubmit,
            setError,
            getValues,
            control,
            /* setValue,
            getValues, */
            formState: { errors }
        } = useForm<LoginInputs>({
            resolver: zodResolver(loginSchema),
        }),
        entityRegister = register('id_system_subscription', {disabled: isLoading});

    const onSubmit: SubmitHandler<LoginInputs> = async (inputs) => {
        setIsLoading(true);
        const ftc = new ClientFetch();

        try {

            const response = await signIn('credentials',
                {
                    ...inputs,
                    redirect: false,
                }
            );

            setIsLoading(false);

            if (!response?.error) {
                return router.push('/dashboard');
            }

            if(response.status === 500) {
                throw response;
            }

            if(response.status === 401) {
                const errorsResponse = JSON.parse(response.error).message;
                let fields: any = {};

                // await clearErrors();

                errorsResponse.forEach((err: string) => {
                    const field = err.split(' ')[0];

                    if(field in fields) {
                        return;
                    }

                    fields[field] = (aliases[field] ?? '').concat(' ' + err.split(' ').slice(1).join(' ')).trim();
                });

                Object.keys(fields).forEach((field: string) => setError(field, {message: fields[field]}));
            }

        } catch(e: any) {
            toast.error('An unexpected error has occurred.', {
                position: 'bottom-left'
            });
        }
    };

    return (
        <main
            className={clsx(styles['login-page'], 'overflow-auto')}
        >
            {/* <svg width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'>
                <defs>
                    <linearGradient id="gradient">
                        <stop stopColor={vars.secondary_layout} offset="0%" />
                        <stop stopColor={vars.primary_layout} offset="100%" />
                    </linearGradient>
                    <pattern id='a' patternUnits='userSpaceOnUse' width='40' height='59.428' patternTransform='scale(2) rotate(45)'>
                        <path d='M0 70.975V47.881m20-1.692L8.535 52.808v13.239L20 72.667l11.465-6.62V52.808zm0-32.95l11.465-6.62V-6.619L20-13.24 8.535-6.619V6.619L20 13.24m8.535 4.927v13.238L40 38.024l11.465-6.62V18.166L40 11.546zM20 36.333L0 47.88m0 0v23.094m0 0l20 11.548 20-11.548V47.88m0 0L20 36.333m0 0l20 11.549M0 11.547l-11.465 6.619v13.239L0 38.025l11.465-6.62v-13.24L0 11.548v-23.094l20-11.547 20 11.547v23.094M20 36.333V13.24'  strokeLinecap='square' strokeWidth='8' stroke={vars.fond} fill='none'/>
                    </pattern>
                </defs>
                <rect width='800%' height='800%' transform='translate(0,0)' fill='url(#a)'/>
            </svg> */}

            <div className='w-full h-full sm:backdrop-blur-sm sm:p-4 flex items-center justify-center'>
                <div
                    className='login-page__container flex z-10 flex-col-reverse rounded-sm w-full max-w-96 sm:max-w-[48rem] sm:flex-row-reverse sm:shadow-2xl'
                    style={{
                        // maxWidth: '48rem'
                    }}
                >
                    <div className={`login-page__container__front-page rounded-r-sm py-12 px-8 hidden sm:block bg-primary_layout w-full sm:w-[50%] text-primary_color text-[0.75rem]`}>
                        <header className=''>
                            <Image
                                src="/Images/IRMS-Logo.svg"
                                alt="IRMS Logo"
                                width={100}
                                height={100}
                                priority
                                className="flex-shrink-0"
                                style={{
                                    width: '5rem',
                                    height: '5rem'
                                }}
                            />
                            <h1 className='text-2xl mt-6 mb-2'>
                                IRMS
                            </h1>

                            <p>Information and Resources Management System</p>
                        </header>
                    </div>

                    <div className='login-page__container__form h-full sm:h-auto backdrop-blur-sm sm:backdrop-blur-none sm:bg-fond text-primary_color sm:rounded-l-sm flex items-center justify-center px-8 py-12 sm:w-[50%] sm:text-primary_layout'>
                        <form
                            className='max-w-60 text-center w-full'
                            onSubmit={(e: any) => {
                                console.log(getValues());
                                handleSubmit(onSubmit)(e);
                            }}
                        >
                            <h2 className='text-xl'>Login</h2>
                            {/* <h2 className='text-3xl'>IRMS</h2>
                            <p className='text-sm leading-4'>Information and Resources Management System</p> */}

                            <div className='flex flex-col gap-4 text-left mt-8 mb-4'>
                                <div className="w-full items-center gap-1.5">
                                    <Label>Subscribed Entity</Label>

                                    <Controller
                                        control={control}
                                        name="id_system_subscription"
                                        render={({ field }) => {
                                            const {ref, ...fieldProps} = field;
                                            return (
                                                <Select
                                                    onValueChange={(val: string) => entityRegister.onChange({target: {name: 'id_system_subscription', value: Number(val)}})}
                                                    {...fieldProps}
                                                    /* {...entityRegister}
                                                    value={system_subscription_value.toString()}
                                                    onValueChange={(val: string) => setSystem_subscription_value(Number(val))} */
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select an entity" ref={ref} />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value={'1'}>New Evolution</SelectItem>
                                                        {/* {Object.keys(genders).map((el: string, i: number) => {
                                                            return (
                                                                <SelectItem key={i} value={el}>{genders[el]}</SelectItem>
                                                            );
                                                        })} */}
                                                    </SelectContent>
                                                </Select>
                                            )
                                        }}
                                    ></Controller>
                                    {errors.id_system_subscription?.message && <FormErrorMessage>{errors.id_system_subscription?.message}</FormErrorMessage>}
                                </div>

                                <div className="w-full items-center gap-1.5">
                                    <Label>Username</Label>
                                    <Input
                                        type="string"
                                        id="first_name"
                                        {...register("username", {disabled: isLoading})}
                                        placeholder="Username"
                                    />
                                    {errors.username?.message && <FormErrorMessage>{errors.username?.message}</FormErrorMessage>}
                                </div>

                                <div className="w-full items-center gap-1.5">
                                    <Label>Password</Label>
                                    <Input
                                        type="password"
                                        id="first_name"
                                        {...register("password", {disabled: isLoading})}
                                        placeholder="Password"
                                    />
                                    {errors.password?.message && <FormErrorMessage>{errors.password?.message}</FormErrorMessage>}
                                </div>
                            </div>

                            <div>
                                <Button
                                    type="submit"
                                    className={clsx({
                                        'm-auto': true,
                                        'opacity-50': isLoading
                                    })}
                                    disabled={isLoading}
                                >
                                    Login

                                    {isLoading ? (
                                        <LoaderCircle
                                            className='loading'
                                            width={20}
                                            height={20}
                                        />
                                    ) : (
                                        <LogIn width={20} height={20}/>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
'use client';

import clsx from 'clsx';
import styles from './login.module.scss';
import vars from '@/assets/scss/vars.module.scss';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/util/ValidationSchemas/loginSchema';
import { Label } from '@radix-ui/react-dropdown-menu';
import { Input } from '@/components/ui/input';
import Button from '@/components/Button';
import { LogIn } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import FormErrorMessage from '@/components/FormErrorMessage';
import Image from 'next/image';

type LoginInputs = {
    system_subscripton: number,
    username: string,
    password: string
};

export default function Login() {
    const {
            register,
            handleSubmit,
            /* setValue,
            setError,
            getValues, */
            formState: { errors },
        } = useForm<LoginInputs>({
            resolver: zodResolver(loginSchema),
        }),
        entityRegister = register('system_subscripton');

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

                    <div className='login-page__container__form h-full sm:h-auto backdrop-blur-sm sm:backdrop-blur-none sm:bg-white text-primary_color sm:rounded-l-sm flex items-center justify-center px-8 py-12 sm:w-[50%] sm:text-primary_layout'>
                        <form
                            className='max-w-60 text-center w-full'
                            onSubmit={handleSubmit((data: any) => console.log(data))}
                        >
                            <h2 className='text-xl'>Login</h2>
                            {/* <h2 className='text-3xl'>IRMS</h2>
                            <p className='text-sm leading-4'>Information and Resources Management System</p> */}

                            <div className='flex flex-col gap-4 text-left mt-8 mb-4'>
                                <div className="w-full items-center gap-1.5">
                                    <Label>Subscribed Entity</Label>
                                    <Select
                                        name={entityRegister.name}
                                        disabled={entityRegister.disabled}
                                        required={entityRegister.required}
                                        onValueChange={(val: string) => entityRegister.onChange({target: {name: 'system_subscripton', value: Number(val)}})}
                                    >
                                        <SelectTrigger id="gender" className="w-full">
                                            <SelectValue placeholder="Select an entity" />
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
                                    {errors.system_subscripton?.message && <FormErrorMessage>{errors.system_subscripton?.message}</FormErrorMessage>}
                                </div>

                                <div className="w-full items-center gap-1.5">
                                    <Label>Username</Label>
                                    <Input
                                        className='sm:bg-fond'
                                        type="string"
                                        id="first_name"
                                        {...register("username")}
                                        placeholder="Username"
                                    />
                                    {errors.username?.message && <FormErrorMessage>{errors.username?.message}</FormErrorMessage>}
                                </div>

                                <div className="w-full items-center gap-1.5">
                                    <Label>Password</Label>
                                    <Input
                                        className='sm:bg-fond'
                                        type="password"
                                        id="first_name"
                                        {...register("password")}
                                        placeholder="Password"
                                    />
                                    {errors.password?.message && <FormErrorMessage>{errors.password?.message}</FormErrorMessage>}
                                </div>
                            </div>

                            <div>
                                <Button
                                    type="submit"
                                    className='m-auto'
                                >
                                    Login
                                    <LogIn width={20} height={20}/>
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
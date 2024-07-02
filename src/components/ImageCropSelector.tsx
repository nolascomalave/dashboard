'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
    Image,
    Trash2,
    Pen,
    Ellipsis
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from './ui/label';
import { UseFormRegister } from 'react-hook-form';
// import ReactCrop, { Crop } from 'react-image-crop'

export default function ImageCropSelector({
    name,
    Icon = Image,
    register,
    ...props
}: {
    name?: string;
    Icon?: any;
    register?: (val: string) => any;
    props: any;
}) {
    const [image, setImage]=useState(null),
        inputRef = useRef(),
        {ref: registerRef, ...rest} = (!register || !name) ? {ref: undefined} : register(name);

    const chooseImage = () => inputRef.current.click();

    const onChangeInput=({target}: {target: HTMLFormElement}) => {
        if(target.files && target.files.length>0){
            const reader=new FileReader();
            reader.readAsDataURL(target.files[0]);
            reader.addEventListener('load', ()=>{
                setImage(reader.result);
            });
        }
    };

    const onRemove = () => setImage(null);

    useEffect(() => {
        if(!image && !!inputRef.current) {
            inputRef.current.value='';
            console.log(inputRef.current.files);
        }
    }, [image]);

    return (
        <>
            <input
                accept="image/webp, image/jpeg, image/png"
                onChange={onChangeInput}
                {...props}
                ref={!registerRef ? inputRef.current : (e) => {
                    registerRef(e);
                    inputRef.current = e;
                }}
                {...rest}
                type='file'
                className='hidden'
            />
            <div className='rounded-full relative'>
                <button
                    className='w-16 h-16 flex items-center justify-center duration-150 rounded-full border-2 box-border border-primary_layout text-primary_layout opacity-60 hover:opacity-100 focus:opacity-100'
                    type='button'
                    onClick={chooseImage}
                >
                    {!image ? (
                        <Icon
                            width={50}
                            height={50}
                            className='w-10 h-10'
                        />
                    ) : (
                        <img
                            src={image}
                            className='w-full h-full rounded-full object-cover object-center'
                        />
                    )}
                </button>

                {image && (
                    <>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button
                                    type='button'
                                    className='absolute border border-secondary_color rounded-full w-5.5 h-5.5 bg-fond opacity-50 duration-200 hover:opacity-100'
                                    style={{
                                        right: '0rem',
                                        top: '0rem'
                                    }}
                                >
                                    <Ellipsis
                                        className='w-full h-full'
                                        width={20}
                                        height={20}
                                    />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem
                                        className='cursor-pointer'
                                        onClick={chooseImage}
                                    >
                                        <Pen className="mr-2 h-4 w-4" />
                                        <span>Change</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className='cursor-pointer'
                                        onClick={onRemove}
                                    >
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        <span>Remove</span>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </>
                )}
            </div>
            <Label
                className='text-primary_layout opacity-60'
                onClick={chooseImage}
            >
                {
                    (!image || (inputRef.current ?? {files: []}).files.length < 1) ?
                        'Choose a image'
                    : inputRef.current.files[0].name
                }
            </Label>
        </>
    );
}
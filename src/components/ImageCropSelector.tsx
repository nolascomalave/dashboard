'use client';

import ImageNext from "next/image";
import React, { Ref, useEffect, useRef, useState } from 'react';
import {
    Image,
    Trash2,
    Pen,
    Images,
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
import ImageCropperModal from './ImageCropperModal';
import ImageViewer from './ImageViewer';

export default function ImageCropSelector({
    name,
    Icon = Image,
    refference,
    onChange,
    alt,
    initialImage,
    ...props
}: {
    name?: string;
    Icon?: any;
    refference?: (instance: any) => void;
    onChange?: (obj: { target: ({ name: string; files: FileList }) }) => any;
    alt?: string,
    initialImage?: string;
    props: any;
}) {
    const [originalImage, setOriginalImage]=useState(initialImage ?? null),
        [updatedImage, setUpdatedImage] = useState<{url: string | null, blob: Blob | null}>({url: null, blob: null}),
        // [updatedSrcImage, setUpdatedSrcImage] = useState(null),
        [modalOpen, setModalOpen] = useState<boolean>(false),
        [isOpenViewer, setIsOpenViewer] = useState<boolean>(false),
        inputRef = useRef();

    const chooseImage = () => inputRef.current.click();

    const onChangeInput=({target}: {target: { name: string; files: {0: any, length: number} }}, isUpdated?: boolean) => {
        if(onChange) {
            onChange({target});
        }

        if(isUpdated) {
            return; // setUpdatedImage(url);
        }

        if(target.files && target.files.length>0){
            const reader=new FileReader();
            reader.readAsDataURL(target.files[0]);
            reader.addEventListener('load', ()=>{
                setOriginalImage(reader.result);
                setUpdatedImage({url: null, blob: null});
            });
        }
    };

    const onRemove = () => {
        setOriginalImage(null);
        setUpdatedImage({url: null, blob: null});
    };

    useEffect(() => {
        if(!originalImage && !!inputRef.current) {
            inputRef.current.value='';
            if(onChange && !!name) {
                onChange({
                    target: {
                        name,
                        files: {
                            length: 0,
                            0: null
                        }
                    }
                });
            }
        } else if(originalImage && originalImage !== initialImage) {
            setModalOpen(true);
        }
    }, [originalImage]);

    return (
        <>
            <input
                accept="image/webp, image/jpeg, image/png"
                onChange={onChangeInput}
                {...props}
                ref={!refference ? inputRef : (e) => {
                    refference(e);
                    inputRef.current = e;
                }}
                type='file'
                className='hidden'
            />
            <div className='rounded-full relative'>
                <button
                    className='w-16 h-16 flex items-center justify-center duration-150 rounded-full border-2 box-border border-primary_layout text-primary_layout opacity-60 hover:opacity-100 focus:opacity-100'
                    type='button'
                    onClick={!originalImage ? chooseImage : () => setIsOpenViewer(true)}
                >
                    {!originalImage ? (
                        <Icon
                            width={50}
                            height={50}
                            className='w-10 h-10'
                        />
                    ) : (
                        <img
                            src={updatedImage.url ?? originalImage}
                            className='w-full h-full rounded-full object-cover object-center'
                            alt={alt ?? "Photo"}
                            onError={(e) => {
                                setOriginalImage(null);
                                if(onChange && !!name) {
                                    onChange({
                                        target: {
                                            name,
                                            files: {
                                                length: 0,
                                                0: null
                                            }
                                        }
                                    });
                                }
                            }}
                            /* width={1000}
                            height={1000} */
                        />
                    )}
                </button>

                {originalImage && (
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
                                {originalImage !== initialImage && (
                                    <DropdownMenuItem
                                        className='cursor-pointer'
                                        onClick={() => setModalOpen(true)}
                                    >
                                        <Pen className="mr-2 h-4 w-4" />
                                        <span>Edit</span>
                                    </DropdownMenuItem>
                                )}
                                <DropdownMenuItem
                                    className='cursor-pointer'
                                    onClick={chooseImage}
                                >
                                    <Images className="mr-2 h-4 w-4" />
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
                )}
            </div>
            <Label
                className='text-primary_layout opacity-60'
                style={{
                    fontSize: '0.85em'
                }}
                onClick={chooseImage}
            >
                {
                    (!originalImage || (inputRef.current ?? {files: []}).files.length < 1) ?
                        'Choose a image'
                    : inputRef.current.files[0].name
                }
            </Label>

            {(isOpenViewer && originalImage) && (
                <ImageViewer
                    src = {updatedImage.url ?? originalImage}
                    closeModal = {() => setIsOpenViewer(false)}
                    alt={alt ?? "Photo"}
                />
            )}

            {modalOpen && (
                <ImageCropperModal
                    onAccept = {(url: string, blob: Blob) => {
                        setUpdatedImage({
                            url: url,
                            blob: blob
                        });
                        onChangeInput({
                            target: {
                                name: name ?? '',
                                files: {
                                    length: 1,
                                    0: blob
                                }
                            }
                        }, true);
                        setModalOpen(false);
                    }}
                    urlImg = {originalImage}
                    // updateAvatar={updateAvatar}
                    closeModal={() => setModalOpen(false)}
                />
            )}
        </>
    );
}
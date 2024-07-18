'use client';
import { X } from "lucide-react";
import Image from "next/image";
import { createPortal } from "react-dom"

export default function ImageViewer({
    src,
    alt,
    closeModal,
    ...props
}: {
    src: string;
    alt: string;
    closeModal: () => any;
    props?: any
}) {
    return createPortal((
        <div
            className="relative"
            aria-labelledby="crop-image-dialog"
            role="dialog"
            aria-modal="true"
            style={{
            zIndex: 1
            }}
        >
            <div className="fixed inset-0 bg-primary_layout bg-opacity-50 transition-all backdrop-blur-sm"></div>
            <div className="fixed inset-0 z-1 w-screen overflow-y-auto md:p-8 p-4 flex min-h-full justify-center text-center">
                <div
                    className="relative w-full max-w-[45rem] max-h-[1024px] sm:w-[90%] md:w-[80%] text-slate-100 text-left shadow-xl transition-all"
                    style={{
                        backgroundColor: 'red',
                        opacity: '0.8',
                        backgroundImage: 'repeating-linear-gradient(45deg, #e6e6e6 25%, transparent 25%, transparent 75%, #e6e6e6 75%, #e6e6e6), repeating-linear-gradient(45deg, #e6e6e6 25%, #fff 25%, #fff 75%, #e6e6e6 75%, #e6e6e6)',
                        backgroundPosition: '0 0, 0.75rem 0.75rem',
                        backgroundSize: '1.5rem 1.5rem',
                    }}
                >
                    <button
                        type="button"
                        className="absolute -top-[0.75rem] -right-[0.75rem] flex items-end justify-center rounded-full text-primary_layout border border-secondary_color p-1 bg-fond opacity-50 hover:opacity-100 duration-200"
                        onClick={closeModal}
                    >
                        <X width={20} height={20} />
                    </button>
                    <Image
                        src={src}
                        alt={alt}
                        width={1000}
                        height={1000}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            objectPosition: 'center'
                        }}
                        {...props}
                    />
                </div>
            </div>
        </div>
    ), document.body);
};
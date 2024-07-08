'use client';
import { createPortal } from "react-dom";
import ImageCropper from "./ImageCropper";
import { X } from "lucide-react";

const ImageCropperModal = ({ urlImg, onAccept, closeModal }: any) => {
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
            <div className="relative w-full rounded-xl px-5 py-4 bg-fond max-w-[45rem] max-h-[1024px] sm:w-[90%] md:w-[80%] text-slate-100 text-left shadow-xl transition-all">
                <button
                    type="button"
                    className="absolute -top-[0.75rem] -right-[0.75rem] flex items-end justify-center rounded-full text-primary_layout border border-secondary_color p-1 bg-fond opacity-50 hover:opacity-100 duration-200"
                    onClick={closeModal}
                >
                    <X width={20} height={20} />
                </button>
                <ImageCropper
                    onAccept = {onAccept}
                    urlImg = {urlImg}
                    closeModal={closeModal}
                    /* updateAvatar={updateAvatar}
                    closeModal={closeModal} */
                />
            </div>
        </div>
    </div>
  ), document.body);
};
export default ImageCropperModal;
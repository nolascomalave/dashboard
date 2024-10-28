import { LoaderCircle } from "lucide-react";

export default function ModalLoader() {
    return (
        <div className='Modal__content__loader'>
            <LoaderCircle
                className='loading-circle'
                width={10}
                height={10}
                style={{
                    width: '3rem',
                    height: '3rem'
                }}
            />
        </div>
    );
}
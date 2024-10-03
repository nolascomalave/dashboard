import { LoaderCircle } from "lucide-react";

export default function DatalistSectionLoader() {
    return (
        <div className="h-full w-full flex items-center justify-center">
            <LoaderCircle
                className='loading-circle text-secondary_layout'
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
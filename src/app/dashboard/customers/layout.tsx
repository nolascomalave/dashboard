'use client';

import { useSelectedLayoutSegment } from 'next/navigation';
import { Suspense } from 'react';
import Loading from '@/app/dashboard/loading';
import { createPortal } from 'react-dom';

function SuspenseModal() {
    return createPortal((
        <div>
            <div className='fixed top-0 left-0 h-screen w-screen bg-black opacity-50' style={{ zIndex: 1 }}></div>
            <div className='fixed top-0 left-0 h-screen w-screen' style={{ zIndex: 1 }}>
                <Loading/>
            </div>
        </div>
    ), document.body);
}

export default function Layout({ children, customersModals }: { children: React.ReactNode, customersModals: React.ReactNode }) {
    const isActiveUsersModal = !(useSelectedLayoutSegment('customersModals') === null);

    return <>
        { children }
        {isActiveUsersModal && (
            <Suspense fallback={<SuspenseModal/>}>
                {customersModals}
            </Suspense>
        )}
    </>;
}
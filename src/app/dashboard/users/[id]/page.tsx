'use server';

import { Suspense } from 'react';
import ProfileInfo from './ProfileInfo';
import styles from './styles.module.scss';
import { ProfileInfoSkeleton, QuotationsSkeleton } from './skeletons';
import Quotations from './Quotations';

export default async function page({ params: { id } }: { params: { id: string } })  {
    return (
        <div className={styles.Profile}>
            <Suspense fallback={<ProfileInfoSkeleton/>}>
                <ProfileInfo id = {id}/>
            </Suspense>

            <Suspense fallback={<QuotationsSkeleton/>}>
                <Quotations id = {id}/>
            </Suspense>
        </div>
    )
}
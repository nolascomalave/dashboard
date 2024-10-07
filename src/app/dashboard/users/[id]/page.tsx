'use server';

import { Suspense } from 'react';
import ProfileInfo from './ProfileInfo';
import styles from './styles.module.scss';
import { ProfileInfoSkeleton } from './skeletons';

export default async function page({ params: { id } }: { params: { id: string } })  {
    return (
        <div className={styles.Profile}>
            <Suspense fallback={<ProfileInfoSkeleton/>}>
                <ProfileInfo id = {id}/>
            </Suspense>
        </div>
    )
}
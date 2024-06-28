import { Skeleton } from "@/components/ui/skeleton";
import styles from './loading.module.scss';

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className="flex w-full h-full items-center justify-center">
            <div className={styles.circleLoader}></div>
            {/* <div className={styles.loader}>
                <span className={'loader-text'}>loading</span>
                <span className={'load'}></span>
            </div> */}
            {/* <div className="w-full h-full flex flex-col gap-4">
                <div
                    className="w-full flex items-center justify-around"
                    style={{
                        gap: '10%'
                    }}
                >
                    <Skeleton
                        className="bg-gray-200"
                        style={{
                            maxWidth: '30rem',
                            width: '100%',
                            height: '6rem'
                        }}
                    />

                    <Skeleton
                        className="bg-gray-200"
                        style={{
                            maxWidth: '30rem',
                            width: '100%',
                            height: '6rem'
                        }}
                    />
                </div>

                <div className="h-full flex flex-col gap-4 h-100 items-end justify-center">
                    <div className="h-8 w-full flex gap-16 justify-between">
                        <Skeleton
                            className="bg-gray-200"
                            style={{
                                width: '100%',
                                height: '2rem'
                            }}
                        />

                        <Skeleton
                            className="bg-gray-200"
                            style={{
                                width: '100%',
                                height: '2rem'
                            }}
                        />
                    </div>

                    <div className="h-8 w-full flex gap-16 justify-between">
                        <Skeleton
                            className="bg-gray-200"
                            style={{
                                width: '100%',
                                height: '100%'
                            }}
                        />

                        <Skeleton
                            className="bg-gray-200"
                            style={{
                                width: '100%',
                                height: '100%'
                            }}
                        />
                    </div>

                    <Skeleton
                        className="bg-gray-200"
                        style={{
                            width: '100%',
                            height: '2rem'
                        }}
                    />

                    <Skeleton
                        className="bg-gray-200"
                        style={{
                            width: '100%',
                            height: '6rem'
                        }}
                    />
                </div>
            </div> */}
        </div>
    );
}
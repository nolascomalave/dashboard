import { Skeleton } from "@/components/ui/skeleton";

export function ProfileInfoSkeleton() {
    return (
        <div className="flex flex-col gap-4 w-[16.873rem]">
            <Skeleton className="w-full bg-gray-200 m-auto p-[0.06125rem]">
                <div className="bg-fond">
                    <div className="p-3">
                        <Skeleton className="h-16 w-16 rounded-full bg-gray-200 m-auto" />
                        <Skeleton className="h-6 w-[7rem] bg-gray-200 m-auto mt-4" />
                        <Skeleton className="h-4 w-20 bg-gray-200 m-auto mt-2" />

                        <div className="flex gap-4 m-6 justify-center">
                            <div className="flex">
                                <Skeleton className="h-6 w-6 rounded-full bg-gray-200 m-auto" />
                            </div>
                            <div className="flex">
                                <Skeleton className="h-6 w-6 rounded-full bg-gray-200 m-auto" />
                            </div>
                            <div className="flex">
                                <Skeleton className="h-6 w-6 rounded-full bg-gray-200 m-auto" />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center w-full">
                        <div className="flex justify-center w-full">
                            <Skeleton className="h-4 w-16 bg-gray-200 m-auto mt-2" />
                        </div>

                        <div className="flex">
                            <Skeleton className="h-10 w-[0.06125rem] bg-gray-200 m-auto mt-2" />
                        </div>

                        <div className="flex justify-center w-full">
                            <Skeleton className="h-4 w-16 bg-gray-200 m-auto mt-2" />
                        </div>
                    </div>
                </div>
            </Skeleton>

            <Skeleton className="w-full bg-gray-200 m-auto p-[0.06125rem]">
                <div className="bg-fond p-3">
                    <Skeleton className="h-5 w-[9rem] bg-gray-200 mt-4" />
                    <Skeleton className="h-4 w-[12rem] ml-4 bg-gray-200 mt-2 opacity-70" />
                    <Skeleton className="h-4 w-[6rem] ml-4 bg-gray-200 mt-2 opacity-70" />
                    <Skeleton className="h-4 w-[9rem] ml-4 bg-gray-200 mt-2 opacity-70" />
                    <Skeleton className="h-5 w-[9rem] bg-gray-200 mt-4" />
                    <Skeleton className="h-4 w-[12rem] ml-4 bg-gray-200 mt-2 opacity-70" />
                    <Skeleton className="h-4 w-[6rem] ml-4 bg-gray-200 mt-2 opacity-70" />
                    <Skeleton className="h-4 w-[9rem] ml-4 bg-gray-200 mt-2 opacity-70" />
                </div>
            </Skeleton>
        </div>
    )
}

export function QuotationsSkeleton() {
    return (
        <div className="h-full w-full">
            <Skeleton className="w-full flex flex-col bg-gray-200 m-auto p-[0.06125rem]">
                <div className="bg-fond w-full flex-shrink-0">
                    <div className="p-3 ps-4">
                        <Skeleton className="h-6 w-[10rem] bg-gray-200" />
                    </div>
                    <Skeleton className="h-[0.06125rem] w-full bg-gray-200" />
                </div>
                <div className="bg-fond">
                    <Skeleton className="pb-[0.06125rem] w-full bg-gray-200">
                        <div className="bg-fond h-full p-3">
                            <Skeleton className="h-4 w-[50%] bg-gray-200" />
                        </div>
                    </Skeleton>
                    <Skeleton className="pb-[0.06125rem] w-full bg-gray-200">
                        <div className="bg-fond h-full p-3">
                            <Skeleton className="h-4 w-[75%] bg-gray-200" />
                        </div>
                    </Skeleton>
                    <Skeleton className="pb-[0.06125rem] w-full bg-gray-200">
                        <div className="bg-fond h-full p-3">
                            <Skeleton className="h-4 w-[60%] bg-gray-200" />
                        </div>
                    </Skeleton>
                    <Skeleton className="pb-[0.06125rem] w-full bg-gray-200">
                        <div className="bg-fond h-full p-3">
                            <Skeleton className="h-4 w-[37%] bg-gray-200" />
                        </div>
                    </Skeleton>
                    <Skeleton className="pb-[0.06125rem] w-full bg-gray-200">
                        <div className="bg-fond h-full p-3">
                            <Skeleton className="h-4 w-[49%] bg-gray-200" />
                        </div>
                    </Skeleton>
                    <div className="pb-[0.06125rem] w-full">
                        <div className="bg-fond h-full p-3">
                            <Skeleton className="h-4 w-[50%] bg-gray-200" />
                        </div>
                    </div>
                </div>
            </Skeleton>
        </div>
    );
}
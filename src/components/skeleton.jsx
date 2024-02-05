import React from "react";
import { Card, Skeleton } from "@nextui-org/react";

export default function PostSkeleton({ count }) {
    return (
        <>
            <div className="flex flex-col gap-3">
                {
                    [...new Array(count)].map((_, index) => {
                        return <Card className="space-y-5 p-4" radius="lg" key={index + Math.random()}>
                            <div className="flex items-start w-full gap-4">
                                <Skeleton className="w-10 rounded-full flex-0">
                                    <div className="h-10 w-10 rounded-full bg-default-200"></div>
                                </Skeleton>

                                <div className="flex flex-col w-full flex-1 gap-3">
                                    {/* post auther info  */}
                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex flex-col gap-1">
                                            <Skeleton className="w-[8rem] rounded-lg">
                                                <div className="h-3 w-fit rounded-lg bg-default-200"></div>
                                            </Skeleton>
                                            <Skeleton className="w-[6rem] rounded-lg">
                                                <div className="h-2 w-fit rounded-lg bg-default-200"></div>
                                            </Skeleton>
                                        </div>
                                        <div>
                                            <Skeleton className="w-8 rounded-full">
                                                <div className="h-8 w-8 rounded-full bg-default-200"></div>
                                            </Skeleton>
                                        </div>
                                    </div>

                                    {/* post text */}
                                    <div className="space-y-3">
                                        <Skeleton className="w-3/5 rounded-lg">
                                            <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                                        </Skeleton>
                                        <Skeleton className="w-4/5 rounded-lg">
                                            <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                                        </Skeleton>
                                        <Skeleton className="w-2/5 rounded-lg">
                                            <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                                        </Skeleton>
                                    </div>

                                    {/* post image  */}
                                    <Skeleton className="rounded-lg">
                                        <div className="h-[18rem] rounded-lg bg-default-300"></div>
                                    </Skeleton>
                                </div>
                            </div>
                        </Card>
                    })
                }
            </div>

        </>

    );
}

"use client";
import NotificationCard from "@/componentUtils/NotificationCard";
import { Card, CardContent } from "@/components/ui/card";
import { NotificationData } from "@/types/product-types";
import { useState } from "react";

import Echo from "@ably/laravel-echo";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import useAbly from "@/app/custom-hooks/useAbly";


export default function Notifications({
    initialNotifications
}: {
    initialNotifications: NotificationData[];
}) {
    const [notifications, setNotifications] =
        useState<NotificationData[]>(initialNotifications);
    useAbly(executor, cleaner);
    function cleaner(echo: Echo) {
        console.log("We are leaving ");
        echo.leaveChannel("private:notifications.1");
    }
    function executor(echo: Echo) {
        echo
            .private("notifications.1")
            .listen(
                ".orders.update",
                function (newNotifData: { data: NotificationData; socket: null }) {
                    console.log(newNotifData.data);
                    setNotifications((oldNotifications) => [
                        newNotifData.data,
                        ...oldNotifications,
                    ]);
                },
            );
    }
    return (
        <Card className="col-span-2 bg-[#F8FAFC] hidden border-none lg:block lg:col-span-3 overflow-auto">
            <div className="p-4">   {/* wrapper needed; CardContent grows too much */}
                <h1 className="text-start text-lg text-[#0F172A] font-semibold">
                    Notifications
                </h1>
                <div className="flex flex-col space-y-4">
                    {notifications?.map((notif: NotificationData) => (
                        <NotificationCard key={notif.id} notification={notif} />
                    ))}
                </div>
            </div>
        </Card>
    )
}

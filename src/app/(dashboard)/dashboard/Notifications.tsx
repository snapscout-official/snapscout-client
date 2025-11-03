"use client";
import NotificationCard from "@/componentUtils/NotificationCard";
import { Card, CardContent } from "@/components/ui/card";
import { Notification } from "@/types/product-types";
import { useState } from "react";

import Echo from "@ably/laravel-echo";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import useAbly from "@/app/custom-hooks/useAbly";

export default function Notifications({
    initialNotifications,
}: {
    initialNotifications: Notification[];
}) {
    const [notifications, setNotifications] =
        useState<Notification[]>(initialNotifications);
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
                function (newNotifData: { data: Notification; socket: null }) {
                    console.log(newNotifData.data);
                    setNotifications((oldNotifications) => [
                        newNotifData.data,
                        ...oldNotifications,
                    ]);
                },
            );
    }

    return (
        <Card className="col-span-2 h-full min-h-full bg-[#F8FAFC] max-h-full hidden border-none xl:block xl:col-span-3 ">
            <ScrollArea className="max-h-full">
                <CardContent className="flex flex-col pt-4 space-y-4">
                    <h1 className="text-start text-lg text-[#0F172A] font-semibold">
                        Notifications
                    </h1>
                    {notifications ? notifications.map((notif: Notification) => (
                        <NotificationCard type="email" key={notif.id} notif={notif} />
                    )) : null}
                </CardContent>
                <ScrollBar orientation="vertical" className="h-full" />
            </ScrollArea>
        </Card>
    );
}

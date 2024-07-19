"use client";
import NotificationCard from "@/componentUtils/NotificationCard";
import { Card, CardContent } from "@/components/ui/card";
import { Notification } from "@/types/product-types";
import { useState } from "react";

import { useEcho } from "@/app/custom-hooks/useEcho";
import Echo from "laravel-echo";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function Notifications({
  initialNotifications,
}: {
  initialNotifications: Notification[];
}) {
  useEcho(executor, cleaner);
  function cleaner(echo: Echo) {
    console.log("We are leaving ");
    echo.leave("notifications.1");
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
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);
  return (
    <ScrollArea className="col-span-2 h-full min-h-[700px] max-h-[700px] hidden border-none xl:block xl:col-span-3">
      <Card className="bg-[#F8FAFC]">
        <CardContent className="flex flex-col pt-2 space-y-4">
          <h1 className="text-start text-md text-[#0F172A] font-semibold">
            Notifications
          </h1>
          {notifications.map((notif: Notification) => (
            <NotificationCard type="email" key={notif.id} notif={notif} />
          ))}
        </CardContent>
      </Card>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
}

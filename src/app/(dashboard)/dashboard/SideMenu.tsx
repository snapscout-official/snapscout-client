import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import NotificationCard from "@/componentUtils/NotificationCard";
export default function SideMenu() {
  return (
    <Card className="col-span-2 overflow-auto bg-[#F8FAFC] h-full max-h-[700px] min-h-full hidden border-none xl:block xl:col-span-3">
      <CardContent className="flex flex-col pt-2 space-y-4">
        <h1 className="text-start text-md text-[#0F172A] font-semibold">
          Notifications
        </h1>
        <NotificationCard type="email" />
        <NotificationCard type="message" />
        <NotificationCard type="email" />
        <NotificationCard type="message" />
        <NotificationCard type="email" />
        <NotificationCard type="message" />
        <NotificationCard type="email" />
        <NotificationCard type="message" />
        <NotificationCard type="email" />
      </CardContent>
    </Card>
  );
}

import React from "react";
import { fetchWithToken } from "@/services/fetchService";
import Notifications from "./Notifications";
import { NotificationData } from "@/types/product-types";
export default async function SideMenu() {
    const result = await fetchWithToken({
        url: `${process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL}/api/v1/notifications`,
        method: "GET",
    });
    const fetchData = await result.json();
    const notifications: NotificationData[] = fetchData.notifications

    return <Notifications initialNotifications={notifications} />;
}

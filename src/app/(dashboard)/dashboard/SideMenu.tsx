import React from "react";
import { fetchWithToken } from "@/services/fetchService";
import Notifications from "./Notifications";
import { Notification } from "@/types/product-types";
export default async function SideMenu() {
    const result = await fetchWithToken({
        url: `${process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL}/api/v1/notifications`,
        method: "GET",
    });
    const fetchData = await result.json();
    const dummyNotifications: Notification[] = [{
        id: "1",
        notification_data: { order_id: "1" },
        notification_type: "",
        description: "Enter your email address Here",
        sender: 2,
        receiver: 3,
        opened: false,
        created_at: new Date(Date.now()).getFullYear().toLocaleString(),
        updated_at: new Date(Date.now()).getFullYear().toLocaleString(),
        data: {
            order_id: "1",
            merchant_name: "Mary Soliva",
            agency_id: 1,
            merchant_id: 2,
            status: "pending",
            order_items: null,
        }
    },
    {
        id: "2",
        notification_data: { order_id: "1" },
        notification_type: "",
        description: "Enter your email address Here",
        sender: 2,
        receiver: 3,
        opened: false,
        created_at: new Date(Date.now()).getFullYear().toLocaleString(),
        updated_at: new Date(Date.now()).getFullYear().toLocaleString(),
        data: {
            order_id: "1",
            merchant_name: "Mary Soliva",
            agency_id: 1,
            merchant_id: 2,
            status: "pending",
            order_items: null,
        }
    },
    {
        id: "3",
        notification_data: { order_id: "1" },
        notification_type: "",
        description: "Enter your email address Here",
        sender: 2,
        receiver: 3,
        opened: false,
        created_at: new Date(Date.now()).getFullYear().toLocaleString(),
        updated_at: new Date(Date.now()).getFullYear().toLocaleString(),
        data: {
            order_id: "1",
            merchant_name: "Mary Soliva",
            agency_id: 1,
            merchant_id: 2,
            status: "pending",
            order_items: null,
        }
    },
    ]


    return <Notifications initialNotifications={dummyNotifications} />;
}

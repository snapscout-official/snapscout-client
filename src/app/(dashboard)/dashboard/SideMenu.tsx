import React from "react";
import { fetchWithToken } from "@/services/fetchService";
import Notifications from "./Notifications";
export default async function SideMenu() {
  const result = await fetchWithToken({
    url: `${process.env.BACKEND_SERVICE_URL}/api/v1/notifications`,
    method: "GET",
  });
  const fetchData = await result.json();
  return <Notifications initialNotifications={fetchData.notifications} />;
}

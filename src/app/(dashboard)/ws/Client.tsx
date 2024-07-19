"use client";

import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { useEffect } from "react";
interface ClientComponentProp {
  apiToken: string;
}
export default function Client({ apiToken }: ClientComponentProp) {
  useEffect(() => {
    window.Pusher = Pusher;
    //lets test how to make echo instance global first
    window.Echo = new Echo({
      broadcaster: "pusher",
      key: process.env.NEXT_PUBLIC_ABLY_PUBLIC_KEY,
      wsHost: "realtime-pusher.ably.io",
      wsPort: 443,
      cluster: "NaN",
      disableStats: true,
      encrypted: true,
      authEndpoint: `${process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL}/broadcasting/auth`,
      auth: {
        headers: {
          Authorization: `Bearer ${apiToken}`,
          Accept: "application/json",
        },
      },
    });

    window.Echo.private("notifications.1").subscribed(() => {
      console.log("we have subscribed/connected to the private channel");
    });

    return () => {
      console.log("leaving the public community channel");
      window.Echo.leaveChannel("pubs");
    };
  }, []);
  return <div>Client Component for WS</div>;
}

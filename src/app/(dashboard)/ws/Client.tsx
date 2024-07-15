"use client";

import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { useEffect } from "react";
//sets a global echo instance into the window
export default function Client() {
  useEffect(() => {
    window.Echo = new Echo({
      broadcaster: "pusher",
      wsHost: "realtime-pusher.ably.io",
      client: new Pusher(`${process.env.NEXT_PUBLIC_ABLY_PUBLIC_KEY}`, {
        cluster: "Nan",
        wsPort: 443,
        wsHost: "realtime-pusher.ably.io",
        disableStats: true,
      }),

      disableStats: true,
      encrypted: true,
    });
    window.Echo.channel("public.community")
      .subscribed(() => {
        console.log("we have subscribed/connected to the channel");
      })
      .listen("PublicMessageEvent", function (e: any) {
        console.log(e);
      });
    return () => {
      console.log("leaving the public community channel");
      window.Echo.leaveChannel("public.community");
    };
  });
  return <div>Client Component for WS</div>;
}

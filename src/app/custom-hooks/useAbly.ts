import * as Ably from "ably";
import Echo from "@ably/laravel-echo";
import { useMySession } from "./sessionContext";
import axios from "axios";
import { useEffect, useState } from "react";
export default function useAbly(
  executor: (echo: Echo) => void,
  cleaner: (echo: Echo) => void,
) {
  const [echoInstance, setEchoInstance] = useState<Echo>();
  const { token } = useMySession();
  useEffect(() => {
    const echo = bootEcho(token);
    setEchoInstance(echo);
    executor(echo);
    return () => {
      cleaner(echo);
    };
  }, []);
  function bootEcho(token: string): Echo {
    window.Ably = Ably;
    const echo = new Echo({
      broadcaster: "ably",
      requestTokenFn: async (channelName: string, existingToken: string) => {
        let postData = {
          channel_name: channelName,
          "ably-token": existingToken,
          token: token,
        };
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL}/broadcasting/auth`,
          postData,
        );
        return res.data;
      },
    });

    return echo;
  }
  return echoInstance;
}

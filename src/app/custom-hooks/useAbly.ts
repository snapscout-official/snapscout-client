import * as Ably from "ably";
import Echo from "@ably/laravel-echo";
import { useMySession } from "./sessionContext";
import axios from "axios";
import { useEffect, useState } from "react";
export default function useAbly(
  executor: (echo: Echo) => void,
  cleaner: (echo: Echo) => void,
) {
  const [echo, setEcho] = useState<Echo>();

  const { token } = useMySession();
  useEffect(() => {
    if (!window.Echo) {
      console.log("creating an echo instance");
      bootEcho(token);
    }
    const echo: Echo = window.Echo;
    setEcho(echo);
    //executor will register the listen callback and what channel to listen
    executor(echo);
    return () => {
      cleaner(echo);
    };
  }, []);
  function bootEcho(token: string) {
    window.Ably = Ably;
    window.Echo = new Echo({
      broadcaster: "ably",
      // authEndpoint: `${process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL}/api/v1/broadcasting/auth`,
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
  }
  return [echo];
}

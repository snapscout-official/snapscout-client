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
    const { token, user } = useMySession();
    const [error, setError] = useState<string>()
    // if (!sessionData.token || !sessionData.user)
    //     console.log("No token or user")


    useEffect(() => {
        window.Ably = Ably;
        if (token) {
            const echo = bootEcho(token);
            console.log("Done booting echo");
            setEchoInstance(echo);
            executor(echo);
            return () => {
                cleaner(echo);
            };
        } else {
            setError("No user token found")
        }
    }, []);

    function bootEcho(token: string): Echo {
        const echo = new Echo({
            broadcaster: "ably",
            requestTokenFn: async (channelName: string, existingToken: string) => {
                let postData = {
                    channel_name: channelName,
                    'ably-token': existingToken,
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

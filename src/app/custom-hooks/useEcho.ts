import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import Echo from "laravel-echo";
import { useMySession } from "./sessionContext";

//change to subscribe toa different kind of channel
// export function useEcho(
//   executor: (echo: Echo) => void,
//   cleaner: (echo: Echo) => void,
// ) {
//   const [echo, setEcho] = useState<Echo>();
//   const { token } = useMySession();
//   useEffect(() => {
//     if (!window.Echo) {
//       bootEcho(token);
//     }
//     const echo: Echo = window.Echo;
//     setEcho(echo);
//     //executor will register the listen callback and what channel to listen
//     executor(echo);
//     return () => {
//       cleaner(echo);
//     };
//   });
//   function bootEcho(token: string) {
//     const pusher = Pusher;
//
//     window.Echo = new Echo({
//       broadcaster: "pusher",
//       key: process.env.NEXT_PUBLIC_ABLY_PUBLIC_KEY,
//       wsHost: "realtime-pusher.ably.io",
//       wsPort: 443,
//       cluster: "NaN",
//       disableStats: true,
//       encrypted: true,
//       authEndpoint: `${process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL}/broadcasting/auth`,
//       auth: {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//       },
//     });
//   }
//   return [echo];
// }

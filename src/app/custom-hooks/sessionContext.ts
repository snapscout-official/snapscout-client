import { Session } from "next-auth";
import { createContext, useContext } from "react";

export const SessionContext = createContext<Session | null>(null);

export function useMySession() {
  const sessionData = useContext(SessionContext);
  if (sessionData) {
    return { token: sessionData.apiToken };
  }
}

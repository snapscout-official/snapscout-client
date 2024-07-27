import { Session } from "next-auth";
import { createContext, useContext } from "react";

export const SessionContext = createContext<Session | null>(null);
type MySessionType = {
  token: string | null;
};
export function useMySession(): MySessionType {
  const sessionData = useContext(SessionContext);
  if (sessionData) {
    return { token: sessionData.apiToken };
  }
  throw new Error("You are not authenticated");
}

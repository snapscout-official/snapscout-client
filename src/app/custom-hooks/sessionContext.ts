import { MyUser } from "@/types/auth-types";
import { Session, User } from "next-auth";
import { createContext, useContext } from "react";

type MySessionType = {
  token: string | null;
  user: MyUser & User;
};
export const SessionContext = createContext<Session | null>(null);
export function useMySession(): MySessionType {
  const sessionData = useContext(SessionContext);
  if (sessionData && sessionData.user) {
    return { token: sessionData.apiToken, user: sessionData.user };
  }
  throw new Error("You are not authenticated");
}

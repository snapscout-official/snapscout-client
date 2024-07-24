"use client";
import { SessionContext } from "@/app/custom-hooks/sessionContext";
import { Session } from "next-auth";
type SessionContextProviderProps = {
  children: React.ReactNode;
  value: Session | null;
};
export default function SessionContextProvider({
  children,
  value,
}: SessionContextProviderProps) {
  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

import { createContext, useContext } from "react";

type MySessionType = {
    token: string | null;
    user: MyUser | null;
};
export const SessionContext = createContext<Session | null>(null);

export function useMySession(): MySessionType {
    const sessionData = useContext(SessionContext);

    if (sessionData && sessionData.user && sessionData.apiToken) {
        return { token: sessionData.apiToken, user: sessionData.user };
    }

    return { token: null, user: null };
}

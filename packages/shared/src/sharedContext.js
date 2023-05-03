import { createContext, useContext } from "react";

export const SharedContext = createContext("");

export function useSharedContext() {
    const value = useContext(SharedContext);

    return value;
}
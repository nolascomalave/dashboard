import { CompleteEntityUser } from "@/assets/types/users";
import create from "zustand";

interface ProcessedCompleteEntityUserState {
    User: CompleteEntityUser | null;
    setUser: (user: CompleteEntityUser | null) => void;
    // getSubscription: () => string;
}

export const useProcessedCompleteEntityUser = create<ProcessedCompleteEntityUserState>(set => ({
    User: null,
    setUser: (user: CompleteEntityUser | null) => {
        set((state) => ({...state, User: !user ? null : {...(state.User ?? {}), ...user}}));
    },
    // getSubscription: () => {}
}));
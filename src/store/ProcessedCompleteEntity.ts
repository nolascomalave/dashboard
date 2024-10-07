import { CompleteEntityUser } from "@/assets/types/users";
import create from "zustand";

interface ProcessedCompleteEntityState {
    User: CompleteEntityUser | null;
    setUser: (user: CompleteEntityUser | null) => void;
    // getSubscription: () => string;
}

export const useProcessedCompleteEntity = create<ProcessedCompleteEntityState>(set => ({
    User: null,
    setUser: (user: CompleteEntityUser | null) => {
        set((state) => ({...state, User: !user ? null : {...(state.User ?? {}), ...user}}));
    },
    // getSubscription: () => {}
}));
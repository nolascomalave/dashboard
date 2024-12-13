import { CompleteEntity } from "@/assets/types/entity";
import create from "zustand";

interface ProcessedEntityState {
    Entity: CompleteEntity | null;
    set: (user: CompleteEntity | null) => void;
    // getSubscription: () => string;
}

export const useProcessedCompleteEntity = create<ProcessedEntityState>(set => ({
    Entity: null,
    set: (entity: CompleteEntity | null) => {
        set((state) => ({...state, Entity: !entity ? null : {...(state.Entity ?? {}), ...entity}}));
    },
    // getSubscription: () => {}
}));
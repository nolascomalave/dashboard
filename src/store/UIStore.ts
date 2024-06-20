import create from "zustand";

export interface Sidebar {
    isContracted: boolean;
}

interface UIState {
    sidebar: Sidebar;
    setSidebar: (vars: {isContracted: boolean}) => void
}

export const useCounterStore = create<UIState>((set, get) => ({
    sidebar: {
        isContracted: false
    },
    setSidebar: (vars) => {
        set((state) => ({...state, sidebar: { ...state.sidebar, ...vars }}));
    }
}));
import { create } from 'zustand';

interface UseCartPanel {
    isCartPanelOpen: boolean,
    toggleIsCartPanelOpen: () => void,
    openCartPanel: () => void,
    closeCartPanel: () => void,
}

export const useCartPanel = create<UseCartPanel>((set) => ({
    isCartPanelOpen: false,
    toggleIsCartPanelOpen: () => set((state) => ({isCartPanelOpen: !state.isCartPanelOpen})),
    openCartPanel: () => set(() => ({isCartPanelOpen: true})),
    closeCartPanel: () => set(() => ({isCartPanelOpen: false})),
}))
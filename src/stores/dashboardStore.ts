import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PanelSize {
  sidebar: number;
  rightPanel: number;
}

interface DashboardLayoutState {
  sidebarCollapsed: boolean;
  rightPanelCollapsed: boolean;
  panelSizes: PanelSize;
  toggleSidebar: () => void;
  toggleRightPanel: () => void;
  setPanelSize: (panel: keyof PanelSize, size: number) => void;
  reset: () => void;
}

const initialState = {
  sidebarCollapsed: false,
  rightPanelCollapsed: false,
  panelSizes: {
    sidebar: 250,
    rightPanel: 300,
  },
};

export const useLayoutStore = create<DashboardLayoutState>()(
  persist(
    set => ({
      ...initialState,
      reset: () => set(initialState),
      toggleSidebar: () =>
        set(state => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      toggleRightPanel: () =>
        set(state => ({ rightPanelCollapsed: !state.rightPanelCollapsed })),
      setPanelSize: (panel, size) =>
        set(state => ({
          panelSizes: {
            ...state.panelSizes,
            [panel]: size,
          },
        })),
    }),
    {
      name: 'dashboard-layout-storage',
    }
  )
);

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IExplorer } from '@/components/HierarchicalTree/types';
import {
  insertNode,
  deleteNode,
  renameNode,
  moveNode,
} from '@/components/HierarchicalTree/useTraverseTree';
import { initialExplorer } from '@/components/HierarchicalTree/mockData';

interface ExplorerStore {
  explorer: IExplorer;
  moveNode: (draggedId: string, targetId: string) => void;
  insertNode: (folderId: string, name: string, isFolder: boolean) => void;
  deleteNode: (nodeId: string) => void;
  renameNode: (nodeId: string, newName: string) => void;
  loadChildren: (folderId: string) => void;
  resetExplorer: () => void;
}

export const treeStore = create<ExplorerStore>()(
  persist(
    (set, get) => ({
      explorer: initialExplorer,

      moveNode: (draggedId: string, targetId: string) => {
        set(state => ({
          explorer: moveNode(
            structuredClone(state.explorer),
            draggedId,
            targetId
          ),
        }));
      },

      insertNode: (folderId: string, name: string, isFolder: boolean) =>
        set(state => ({
          explorer: insertNode(
            structuredClone(state.explorer),
            folderId,
            name,
            isFolder
          ),
        })),

      deleteNode: (nodeId: string) =>
        set(state => ({
          explorer: deleteNode(structuredClone(state.explorer), nodeId),
        })),

      renameNode: (nodeId: string, newName: string) =>
        set(state => ({
          explorer: renameNode(
            structuredClone(state.explorer),
            nodeId,
            newName
          ),
        })),

      loadChildren: (folderId: string) => {
        const setLoading = (node: IExplorer): IExplorer => {
          if (node.id === folderId) {
            return { ...node, loading: true };
          }
          return {
            ...node,
            items: node.items.map(setLoading),
          };
        };

        const setLoaded = (node: IExplorer): IExplorer => {
          if (node.id === folderId) {
            return { ...node, loading: false, loaded: true };
          }
          return {
            ...node,
            items: node.items.map(setLoaded),
          };
        };

        const current = get().explorer;
        set({ explorer: setLoading(structuredClone(current)) });

        setTimeout(() => {
          set({ explorer: setLoaded(structuredClone(get().explorer)) });
        }, 1000);
      },

      resetExplorer: () => set({ explorer: initialExplorer }),
    }),
    {
      name: 'file-explorer-storage',
    }
  )
);

import { IExplorer } from './types';

export const insertNode = (
  tree: IExplorer,
  folderId: string,
  name: string,
  isFolder: boolean
): IExplorer => {
  if (tree.id === folderId && tree.isFolder) {
    return {
      ...tree,
      items: [
        {
          id: Date.now().toString(),
          name,
          isFolder,
          items: [],
        },
        ...tree.items,
      ],
    };
  }

  return {
    ...tree,
    items: tree.items.map(item => insertNode(item, folderId, name, isFolder)),
  };
};

export const deleteNode = (tree: IExplorer, nodeId: string): IExplorer => {
  const filteredItems = tree.items
    .map(item => deleteNode(item, nodeId))
    .filter(item => item.id !== nodeId);

  return { ...tree, items: filteredItems };
};

export const renameNode = (
  tree: IExplorer,
  nodeId: string,
  newName: string
): IExplorer => {
  if (tree.id === nodeId) {
    return { ...tree, name: newName };
  }

  return {
    ...tree,
    items: tree.items.map(item => renameNode(item, nodeId, newName)),
  };
};

export const moveNode = (
  tree: IExplorer,
  draggedId: string,
  targetId: string
): IExplorer => {
  const findNode = (currentTree: IExplorer, id: string): IExplorer | null => {
    if (currentTree.id === id) return currentTree;
    for (const item of currentTree.items) {
      const found = findNode(item, id);
      if (found) return found;
    }
    return null;
  };

  const isDescendant = (parent: IExplorer, childId: string): boolean => {
    if (parent.id === childId) return true;
    return parent.items.some(item => isDescendant(item, childId));
  };

  const insertNodeInTree = (
    tree: IExplorer,
    targetId: string,
    nodeToInsert: IExplorer
  ): IExplorer => {
    if (tree.id === targetId && tree.isFolder) {
      return {
        ...tree,
        items: [nodeToInsert, ...tree.items],
      };
    }

    return {
      ...tree,
      items: tree.items.map(item =>
        insertNodeInTree(item, targetId, nodeToInsert)
      ),
    };
  };

  if (draggedId === targetId) return tree;

  const draggedNode = findNode(tree, draggedId);
  const targetNode = findNode(tree, targetId);

  if (!draggedNode || !targetNode || !targetNode.isFolder) return tree;

  if (draggedNode.isFolder && isDescendant(draggedNode, targetId)) {
    return tree;
  }

  const treeWithoutDragged = deleteNode(tree, draggedId);
  const newTree = insertNodeInTree(treeWithoutDragged, targetId, draggedNode);

  return newTree;
};

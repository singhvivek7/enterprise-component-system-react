import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { TrashIcon } from 'lucide-react';
import { treeStore } from '@/stores/treeStore';
import { IExplorer } from './types';

interface HierarchicalTreeProps {
  explorer: IExplorer;
}

const HierarchicalTree = ({ explorer }: HierarchicalTreeProps) => {
  const [expand, setExpand] = useState<boolean>(false);
  const [showInput, setShowInput] = useState<{
    visible: boolean;
    isFolder: boolean;
  }>({
    visible: false,
    isFolder: false,
  });
  const [showRenameInput, setShowRenameInput] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>(explorer.name);
  const [dragOver, setDragOver] = useState<boolean>(false);

  const { insertNode, deleteNode, renameNode, moveNode, loadChildren } =
    treeStore();

  const handleNewFolder = (
    e: React.MouseEvent<HTMLButtonElement>,
    isFolder: boolean
  ): void => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };

  const onAddFolder = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    const target = e.target as HTMLInputElement;
    if (e.key === 'Enter' && target.value.trim()) {
      insertNode(explorer.id, target.value.trim(), showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  const handleRename = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    const target = e.target as HTMLInputElement;
    if (e.key === 'Enter' && target.value.trim()) {
      renameNode(explorer.id, target.value.trim());
      setShowRenameInput(false);
    }
  };

  const handleDelete = (e: React.MouseEvent): void => {
    e.stopPropagation();
    deleteNode(explorer.id);
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>): void => {
    e.dataTransfer.setData('text/plain', explorer.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (explorer.isFolder && !expand) {
      setExpand(true);
    }
    setDragOver(true);
  };

  const handleDragLeave = (): void => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData('text/plain');
    if (draggedId !== explorer.id && explorer.isFolder) {
      moveNode(draggedId, explorer.id);
    }
    setDragOver(false);
  };

  const folderIcon = '📁';
  const fileIcon = '📄';

  const handleToggleExpand = () => {
    if (!explorer.loaded && !explorer.loading && explorer.isFolder) {
      loadChildren(explorer.id); // simulate load
    }
    setExpand(prev => !prev);
  };

  if (explorer.isFolder) {
    return (
      <div className="mt-1 border-l border-gray-200 dark:border-gray-700 pl-2">
        <div
          draggable
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleToggleExpand}
          className={`folder cursor-pointer flex justify-between items-center p-1 rounded transition-colors ${
            dragOver
              ? 'bg-emerald-100 dark:bg-emerald-800'
              : 'hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}>
          {showRenameInput ? (
            <Input
              type="text"
              className="text-sm w-40"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              onKeyDown={handleRename}
              onBlur={() => setShowRenameInput(false)}
              autoFocus
            />
          ) : (
            <span
              className="text-sm flex items-center gap-1"
              onDoubleClick={e => {
                e.stopPropagation();
                setShowRenameInput(true);
              }}>
              {folderIcon} {explorer.name}
              {explorer.loading && (
                <span className="text-xs text-gray-400 ml-2">Loading...</span>
              )}
            </span>
          )}
          <div className="space-x-1 flex">
            <Button
              size="sm"
              variant="outline"
              className="h-7 text-xs"
              onClick={e => handleNewFolder(e, true)}>
              + {folderIcon}
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-7 text-xs"
              onClick={e => handleNewFolder(e, false)}>
              + {fileIcon}
            </Button>
            {explorer.id !== '1' && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="h-7 text-xs"
                    onClick={e => e.stopPropagation()}>
                    <TrashIcon size={5} />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete folder</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete "{explorer.name}" and all
                      its contents?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>

        <div className={`${expand ? 'block' : 'hidden'} pl-4`}>
          {showInput.visible && (
            <div className="flex items-center space-x-2 my-1">
              <span>{showInput.isFolder ? folderIcon : fileIcon}</span>
              <Input
                type="text"
                className="text-sm h-8"
                autoFocus
                onKeyDown={onAddFolder}
                onBlur={() => setShowInput({ ...showInput, visible: false })}
              />
            </div>
          )}

          {explorer.loaded &&
            explorer.items.map(item => (
              <HierarchicalTree key={item.id} explorer={item} />
            ))}
        </div>
      </div>
    );
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="file py-1 pl-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 rounded flex justify-between items-center group">
      <span
        className="flex items-center gap-1"
        onDoubleClick={() => setShowRenameInput(true)}>
        {showRenameInput ? (
          <Input
            type="text"
            className="text-sm w-40"
            value={newName}
            onChange={e => setNewName(e.target.value)}
            onKeyDown={handleRename}
            onBlur={() => setShowRenameInput(false)}
            autoFocus
          />
        ) : (
          <>
            {fileIcon} {explorer.name}
          </>
        )}
      </span>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            size="sm"
            variant="destructive"
            className="h-7 text-xs opacity-0 group-hover:opacity-100 transition-opacity mr-1"
            onClick={e => e.stopPropagation()}>
            <TrashIcon />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete file</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{explorer.name}"?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default HierarchicalTree;

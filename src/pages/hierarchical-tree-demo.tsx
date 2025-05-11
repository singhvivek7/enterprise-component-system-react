import HierarchicalTree from '@/components/HierarchicalTree/HierarchicalTree';
import { Button } from '@/components/ui/button';
import { treeStore } from '@/stores/treeStore';

export const HierarchicalTreeDemo = () => {
  const { explorer, resetExplorer } = treeStore();

  return (
    <section className="p-10 flex justify-center items-center flex-col">
      <h1 className="text-center text-4xl mb-6">4. Hierarchical Tree</h1>
      <div className="p-4 border rounded-lg shadow-sm w-full min-w-md bg-background">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">File Explorer</h2>
          <div className="space-x-2">
            <Button
              className="bg-emerald-600 hover:bg-emerald-500"
              size="sm"
              onClick={resetExplorer}>
              Reset
            </Button>
          </div>
        </div>
        <HierarchicalTree explorer={explorer} />
      </div>
    </section>
  );
};

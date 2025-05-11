import React, { useState } from 'react';
import { Resizable } from 're-resizable';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLayoutStore } from '@/stores/dashboardStore';
import { Button } from '@/components/ui/button';
import { PanelConfig, PANELS } from './panelConfig';

const reorder = <T,>(list: T[], startIndex: number, endIndex: number): T[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const DashboardLayout = () => {
  const {
    sidebarCollapsed,
    rightPanelCollapsed,
    panelSizes,
    toggleSidebar,
    toggleRightPanel,
    setPanelSize,
    reset,
  } = useLayoutStore();

  const [panels, setPanels] = useState<PanelConfig[]>(PANELS);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const reordered = reorder(
      panels,
      result.source.index,
      result.destination.index
    );
    setPanels(reordered);
  };

  return (
    <div className="h-[calc(100dvh-159px)] grid grid-cols-[auto_1fr_auto] grid-rows-[auto_auto_1fr_auto] bg-muted text-sm overflow-x-hidden">
      <header className="col-span-3 py-3 px-5 border-b font-semibold bg-white dark:bg-gray-800">
        Advanced Dashboard
      </header>

      <div className="col-span-3 p-2 border-b bg-background flex justify-between items-center px-5">
        <span className="text-muted-foreground">Home</span>
        <Button
          size="sm"
          className="bg-emerald-600 hover:bg-emerald-500"
          onClick={reset}>
          Reset
        </Button>
      </div>

      <Resizable
        enable={{ right: true }}
        size={{
          width: sidebarCollapsed ? 60 : panelSizes.sidebar,
          height: '100%',
        }}
        onResizeStop={(_, __, ref) => {
          setPanelSize('sidebar', ref.offsetWidth);
        }}
        minWidth={60}
        maxWidth={400}
        className="row-span-2 border-r bg-background transition-all duration-200 ease-in-out">
        <div className="flex flex-col h-full p-2 space-y-2">
          <Button
            variant="ghost"
            onClick={toggleSidebar}
            className="justify-start">
            {sidebarCollapsed ? <ChevronRight /> : <ChevronLeft />}{' '}
            {sidebarCollapsed ? '' : 'Sidebar'}
          </Button>
          {!sidebarCollapsed && (
            <div className="mt-4 space-y-2 pl-5">
              <CollapsibleSection title="Menu Group 1">
                <ul className="space-y-1 pl-4">
                  <li>
                    <a href="#">Item 1</a>
                  </li>
                  <li>
                    <a href="#">Item 2</a>
                  </li>
                </ul>
              </CollapsibleSection>
              <CollapsibleSection title="Menu Group 2">
                <ul className="space-y-1 pl-4">
                  <li>
                    <a href="#">Item A</a>
                  </li>
                  <li>
                    <a href="#">Item B</a>
                  </li>
                </ul>
              </CollapsibleSection>
            </div>
          )}
        </div>
      </Resizable>

      <main className="overflow-auto p-4">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="panels">
            {provided => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {panels.map((panel, index) => (
                  <Draggable
                    key={panel.id}
                    draggableId={panel.id}
                    index={index}>
                    {provided => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-white dark:bg-gray-900 p-4 rounded shadow hover:shadow-md transition-shadow">
                        <h3 className="font-medium mb-2">{panel.title}</h3>
                        <p>{panel.description}</p>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </main>

      {/* Right Panel */}
      <Resizable
        enable={{ left: true }}
        size={{
          width: rightPanelCollapsed ? 0 : panelSizes.rightPanel,
          height: '100%',
        }}
        onResizeStop={(_, __, ref) => {
          setPanelSize('rightPanel', ref.offsetWidth);
        }}
        minWidth={0}
        maxWidth={500}
        className={`row-span-2 border-l bg-background transition-all ${
          rightPanelCollapsed ? 'opacity-0 pointer-events-none' : ''
        }`}>
        <div className="h-full p-3 overflow-y-auto">
          <Button
            variant="ghost"
            onClick={toggleRightPanel}
            className="mb-2 w-full text-left">
            {rightPanelCollapsed ? (
              <span className="flex items-center">
                <ChevronRight size={18} /> Details
              </span>
            ) : (
              <span className="flex items-center">
                <ChevronLeft size={18} />
                Hide Details
              </span>
            )}
          </Button>
          {!rightPanelCollapsed && <div>Right Panel Content</div>}
        </div>
      </Resizable>

      {/* Footer */}
      <footer className="col-span-3 p-3 border-t text-xs text-muted-foreground bg-white dark:bg-gray-800">
        Dashboard Footer © {new Date().getFullYear()}
      </footer>
    </div>
  );
};

const CollapsibleSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="border-b pb-2">
      <button
        className="w-full text-left flex justify-between items-center"
        onClick={() => setIsOpen(prev => !prev)}>
        <span>{title}</span>
        <span>
          {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        </span>
      </button>
      {isOpen && <div className="mt-1">{children}</div>}
    </div>
  );
};

export default DashboardLayout;

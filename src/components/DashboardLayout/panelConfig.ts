export type PanelConfig = {
  id: string;
  title: string;
  description: string;
};

export const PANELS: PanelConfig[] = [
  {
    id: 'panel-1',
    title: 'Revenue Overview',
    description: 'Last 30 days revenue chart',
  },
  {
    id: 'panel-2',
    title: 'User Activity',
    description: 'Recent user activity log',
  },
  {
    id: 'panel-3',
    title: 'Top Products',
    description: 'Best selling products',
  },
  {
    id: 'panel-4',
    title: 'Traffic Sources',
    description: 'Website traffic breakdown',
  },
  {
    id: 'panel-5',
    title: 'Tasks',
    description: 'Upcoming tasks due this week',
  },
  {
    id: 'panel-6',
    title: 'Notifications',
    description: 'Latest alerts and updates',
  },
];

import { IExplorer } from './types';

export const initialExplorer: IExplorer = {
  id: '1',
  name: 'root',
  isFolder: true,
  items: [
    {
      id: '2',
      name: 'public',
      isFolder: true,
      items: [
        {
          id: '3',
          name: 'public nested 1',
          isFolder: true,
          items: [
            {
              id: '4',
              name: 'index.html',
              isFolder: false,
              items: [],
            },
            {
              id: '5',
              name: 'hello.html',
              isFolder: false,
              items: [],
            },
          ],
        },
        {
          id: '6',
          name: 'public_nested_file.ts',
          isFolder: false,
          items: [],
        },
      ],
    },
    {
      id: '7',
      name: 'src',
      isFolder: true,
      items: [
        {
          id: '8',
          name: 'App.tsx',
          isFolder: false,
          items: [],
        },
        {
          id: '9',
          name: 'index.tsx',
          isFolder: false,
          items: [],
        },
        {
          id: '10',
          name: 'index.css',
          isFolder: false,
          items: [],
        },
      ],
    },
    {
      id: '11',
      name: 'package.json',
      isFolder: false,
      items: [],
    },
  ],
};

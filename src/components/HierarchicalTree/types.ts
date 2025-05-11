export interface IExplorer {
  id: string;
  name: string;
  isFolder: boolean;
  items: IExplorer[];
  loaded?: boolean;
  loading?: boolean;
}

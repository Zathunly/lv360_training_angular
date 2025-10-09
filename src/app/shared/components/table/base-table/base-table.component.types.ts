
export interface BaseColumn {
  field: string;
  header: string;
  type?: 'text' | 'number' | 'select' | 'actions' | 'datetime';
  options?: { id: string | number; name: string }[];
}

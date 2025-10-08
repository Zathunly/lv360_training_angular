
export interface BaseColumn {
  field: string;
  header: string;
  type?: 'text' | 'number' | 'select' | 'actions';
  options?: { id: string | number; name: string }[];
}

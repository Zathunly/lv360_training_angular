import { BaseColumn } from '../base-table/base-table.component.types';

export interface EditableTableColumn extends BaseColumn {
  editable?: boolean; 
}

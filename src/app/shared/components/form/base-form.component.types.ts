export interface BaseFormField {
  name: string;
  type: 'text' | 'number' | 'select' | 'textarea';
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  min?: number;
  options?: { value: any; label: string }[];
}

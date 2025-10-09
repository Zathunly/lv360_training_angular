export interface BaseHeaderLink {
  label: string;
  path?: string;
  icon?: string; 
  click?: () => void; 
}
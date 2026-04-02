export type View = 'dashboard' | 'ocr' | 'batch' | 'classification' | 'api' | 'analytics' | 'settings' | 'about';

export interface NavItem {
  id: View;
  label: string;
  icon: string;
}

export interface ProcessingFile {
  id: string;
  name: string;
  size: string;
  progress: number;
  status: 'queued' | 'processing' | 'completed' | 'error';
  result?: any;
}

export interface APIKey {
  id: string;
  name: string;
  key: string;
  createdDate: string;
  status: 'active' | 'revoked';
}

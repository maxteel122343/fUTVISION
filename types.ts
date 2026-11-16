
export interface Exercise {
  id: string;
  name: string;
  category: string;
  description: string;
  placeholderUrl: string;
}

export interface CardState {
  [id: string]: string | null; // Mapping card ID to user-uploaded/edited image URL
}

export enum AppStatus {
  IDLE = 'IDLE',
  UPLOADING = 'UPLOADING',
  EDITING = 'EDITING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

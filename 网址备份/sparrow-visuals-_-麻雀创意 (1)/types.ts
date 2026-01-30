
export interface Project {
  id: string;
  title: string;
  category: string;
  client?: string;
  year: string;
  tagline?: string;
  coverImage: string;
  videoPreview: string;
  fullVideo: string;
  description: string;
  credits: { role: string; name: string }[];
}

export enum CursorType {
  DEFAULT = 'DEFAULT',
  PLAY = 'PLAY',
  VIEW = 'VIEW'
}

export interface CursorState {
  type: CursorType;
  label?: string;
  category?: string;
}

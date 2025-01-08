export type noteType = "TEXT" | "LIST";
export enum NoteType {
  TEXT = "TEXT",
  LIST = "LIST",
}
export interface Note {
  id: number;
  title: string;
  textContent?: string;
  listContent?: string[];
  type: NoteType;
  folderId?: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface NoteFormData {
  title: string;
  type: NoteType;
  textContent?: string;
  listContent?: string[];
  folderId: number;
}

export interface NotesQueryParams {
  folderId?: number;
  keyword?: string;
  page?: number;
}
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}

export interface NoteWithFolder extends Note {
  folder: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };
}

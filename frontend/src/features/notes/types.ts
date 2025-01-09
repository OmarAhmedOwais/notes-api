import { QueryParams } from "../../types";

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

export interface NotesQueryParams extends QueryParams {
  folderId?: number;
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

import { Note, NoteWithFolder } from "../notes/types";

export interface FolderFormData {
    name: string;
  }
  
  export interface Folder extends FolderFormData {
    id: number;
    notes?:Note[];
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
  }
  
  export interface FolderDetails extends Folder {
    notes: NoteWithFolder[];
  }
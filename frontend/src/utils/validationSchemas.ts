import * as Yup from "yup";
import { Note, NoteType } from "../features/notes/notesApi";

export const loginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username too short")
    .required("Username is required"),
  password: Yup.string().min(6).required("Password is required"),
});

export const registerSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username too short")
    .required("Username is required"),
  password: Yup.string().min(6).required("Password is required"),
  email: Yup.string().email().required("Email is required"),
});

export const folderSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Folder name must be at least 3 chars")
    .max(50, "Folder name is too long")
    .required("Folder name is required"),
});

export const noteSchema: Yup.ObjectSchema<Note> = Yup.object({
  id: Yup.number().required("ID is required"),
  title: Yup.string().required("Title is required"),
  type: Yup.mixed<NoteType>()
    .oneOf(Object.values(NoteType))
    .required("Type is required"),
  textContent: Yup.string()
    .when("type", {
      is: NoteType.TEXT,
      then: (schema) =>
        schema.required("Text content is required when type is TEXT"),
      otherwise: (schema) => schema.transform(() => undefined) // Transform to undefined instead of null
    }),
  listContent: Yup.array()
    .of(Yup.string().required("List item cannot be empty"))
    .when("type", {
      is: NoteType.LIST,
      then: (schema) =>
        schema
          .min(1, "At least one list item is required")
          .required("List content is required when type is LIST"),
      otherwise: (schema) => schema.transform(() => [])
    }),
  folderId: Yup.number().required("Folder ID is required")
}).required();

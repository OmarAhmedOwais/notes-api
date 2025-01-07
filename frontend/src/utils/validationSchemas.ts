import * as Yup from 'yup';
import { noteType } from '../features/notes/notesApi';

export const loginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username too short')
    .required('Username is required'),
  password: Yup.string().min(6).required('Password is required'),
});

export const registerSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username too short')
    .required('Username is required'),
  password: Yup.string().min(6).required('Password is required'),
  email: Yup.string().email().required('Email is required'),
});

export const folderSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Folder name must be at least 3 chars')
      .max(50, 'Folder name is too long')
      .required('Folder name is required'),
  });

  export const noteSchema = Yup.object().shape({
    title: Yup.string()
      .min(3, 'Title too short')
      .required('Title is required'),
    content: Yup.string().required('Content is required'),
    type: Yup.string().oneOf(Object.values(noteType)).required('Type is required'),
    folderId: Yup.number().positive().integer().required('Folder ID is required'),
  });
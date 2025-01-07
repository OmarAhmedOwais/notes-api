import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../../app/store';
export enum noteType{
    TEXT = 'TEXT',
    LIST = 'LIST',
}
export interface Note {
  id: number;
  title: string;
  content: string;
  type: noteType;
  folderId?: number;
}

export const notesApi = createApi({
  reducerPath: 'notesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getNotes: builder.query<Note[], { folderId?: number; keyword?: string }>({
      query: ({ folderId, keyword }) => {
        const params = new URLSearchParams();
        if (folderId) params.append('folderId', String(folderId));
        if (keyword) params.append('keyword', keyword);
        return `/notes?${params.toString()}`;
      },
    }),
    createNote: builder.mutation<Note, Partial<Note>>({
      query: (body) => ({
        url: '/notes',
        method: 'POST',
        body,
      }),
    }),
    updateNote: builder.mutation<Note, { id: number; data: Partial<Note> }>({
      query: ({ id, data }) => ({
        url: `/notes/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
    deleteNote: builder.mutation<void, number>({
      query: (id) => ({
        url: `/notes/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetNotesQuery,
  useCreateNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesApi;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../../app/store';
import { Note, NotesQueryParams, NoteWithFolder} from './types';
import { PaginatedResponse } from '../../types';


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
  tagTypes: ['Notes'],
  endpoints: (builder) => ({
    getNotes: builder.query<PaginatedResponse<NoteWithFolder>, NotesQueryParams>({
      query: ({ folderId, keyword, page }) => {
        const params = new URLSearchParams();
        if (folderId) params.append('folderId', String(folderId));
        if (keyword) params.append('keyword', keyword);
        if (page) params.append('page', String(page));
        return `/notes?${params.toString()}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'Notes' as const, id })),
              { type: 'Notes', id: 'PARTIAL-LIST' },
            ]
          : [{ type: 'Notes', id: 'PARTIAL-LIST' }],
    }),
    getNoteById: builder.query<Note, number>({
      query: (id) => `/notes/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Notes', id }],
    }),
    createNote: builder.mutation<Note, Partial<Note>>({
      query: (body) => ({
        url: '/notes',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Notes', id: 'PARTIAL-LIST' }],
    }),
    updateNote: builder.mutation<Note, { id: number; data: Partial<Note> }>({
      query: ({ id, data }) => ({
        url: `/notes/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Notes', id }],
    }),
    deleteNote: builder.mutation<void, number>({
      query: (id) => ({
        url: `/notes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'Notes', id }],
    }),
  }),
});

export const {
  useGetNotesQuery,
  useCreateNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
  useLazyGetNotesQuery,
  useGetNoteByIdQuery,
} = notesApi;
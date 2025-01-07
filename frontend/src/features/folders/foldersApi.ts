import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../../app/store';
import { Note } from '../notes/notesApi';

export interface Folder {
  id: number;
  name: string;
  notes?: Note[]
}

export const foldersApi = createApi({
  reducerPath: 'foldersApi',
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
    getFolders: builder.query<Folder[], void>({
      query: () => '/folders',
    }),
    createFolder: builder.mutation<Folder, Partial<Folder>>({
      query: (body) => ({
        url: '/folders',
        method: 'POST',
        body,
      }),
    }),
    updateFolder: builder.mutation<Folder, { id: number; data: Partial<Folder> }>(
      {
        query: ({ id, data }) => ({
          url: `/folders/${id}`,
          method: 'PATCH',
          body: data,
        }),
      },
    ),
    deleteFolder: builder.mutation<void, number>({
      query: (id) => ({
        url: `/folders/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetFoldersQuery,
  useCreateFolderMutation,
  useUpdateFolderMutation,
  useDeleteFolderMutation,
} = foldersApi;

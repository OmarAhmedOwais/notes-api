import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../../app/store";
import { PaginatedResponse, QueryParams } from "../../types";
import { Folder } from "./types";
import { omit } from "../../utils/omit";

export const foldersApi = createApi({
  reducerPath: "foldersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Folders"],
  endpoints: (builder) => ({
    getFolders: builder.query<PaginatedResponse<Folder>, QueryParams>({
      query: ({ keyword, page }) => {
        const params = new URLSearchParams();
        if (keyword) params.append("keyword", keyword);
        if (page) params.append("page", String(page));
        return `/folders?${params.toString()}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({
                type: "Folders" as const,
                id,
              })),
              { type: "Folders", id: "PARTIAL-LIST" },
            ]
          : [{ type: "Folders", id: "PARTIAL-LIST" }],
    }),
    getFolderById: builder.query<Folder, number>({
      query: (id) => `/folders/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Folders", id }],
    }),
    createFolder: builder.mutation<Folder, Partial<Folder>>({
      query: (body) => ({
        url: "/folders",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Folders", id: "PARTIAL-LIST" }],
    }),
    updateFolder: builder.mutation<
      Folder,
      { id: number; data: Partial<Folder> }
    >({
      query: ({ id, data }) => ({
        url: `/folders/${id}`,
        method: "PATCH",
        body: omit(data,["createdAt","updatedAt","deletedAt","id","notes"]),
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Folders", id }],
    }),
    deleteFolder: builder.mutation<void, number>({
      query: (id) => ({
        url: `/folders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Folders", id }],
    }),
  }),
});

export const {
  useGetFoldersQuery,
  useGetFolderByIdQuery,
  useCreateFolderMutation,
  useUpdateFolderMutation,
  useDeleteFolderMutation,
} = foldersApi;

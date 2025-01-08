import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetNotesQuery, useDeleteNoteMutation } from "../notesApi";
import { NoteWithFolder, PaginatedResponse } from "../types";
import { ApiErrorResponse } from "../../../utils/apiError";

export function useNotesPage() {
  const [page, setPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<NoteWithFolder | null>(null);

  const navigate = useNavigate();

  const { data, isLoading, error, refetch } = useGetNotesQuery({
    page,
    keyword: searchKeyword,
  }) as {
    data: PaginatedResponse<NoteWithFolder> | undefined;
    isLoading: boolean;
    error: ApiErrorResponse;
    refetch: () => void;
  };

  const [deleteNote] = useDeleteNoteMutation();

  const handleDeleteClick = (note: NoteWithFolder) => {
    setSelectedNote(note);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedNote) {
      try {
        await deleteNote(selectedNote.id).unwrap();
        refetch();
        setDeleteDialogOpen(false);
        setSelectedNote(null);
      } catch (err) {
        console.error("Failed to delete the note: ", err);
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setSelectedNote(null);
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleCreate = () => {
    navigate("/notes/create");
  };

  const handleViewDetails = (id: number) => {
    navigate(`/notes/${id}`);
  };

  const handleEdit = (id: number) => {
    navigate(`/notes/${id}/edit`);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
    setPage(1);
  };

  return {
    data,
    isLoading,
    error,
    refetch,
    page,
    searchKeyword,
    deleteDialogOpen,
    selectedNote,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
    handlePageChange,
    handleCreate,
    handleViewDetails,
    handleEdit,
    handleSearchChange,
  };
}
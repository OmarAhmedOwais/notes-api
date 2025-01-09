import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetFoldersQuery, useDeleteFolderMutation } from "../foldersApi";
import { Folder } from "../types";
import { PaginatedResponse } from "../../../types";
import { ApiErrorResponse } from "../../../utils/apiError";

export function useFoldersPage() {
  const [page, setPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);
  const [expandedFolderId, setExpandedFolderId] = useState<string | null>(null); // State for expanded folder

  const navigate = useNavigate();

  const { data, isLoading, error, refetch } = useGetFoldersQuery({
    page,
    keyword: searchKeyword,
  }) as {
    data: PaginatedResponse<Folder> | undefined;
    isLoading: boolean;
    error: ApiErrorResponse;
    refetch: () => void;
  };

  const [deleteFolder] = useDeleteFolderMutation();

  const handleDeleteClick = (folder: Folder) => {
    setSelectedFolder(folder);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedFolder) {
      try {
        await deleteFolder(selectedFolder.id).unwrap();
        refetch();
        setDeleteDialogOpen(false);
        setSelectedFolder(null);
      } catch (err) {
        console.error("Failed to delete the folder: ", err);
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setSelectedFolder(null);
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleCreate = () => {
    navigate("/folders/create");
  };

  const handleViewDetails = (id: number) => {
    navigate(`/folders/${id}`);
  };

  const handleEdit = (id: number) => {
    navigate(`/folders/${id}/edit`);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
    setPage(1);
  };

  // Function to toggle folder expansion
  const toggleFolder = (folderId: string) => {
    setExpandedFolderId((prevId) => (prevId === folderId ? null : folderId));
  };

  return {
    data,
    isLoading,
    error,
    refetch,
    page,
    searchKeyword,
    deleteDialogOpen,
    selectedFolder,
    expandedFolderId,
    toggleFolder,
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

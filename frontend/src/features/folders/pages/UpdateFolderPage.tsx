import React from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useGetFolderByIdQuery, useUpdateFolderMutation } from "../foldersApi";
import FolderForm from "../FolderForm";
import { ApiError, ApiErrorResponse } from "../../../utils/apiError";
import { FolderFormData } from "../types";

const UpdateFolderPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const folderId = Number(id);

  const { data: folder, isLoading, error } = useGetFolderByIdQuery(folderId);
  const [updateFolder,] = useUpdateFolderMutation();

  const handleSuccess = () => {
    navigate(`/folders/${folderId}`);
  };

  const handleSubmit = async (data:FolderFormData) => {
    try {
      await updateFolder({ id: folderId, data }).unwrap();
      handleSuccess();
    } catch (err) {
      ApiError(err as ApiErrorResponse, "Failed to update folder.");
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={2}>
        <Typography color="error">Failed to load folder.</Typography>
      </Box>
    );
  }

  if (!folder) {
    return (
      <Box p={2}>
        <Typography color="error">Folder not found.</Typography>
      </Box>
    );
  }

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        Update Folder
      </Typography>
      <FolderForm
        onSuccess={handleSuccess}
        defaultValues={folder}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};

export default UpdateFolderPage;

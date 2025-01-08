import React from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetNoteByIdQuery, useUpdateNoteMutation } from "../notesApi";
import { ApiError, ApiErrorResponse } from "../../../utils/apiError";
import { NoteFormData } from "../types";
import NoteForm from "../components/NoteForm";

const UpdateNotePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const noteId = Number(id);
  
  const { data: note, isLoading, error } = useGetNoteByIdQuery(noteId);
  const [updateNote, { isLoading: isUpdating }] = useUpdateNoteMutation();

  const handleSuccess = () => {
    // Redirect to the note details page after successful update
    navigate(`/notes/${noteId}`);
  };

  const onSubmit = async (data: NoteFormData) => {
    try {
      await updateNote({ id: noteId, data }).unwrap();
      handleSuccess();
    } catch (error) {
      ApiError(error as ApiErrorResponse, "Failed to update note");
    }
  };

  if (isLoading) {
    return (
      <Box display='flex' justifyContent='center' p={4}>
        <CircularProgress />
      </Box>
    );
  }

   if (error) {
      ApiError(error as ApiErrorResponse, "unknown error");
    }

  return (
    <>
    <ToastContainer />
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        Update Note
      </Typography>
      {note && (
        <NoteForm
          onSuccess={handleSuccess}
          defaultValues={note}
          isSubmitting={isUpdating}
          onSubmit={onSubmit}
        />
      )}
    </Box>
    </>
  );
};

export default UpdateNotePage;
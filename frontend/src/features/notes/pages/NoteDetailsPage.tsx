import React from "react";
import { useParams, useNavigate, Link as RouterLink } from "react-router-dom";
import { Box, Typography, CircularProgress, Button } from "@mui/material";
import { format } from "date-fns";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetNoteByIdQuery } from "../notesApi";
import { ApiError, ApiErrorResponse } from "../../../utils/apiError";

const NoteDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const noteId = Number(id);

  const { data: note, isLoading, error } = useGetNoteByIdQuery(noteId);

  const handleEdit = () => {
    navigate(`/notes/${noteId}/edit`);
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

  if (!note) {
    return (
      <Box p={2}>
        <Typography>No note found.</Typography>
      </Box>
    );
  }

  return (
    <>
      <ToastContainer />
      <Box p={2}>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Typography variant='h4' gutterBottom>
            {note.title}
          </Typography>
          {/* <Chip label={note.folder.name} color='primary' /> */}
        </Box>

        {note.type === "TEXT" && note.textContent && (
          <Typography variant='body1' sx={{ mt: 2 }}>
            {note.textContent}
          </Typography>
        )}

        {note.type === "LIST" && note.listContent && (
          <Box component='ul' sx={{ mt: 2 }}>
            {note.listContent.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </Box>
        )}

        <Typography variant='caption' color='text.secondary' sx={{ mt: 2 }}>
          Updated: {format(new Date(note.updatedAt), "PP")}
        </Typography>

        <Box mt={3}>
          <Button
            variant='contained'
            color='primary'
            onClick={handleEdit}
            sx={{ mr: 2 }}
          >
            Edit
          </Button>
          <Button component={RouterLink} to='/notes' variant='outlined'>
            Back to Notes
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default NoteDetailsPage;

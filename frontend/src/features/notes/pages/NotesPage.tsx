import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Chip,
  Pagination,
  Stack,
  TextField,
  IconButton,
} from "@mui/material";
import { useGetNotesQuery, useDeleteNoteMutation } from "../notesApi";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ConfirmDeleteDialog from "../components/ConfirmDeleteDialog";
import { NoteWithFolder, PaginatedResponse } from "../types";
import { ApiErrorResponse } from "../../../utils/apiError";

const NotesPage: React.FC = () => {
  // State for current page number in pagination
  const [page, setPage] = useState(1);

  // State for search keyword
  const [searchKeyword, setSearchKeyword] = useState("");

  // React Router's navigation hook
  const navigate = useNavigate();

  // Fetch notes data using RTK Query
  const { data, isLoading, error, refetch } = useGetNotesQuery({
    page,
    keyword: searchKeyword,
  }) as {
    data: PaginatedResponse<NoteWithFolder> | undefined;
    isLoading: boolean;
    error: ApiErrorResponse;
    refetch: () => void;
  };

  // Mutation hook for deleting a note
  const [deleteNote] = useDeleteNoteMutation();

  // State for delete confirmation dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<NoteWithFolder | null>(null);

  /**
   * Handle click on the delete button.
   * Opens the confirmation dialog and sets the selected note.
   */
  const handleDeleteClick = (note: NoteWithFolder) => {
    setSelectedNote(note);
    setDeleteDialogOpen(true);
  };

  /**
   * Confirm deletion of the selected note.
   * Calls the delete mutation and refetches the notes list.
   */
  const handleDeleteConfirm = async () => {
    if (selectedNote) {
      try {
        await deleteNote(selectedNote.id).unwrap();
        refetch();
        setDeleteDialogOpen(false);
        setSelectedNote(null);
      } catch (err) {
        console.error("Failed to delete the note: ", err);
        // Optionally, display an error message to the user here
      }
    }
  };

  /**
   * Cancel the deletion process.
   * Closes the confirmation dialog and clears the selected note.
   */
  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setSelectedNote(null);
  };

  /**
   * Handle page change in pagination.
   */
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  /**
   * Navigate to the Create Note page.
   */
  const handleCreate = () => {
    navigate("/notes/create");
  };

  /**
   * Navigate to the Note Details page.
   */
  const handleViewDetails = (id: number) => {
    navigate(`/notes/${id}`);
  };

  /**
   * Navigate to the Update Note page.
   */
  const handleEdit = (id: number) => {
    navigate(`/notes/${id}/edit`);
  };

  /**
   * Handle changes in the search input.
   * Updates the search keyword and resets to the first page.
   */
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
    setPage(1);
  };

  if (isLoading) {
    return (
      <Box display='flex' justifyContent='center' p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={2}>
        <Typography color='error'>
          Error loading notes: {error?.data?.message ?? "Unknown error"}
        </Typography>
        <Button onClick={() => refetch()} sx={{ mt: 2 }}>
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box p={2}>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        mb={2}
      >
        <Typography variant='h4' gutterBottom>
          Notes
        </Typography>
        <Button variant='contained' color='primary' onClick={handleCreate}>
          Create New Note
        </Button>
      </Box>

      <Box mb={2}>
        <TextField
          label='Search Notes'
          variant='outlined'
          fullWidth
          value={searchKeyword}
          onChange={handleSearchChange}
          placeholder='Search by title or content...'
        />
      </Box>

      <Stack spacing={2}>
        {data?.data.map((note) => (
          <Card key={note.id} variant='outlined'>
            <CardContent>
              <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
              >
                <Typography
                  variant='h6'
                  sx={{ cursor: "pointer", color: "primary.main" }}
                  onClick={() => handleViewDetails(note.id)}
                >
                  {note.title}
                </Typography>
                <Chip label={note.folder.name} size='small' color='primary' />
              </Box>

              {note.type === "TEXT" && note.textContent && (
                <Typography color='text.secondary' sx={{ mt: 1 }}>
                  {note.textContent}
                </Typography>
              )}

              {note.type === "LIST" && note.listContent && (
                <Box component='ul' sx={{ mt: 1, mb: 1 }}>
                  {note.listContent.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </Box>
              )}

              <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                mt={2}
              >
                <Typography variant='caption' color='text.secondary'>
                  Updated: {format(new Date(note.updatedAt), "PP")}
                </Typography>
                <Box>
                  {/* View Details Button */}
                  <IconButton
                    color='primary'
                    aria-label='view details'
                    onClick={() => handleViewDetails(note.id)}
                  >
                    <VisibilityIcon />
                  </IconButton>

                  {/* Edit Button */}
                  <IconButton
                    color='secondary'
                    aria-label='edit note'
                    onClick={() => handleEdit(note.id)}
                  >
                    <EditIcon />
                  </IconButton>

                  {/* Delete Button */}
                  <IconButton
                    color='error'
                    aria-label='delete note'
                    onClick={() => handleDeleteClick(note)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
        <Box display='flex' justifyContent='center' mt={2}>
          <Pagination
            count={data?.meta.pageCount}
            page={page}
            onChange={handlePageChange}
            color='primary'
          />
        </Box>
      </Stack>

      {/* Delete Confirmation Dialog */}
      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        noteTitle={selectedNote?.title ?? ""}
      />
    </Box>
  );
};

export default NotesPage;

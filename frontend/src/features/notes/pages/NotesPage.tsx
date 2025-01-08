import React from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Chip,
  Stack,
  IconButton,
} from "@mui/material";
import { format } from "date-fns";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ConfirmDeleteDialog from "../components/ConfirmDeleteDialog";
import SearchInput from "../../../components/SearchInput";
import PaginationBar from "../../../components/PaginationBar";
import { useNotesPage } from "../hooks/useNotesPage";

const NotesPage: React.FC = () => {
  const {
    data,
    isLoading,
    error,
    refetch,
    page,
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
    searchKeyword,
  } = useNotesPage();

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
        <SearchInput
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
                  <IconButton
                    color='primary'
                    aria-label='view details'
                    onClick={() => handleViewDetails(note.id)}
                  >
                    <VisibilityIcon />
                  </IconButton>

                  <IconButton
                    color='secondary'
                    aria-label='edit note'
                    onClick={() => handleEdit(note.id)}
                  >
                    <EditIcon />
                  </IconButton>

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
          <PaginationBar
            count={data?.meta.pageCount ?? 1}
            page={page}
            onChange={handlePageChange}
            color='primary'
          />
        </Box>
      </Stack>

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

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
} from "@mui/material";
import { useGetNotesQuery, useDeleteNoteMutation,PaginatedResponse, NoteWithFolder  } from "./notesApi";
import NoteForm from "./forms/NoteForm";
import { format } from "date-fns";
import { useState } from "react";

function NotesPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error, refetch } = useGetNotesQuery({
    page,
  }) as {
    data: PaginatedResponse<NoteWithFolder> | undefined;
    isLoading: boolean;
    error: unknown;
    refetch: () => void;
  };
  const [deleteNote] = useDeleteNoteMutation();

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure?")) {
      await deleteNote(id);
      refetch();
    }
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
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
          Error loading notes: {error.data.message}
        </Typography>
        <Button onClick={() => refetch()} sx={{ mt: 2 }}>
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box p={2}>
      <Typography variant='h4' gutterBottom>
        Notes
      </Typography>

      <NoteForm onSuccess={() => refetch()} />

      <Stack spacing={2}>
        {data?.data.map((note) => (
          <Card key={note.id} variant='outlined'>
            <CardContent>
              <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
              >
                <Typography variant='h6'>{note.title}</Typography>
                <Chip label={note.folder.name} size='small' color='primary' />
              </Box>

              {note.type === "TEXT" && note.textContent && (
                <Typography color='text.secondary' sx={{ mt: 1 }}>
                  {note.textContent}
                </Typography>
              )}

              {note.type === "LIST" && note.listContent && (
                <Box component='ul' sx={{ mt: 1, mb: 1 }}>
                  {note.listContent.map((item, index) => (
                    <li key={index}>{item}</li>
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
                <Button
                  color='error'
                  variant='contained'
                  onClick={() => handleDelete(note.id)}
                  size='small'
                >
                  Delete
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}

        {data?.meta.pageCount > 1 && (
          <Box display='flex' justifyContent='center' mt={2}>
            <Pagination
              count={data.meta.pageCount}
              page={page}
              onChange={handlePageChange}
              color='primary'
            />
          </Box>
        )}
      </Stack>
    </Box>
  );
}

export default NotesPage;

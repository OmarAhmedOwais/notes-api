import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Collapse,
} from "@mui/material";
import { useState } from "react";
import { useGetFoldersQuery, useDeleteFolderMutation } from "./foldersApi";
import { Note, NoteWithFolder, useLazyGetNotesQuery } from "../notes/notesApi"; // Lazy query to fetch notes
import FolderForm from "./FolderForm";

function FoldersPage() {
  const { data: folders, isLoading, refetch } = useGetFoldersQuery();
  const [deleteFolder] = useDeleteFolderMutation();

  const [expandedFolderId, setExpandedFolderId] = useState<number | null>(null);

  // Update the type here
  const [folderNotes, setFolderNotes] = useState<Record<number, NoteWithFolder[]>>({});
  const [fetchNotes] = useLazyGetNotesQuery();

  const toggleFolder = async (folderId: number) => {
    if (expandedFolderId === folderId) {
      setExpandedFolderId(null);
      return;
    }

    try {
      const response = await fetchNotes({ folderId }).unwrap();
      setFolderNotes((prev) => ({ ...prev, [folderId]: response.data }));
      setExpandedFolderId(folderId);
    } catch (error) {
      console.error("Could not fetch notes for folder:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure?")) {
      await deleteFolder(id);
      refetch();
    }
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Box p={2}>
      <Typography variant='h4' gutterBottom>
        Folders
      </Typography>

      <FolderForm onSuccess={() => refetch()} />

      {folders?.map((folder) => (
        <Card key={folder.id} variant='outlined' sx={{ my: 1 }}>
          <CardContent>
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
            >
              <Typography variant='h6'>{folder.name}</Typography>
              <Button
                variant='outlined'
                onClick={() => toggleFolder(folder.id)}
              >
                {expandedFolderId === folder.id ? "Hide Notes" : "View Notes"}
              </Button>
            </Box>

            {/* Notes Collapse */}
            <Collapse
              in={expandedFolderId === folder.id}
              timeout='auto'
              unmountOnExit
            >
              {folderNotes[folder.id] && folderNotes[folder.id].length > 0 ? (
                <List sx={{ pl: 2 }}>
                  {folderNotes[folder.id].map((note:Note) => (
                    <ListItem key={note.id}>
                      <ListItemText primary={note.title} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography
                  variant='body2'
                  color='textSecondary'
                  sx={{ pl: 2, mt: 1 }}
                >
                  No notes available
                </Typography>
              )}
            </Collapse>

            <Button
              color='error'
              variant='contained'
              onClick={() => handleDelete(folder.id)}
              sx={{ mt: 2 }}
            >
              Delete Folder
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default FoldersPage;

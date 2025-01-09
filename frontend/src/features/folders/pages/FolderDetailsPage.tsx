import React from "react";
import {
  Box,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Chip,
  IconButton,
} from "@mui/material";
import { useParams, useNavigate, Link as RouterLink } from "react-router-dom";
import { useGetFolderByIdQuery, useDeleteFolderMutation } from "../foldersApi";
import { format } from "date-fns";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmDeleteDialog from "../../../components/ConfirmDeleteDialog";
import { toast } from "react-toastify";
import { ApiError, ApiErrorResponse } from "../../../utils/apiError";

const FolderDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const folderId = Number(id);

  const { data: folder, isLoading, error } = useGetFolderByIdQuery(folderId);
  const [deleteFolder] = useDeleteFolderMutation();

  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  const handleEdit = () => {
    navigate(`/folders/${folderId}/edit`);
  };

  const handleDelete = () => {
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteFolder(folderId).unwrap();
      toast.success("Folder deleted successfully!");
      navigate("/folders");
    } catch (err) {
      console.error("Failed to delete the folder:", err);
      toast.error("Failed to delete the folder. Please try again.");
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    ApiError(error as ApiErrorResponse, "Failed to load folder.");
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
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box>
          <Typography variant="h4" gutterBottom>
            {folder.name}
          </Typography>
          <Chip label="Folder" color="primary" />
        </Box>
        <Box>
          <IconButton color="secondary" aria-label="edit folder" onClick={handleEdit}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" aria-label="delete folder" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Notes in this Folder
        </Typography>
        {folder.notes && folder.notes.length > 0 ? (
          <List>
            {folder.notes.map((note) => (
              <ListItem
                key={note.id}
                component={RouterLink}
                to={`/notes/${note.id}`}
              >
                <ListItemText
                  primary={note.title}
                  secondary={`Updated: ${format(new Date(note.updatedAt), "PP")}`}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>No notes available in this folder.</Typography>
        )}
      </Box>

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onClose={handleCancelDelete}
        onConfirm={confirmDelete}
        itemName={folder.name}
        itemType="folder"
      />
    </Box>
  );
};

export default FolderDetailsPage;
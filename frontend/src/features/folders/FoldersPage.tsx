import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { useGetFoldersQuery, useDeleteFolderMutation } from "./foldersApi";
import FolderForm from "./FolderForm";

function FoldersPage() {
  const { data: folders, isLoading, refetch } = useGetFoldersQuery();
  const [deleteFolder] = useDeleteFolderMutation();

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
            <Typography variant='h6'>{folder.name}</Typography>
            <Button
              color='error'
              variant='contained'
              onClick={() => handleDelete(folder.id)}
              sx={{ mt: 1 }}
            >
              Delete
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default FoldersPage;

import React from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Stack,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import ConfirmDeleteDialog from "../../../components/ConfirmDeleteDialog";
import SearchInput from "../../../components/SearchInput";
import PaginationBar from "../../../components/PaginationBar";
import { useFoldersPage } from "../hooks/useFoldersPage";

const FoldersPage: React.FC = () => {
  const {
    data,
    isLoading,
    error,
    refetch,
    page,
    deleteDialogOpen,
    selectedFolder,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
    handlePageChange,
    handleCreate,
    handleViewDetails,
    handleEdit,
    handleSearchChange,
    searchKeyword,
  } = useFoldersPage();

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
        <Typography color="error">
          Error loading folders: {error?.data?.message ?? "Unknown error"}
        </Typography>
        <Button onClick={refetch} sx={{ mt: 2 }}>
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box p={2}>
      {/* Header Section */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4" gutterBottom>
          Folders
        </Typography>
        <Button variant="contained" color="primary" onClick={handleCreate}>
          Create New Folder
        </Button>
      </Box>

      {/* Search Input */}
      <Box mb={2}>
        <SearchInput
          value={searchKeyword}
          onChange={handleSearchChange}
          placeholder="Search folders..."
        />
      </Box>

      {/* Folders List */}
      <Stack spacing={2}>
        {data?.data.map((folder) => (
          <Card key={folder.id} variant="outlined">
            <CardContent>
              {/* Folder Header */}
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  variant="h6"
                  sx={{ cursor: "pointer", color: "primary.main" }}
                  onClick={() => handleViewDetails(folder.id)}
                >
                  {folder.name}
                </Typography>
              </Box>

              {/* Actions */}
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mt={2}
              >
                <Typography variant="caption" color="text.secondary">
                  Updated: {new Date(folder.updatedAt).toLocaleDateString()}
                </Typography>
                <Box>
                  <IconButton
                    color="primary"
                    aria-label="view details"
                    onClick={() => handleViewDetails(folder.id)}
                  >
                    <VisibilityIcon />
                  </IconButton>

                  <IconButton
                    color="secondary"
                    aria-label="edit folder"
                    onClick={() => handleEdit(folder.id)}
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    color="error"
                    aria-label="delete folder"
                    onClick={() => handleDeleteClick(folder)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {/* Pagination */}
      <Box display="flex" justifyContent="center" mt={2}>
        <PaginationBar
          count={data?.meta.pageCount ?? 1}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>

      {/* Confirm Delete Dialog */}
      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        itemName={selectedFolder?.name ?? ""}
        itemType="Folder"
      />
    </Box>
  );
};

export default FoldersPage;

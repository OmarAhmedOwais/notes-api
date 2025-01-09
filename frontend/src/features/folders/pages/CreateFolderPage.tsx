import React from "react";
import { Box, Typography } from "@mui/material";
import FolderForm from "../FolderForm";
import { useNavigate } from "react-router-dom";

const CreateFolderPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/folders");
  };

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        Create New Folder
      </Typography>
      <FolderForm onSuccess={handleSuccess} />
    </Box>
  );
};

export default CreateFolderPage;
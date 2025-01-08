import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NoteForm from "../components/NoteForm";

const CreateNotePage: React.FC = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    // Redirect to the notes list or detail page after successful creation
    navigate("/notes");
  };

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        Create New Note
      </Typography>
      <NoteForm onSuccess={handleSuccess} />
    </Box>
  );
};

export default CreateNotePage;
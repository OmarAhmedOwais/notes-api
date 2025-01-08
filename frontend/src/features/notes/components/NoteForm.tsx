import React from "react";
import { Box, TextField, Button, MenuItem } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextContentField from "./TextContentField";
import ListContentFields from "./ListContentFields";
import useNoteForm from "../hooks/useNoteForm";
import { NoteFormData, NoteType, Note } from "../types";

interface NoteFormProps {
  onSuccess?: () => void;
  defaultValues?: Note;
  isSubmitting?: boolean;
  onSubmit?: (data: NoteFormData) => Promise<void>;
}

const NoteForm: React.FC<NoteFormProps> = ({
  onSuccess,
  defaultValues,
  onSubmit,
}) => {
  // Utilize the custom hook
  const {
    watchType,
    register,
    handleSubmit,
    errors,
    fields,
    append,
    remove,
    isSubmitting,
    handleFormSubmit,
  } = useNoteForm({
    onSuccess,
    defaultValues,
    onSubmit,
  });

  return (
    <>
      <ToastContainer />
      <Box
        component="form"
        onSubmit={handleSubmit(handleFormSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}
      >
        {/* Title Field */}
        <TextField
          id="title"
          label="Title"
          {...register("title")}
          error={!!errors.title}
          helperText={errors.title?.message}
        />

        {/* Type Field */}
        <TextField
          id="type"
          label="Type"
          select
          value={watchType}
          {...register("type")}
          error={!!errors.type}
          helperText={errors.type?.message}
        >
          <MenuItem value={NoteType.TEXT}>TEXT</MenuItem>
          <MenuItem value={NoteType.LIST}>LIST</MenuItem>
        </TextField>

        {/* Conditional Rendering Based on Note Type */}
        {watchType === NoteType.TEXT && (
          <TextContentField register={register} errors={errors} />
        )}

        {watchType === NoteType.LIST && (
          <ListContentFields
            fields={fields}
            append={append}
            remove={remove}
            register={register}
            errors={errors}
          />
        )}

        {/* Folder ID Field */}
        <TextField
          id="folderId"
          label="Folder ID"
          type="number"
          {...register("folderId", { valueAsNumber: true })}
          error={!!errors.folderId}
          helperText={errors.folderId?.message}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save Note"}
        </Button>
      </Box>
    </>
  );
};

export default NoteForm;
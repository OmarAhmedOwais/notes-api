import { useForm } from "react-hook-form";
import { Box, TextField, Button, MenuItem } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { noteSchema } from "../../utils/validationSchemas";
import { noteType, useCreateNoteMutation } from "./notesApi";
import { ApiError, ApiErrorResponse } from "../../utils/apiError";

interface INoteForm {
  title: string;
  content: string;
  type: noteType;
  folderId: number;
}

interface NoteFormProps {
  onSuccess?: () => void;
}

function NoteForm({ onSuccess }: Readonly<NoteFormProps>) {
  const [createNote, { isLoading }] = useCreateNoteMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<INoteForm>({
    defaultValues: {
      type: noteType.TEXT,
      folderId: 1,
    },
    resolver: yupResolver(noteSchema),
  });

  const onSubmit = async (data: INoteForm) => {
    try {
      await createNote(data).unwrap();
      reset();
      onSuccess?.();
    } catch (error: unknown) {
      ApiError(error as ApiErrorResponse, "Failed to create folder");
    }
  };

  return (
    <>
      <ToastContainer />
      <Box
        component='form'
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}
      >
        <TextField
          label='Title'
          {...register("title")}
          error={!!errors.title}
          helperText={errors.title?.message}
        />
        <TextField
          label='Content'
          {...register("content")}
          error={!!errors.content}
          helperText={errors.content?.message}
        />
        <TextField
          label='Type'
          select
          {...register("type")}
          error={!!errors.type}
          helperText={errors.type?.message}
        >
          <MenuItem value='TEXT'>TEXT</MenuItem>
          <MenuItem value='LIST'>LIST</MenuItem>
        </TextField>
        <TextField
          label='Folder ID'
          type='number'
          {...register("folderId", { valueAsNumber: true })}
          error={!!errors.folderId}
          helperText={errors.folderId?.message}
        />

        <Button type='submit' variant='contained' disabled={isLoading}>
          {isLoading ? "Saving..." : "Create Note"}
        </Button>
      </Box>
    </>
  );
}

export default NoteForm;

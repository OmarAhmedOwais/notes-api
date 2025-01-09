import { useForm } from "react-hook-form";
import { Box, TextField, Button } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCreateFolderMutation } from "./foldersApi";
import { ApiError, ApiErrorResponse } from "../../utils/apiError";
import { folderSchema } from "../../utils/validationSchemas";
import { FolderFormData } from "./types";

interface FolderFormProps {
  onSuccess?: () => void;
  defaultValues?: Partial<FolderFormData>;
  onSubmit?: (data: FolderFormData) => Promise<void>;
}

const FolderForm: React.FC<FolderFormProps> = ({
  onSuccess,
  defaultValues,
  onSubmit: customSubmitHandler,
}: FolderFormProps) => {
  const [createFolder, { isLoading }] = useCreateFolderMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FolderFormData>({
    defaultValues,
    resolver: yupResolver(folderSchema),
  });

  const handleFormSubmit = async (data: FolderFormData) => {
    try {
      if (customSubmitHandler) {
        await customSubmitHandler(data);
      } else {
        await createFolder(data).unwrap();
        reset();
        onSuccess?.();
      }
    } catch (error) {
      ApiError(error as ApiErrorResponse, "Failed to create folder");
    }
  };

  return (
    <>
      <ToastContainer />
      <Box
        component='form'
        onSubmit={handleSubmit(handleFormSubmit)}
        sx={{ display: "flex", gap: 2, mt: 2 }}
      >
        <TextField
          label='Folder Name'
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <Button type='submit' variant='contained' disabled={isLoading}>
          {isLoading ? "Creating..." : "Save Folder"}
        </Button>
      </Box>
    </>
  );
}

export default FolderForm;

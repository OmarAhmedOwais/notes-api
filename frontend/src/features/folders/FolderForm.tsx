import { useForm } from 'react-hook-form';
import { Box, TextField, Button } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCreateFolderMutation } from './foldersApi';
import { ApiError, ApiErrorResponse } from '../../utils/apiError';
import { folderSchema } from '../../utils/validationSchemas';

interface IFolderForm {
  name: string;
}

interface FolderFormProps {
  onSuccess?: () => void;
}

function FolderForm({ onSuccess }: Readonly<FolderFormProps>) {
  const [createFolder, { isLoading }] = useCreateFolderMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFolderForm>({
    resolver: yupResolver(folderSchema),
  });

  const onSubmit = async (data: IFolderForm) => {
    try {
      await createFolder(data).unwrap();
      reset();
      onSuccess?.();
    } catch (error: unknown) {
      ApiError(error as ApiErrorResponse,'Failed to create folder');
    }
  };

  return (
    <>
    <ToastContainer/>
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: 'flex', gap: 2, mt: 2 }}
    >
      <TextField
        label="Folder Name"
        {...register('name')}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <Button type="submit" variant="contained" disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Create Folder'}
      </Button>
    </Box>
    </>
  );
}

export default FolderForm;

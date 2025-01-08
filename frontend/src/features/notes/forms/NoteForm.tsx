import React from 'react';
import { Box, TextField, Button, MenuItem } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { noteSchema } from '../../../utils/validationSchemas';
import { useCreateNoteMutation, NoteType, Note } from '../notesApi';
import { ApiError, ApiErrorResponse } from '../../../utils/apiError';
import TextContentField from './TextContentField';
import ListContentFields from './ListContentFields';

interface NoteFormProps {
  onSuccess?: () => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ onSuccess }) => {
  const [createNote, { isLoading }] = useCreateNoteMutation();

  const {
    watch,
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<Note>({
    defaultValues: {
      title: '',
      type: NoteType.TEXT,
      textContent: '',
      listContent: [''],
      folderId: 1,
    },
    resolver: yupResolver(noteSchema),
  });

  const watchType = watch('type');

  const { fields, append, remove } = useFieldArray({
    name: 'listContent' as never,
    control,
  });

  const onSubmit: SubmitHandler<Note> = async (data) => {
    try {
      await createNote(data).unwrap();
      reset();
      onSuccess?.();
    } catch (error) {
      ApiError(error as ApiErrorResponse, 'Failed to create note');
    }
  };

  return (
    <>
      <ToastContainer />
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}
      >
        <TextField
          id="title"
          label="Title"
          {...register('title')}
          error={!!errors.title}
          helperText={errors.title?.message}
        />

        <TextField
          id="type"
          label="Type"
          select
          {...register('type')}
          error={!!errors.type}
          helperText={errors.type?.message}
        >
          <MenuItem value={NoteType.TEXT}>TEXT</MenuItem>
          <MenuItem value={NoteType.LIST}>LIST</MenuItem>
        </TextField>

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

        <TextField
          id="folderId"
          label="Folder ID"
          type="number"
          {...register('folderId', { valueAsNumber: true })}
          error={!!errors.folderId}
          helperText={errors.folderId?.message}
        />

        <Button type="submit" variant="contained" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Create Note'}
        </Button>
      </Box>
    </>
  );
};

export default NoteForm;
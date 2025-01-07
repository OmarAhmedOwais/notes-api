import { Box, TextField, Button, MenuItem } from '@mui/material';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextContentField from './TextContentField';
import ListContentFields from './ListContentFields';
import { NoteType } from '../notesApi';
import { useNoteForm } from '../hooks/useNoteForm';

interface NoteFormProps {
  onSuccess?: () => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ onSuccess }) => {
  const {
    watchType,
    register,
    handleSubmit,
    errors,
    fields,
    append,
    remove,
    onSubmit,
    isLoading,
  } = useNoteForm({ onSuccess });

  return (
    <>
    <ToastContainer/>
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
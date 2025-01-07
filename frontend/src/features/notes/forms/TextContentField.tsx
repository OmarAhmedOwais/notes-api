import { TextField } from '@mui/material';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Note } from '../notesApi';

interface TextContentFieldProps {
  register: UseFormRegister<Note>;
  errors: FieldErrors<Note>;
}

const TextContentField: React.FC<TextContentFieldProps> = ({ register, errors }) => (
  <TextField
    id="textContent"
    label="Text Content"
    {...register('textContent')}
    error={!!errors.textContent}
    helperText={errors.textContent?.message}
  />
);

export default TextContentField;
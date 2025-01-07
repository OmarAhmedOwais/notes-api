import { Box, TextField, Button } from '@mui/material';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Note } from '../notesApi';

interface ListContentFieldsProps {
  fields: { id: string }[];
  append: (value: string) => void;
  remove: (index: number) => void;
  register: UseFormRegister<Note>;
  errors: FieldErrors<Note>;
}

const ListContentFields: React.FC<ListContentFieldsProps> = ({
  fields,
  append,
  remove,
  register,
  errors,
}) => (
  <Box>
    {fields.map((field, index) => (
      <Box key={field.id} sx={{ display: 'flex', gap: 1, mb: 1 }}>
        <TextField
          id={`listContent.${index}`}
          label={`List Item #${index + 1}`}
          {...register(`listContent.${index}`)}
          error={!!errors.listContent?.[index]}
          helperText={errors.listContent?.[index]?.message}
        />
        <Button
          type="button"
          onClick={() => remove(index)}
          variant="outlined"
          color="secondary"
        >
          Remove
        </Button>
      </Box>
    ))}
    <Button
      type="button"
      onClick={() => append('')}
      variant="outlined"
      color="primary"
    >
      Add List Item
    </Button>
    {errors.listContent?.message && (
      <Box color="error.main" mt={1}>
        {errors.listContent.message}
      </Box>
    )}
  </Box>
);

export default ListContentFields;
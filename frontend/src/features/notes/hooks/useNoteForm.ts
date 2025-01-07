import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { noteSchema } from '../../../utils/validationSchemas';
import { useCreateNoteMutation, NoteType, Note } from '../notesApi';
import { ApiError, ApiErrorResponse } from '../../../utils/apiError';

interface UseNoteFormProps {
  onSuccess?: () => void;
}
export const useNoteForm = ({ onSuccess }: UseNoteFormProps) => {
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
      // No need to transform listContent since it's already string[]
      await createNote(data).unwrap();
      reset();
      onSuccess?.();
    } catch (error: unknown) {
      ApiError(error as ApiErrorResponse, 'Failed to create note');
    }
  };

  return {
    watchType,
    register,
    handleSubmit,
    control,
    errors,
    fields,
    append,
    remove,
    onSubmit,
    isLoading,
  };
};
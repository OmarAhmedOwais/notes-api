import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { noteSchema } from "../../../utils/validationSchemas";
import { useCreateNoteMutation, useUpdateNoteMutation } from "../notesApi";
import { ApiError, ApiErrorResponse } from "../../../utils/apiError";
import { NoteFormData, NoteType, Note } from "../types";
import { useEffect } from "react";

/**
 * Custom hook to manage the Note form logic.
 *
 * @param props - Props passed from the NoteForm component.
 * @returns An object containing form methods and state.
 */
const useNoteForm = ({
  onSuccess,
  defaultValues,
  onSubmit: externalOnSubmit,
}: {
  onSuccess?: () => void;
  defaultValues?: Note;
  onSubmit?: SubmitHandler<NoteFormData>;
}) => {

  // RTK Query mutations
  const [createNote, { isLoading: isCreating }] = useCreateNoteMutation();
  const [updateNote, { isLoading: isUpdating }] = useUpdateNoteMutation();

  // Initialize the form
  const {
    watch,
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<NoteFormData>({
    defaultValues: defaultValues
      ? {
          title: defaultValues.title,
          type: defaultValues.type,
          textContent: defaultValues.textContent || "",
          listContent: defaultValues.listContent || [""],
          folderId: defaultValues.folderId,
        }
      : {
          title: "",
          type: NoteType.TEXT,
          textContent: "",
          listContent: [""],
          folderId: 1,
        },
    resolver: yupResolver(noteSchema),
  });

  const watchType = watch("type", NoteType.TEXT) || NoteType.TEXT;

  // Manage dynamic fields for list content
  const { fields, append, remove } = useFieldArray({
    name: "listContent" as never,
    control,
  });

  // Effect to reset the form when defaultValues change (useful when editing different notes)
  useEffect(() => {
    if (defaultValues) {
      reset({
        title: defaultValues.title,
        type: defaultValues.type,
        textContent: defaultValues.textContent || "",
        listContent: defaultValues.listContent || [""],
        folderId: defaultValues.folderId,
      });
    }
  }, [defaultValues, reset]);

  /**
   * Handle form submission.
   * Differentiates between create and update operations.
   */
  const handleFormSubmit: SubmitHandler<NoteFormData> = async (data) => {
    if (externalOnSubmit) {
      // If an external onSubmit handler is provided, use it (useful for update operations)
      await externalOnSubmit(data);
    } else {
      try {
        await createNote(data).unwrap();
        reset();
        onSuccess?.();
      } catch (error) {
        ApiError(error as ApiErrorResponse, "Failed to create note");
      }
    }
  };

  /**
   * Handle updating an existing note.
   *
   * @param id - The ID of the note to update.
   * @param data - The updated note data.
   */
  const handleUpdate = async (id: number, data: NoteFormData) => {
    try {
      await updateNote({ id, data }).unwrap();
      onSuccess?.();
    } catch (error) {
      ApiError(error as ApiErrorResponse, "Failed to update note");
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
    isSubmitting: isCreating || isUpdating,
    handleFormSubmit,
    handleUpdate,
  };
};

export default useNoteForm;
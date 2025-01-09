import { useCreateFolderMutation } from "../foldersApi";
import { ApiError, ApiErrorResponse } from "../../../utils/apiError";
import { FolderFormData } from "../types";

export function useFolderForm(onSuccess?: () => void) {
  const [createFolder, { isLoading }] = useCreateFolderMutation();

  const createNewFolder = async (data: FolderFormData) => {
    try {
      await createFolder(data).unwrap();
      onSuccess?.();
    } catch (error) {
      ApiError(error as ApiErrorResponse, "Failed to create folder");
    }
  };

  return { createNewFolder, isLoading };
}

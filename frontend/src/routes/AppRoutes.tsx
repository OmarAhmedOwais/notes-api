import { Route, Routes } from "react-router-dom";
import LoginPage from "../features/auth/LoginPage";
import RegisterPage from "../features/auth/RegisterPage";
import ProtectedRoute from "../components/ProtectedRoute";
import FoldersPage from "../features/folders/pages/FoldersPage";
import NotesPage from "../features/notes/pages/NotesPage";
import CreateNotePage from "../features/notes/pages/CreateNotePage";
import UpdateNotePage from "../features/notes/pages/UpdateNotePage";
import NoteDetailsPage from "../features/notes/pages/NoteDetailsPage";
import FolderDetailsPage from "../features/folders/pages/FolderDetailsPage";
import CreateFolderPage from "../features/folders/pages/CreateFolderPage";
import UpdateFolderPage from "../features/folders/pages/UpdateFolderPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route
        path='/folders'
        element={
          <ProtectedRoute>
            <FoldersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path='/folders/:id'
        element={
          <ProtectedRoute>
            <FolderDetailsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path='/folders/create'
        element={
          <ProtectedRoute>
            <CreateFolderPage />
          </ProtectedRoute>
        }
      />

      <Route
        path='/folders/:id/edit'
        element={
          <ProtectedRoute>
            <UpdateFolderPage />
          </ProtectedRoute>
        }
      />
      <Route
        path='/notes'
        element={
          <ProtectedRoute>
            <NotesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path='/notes/create'
        element={
          <ProtectedRoute>
            <CreateNotePage />
          </ProtectedRoute>
        }
      />

      <Route
        path='/notes/:id/edit'
        element={
          <ProtectedRoute>
            <UpdateNotePage />
          </ProtectedRoute>
        }
      />

      <Route
        path='/notes/:id'
        element={
          <ProtectedRoute>
            <NoteDetailsPage />
          </ProtectedRoute>
        }
      />
      <Route path='*' element={<LoginPage />} />
    </Routes>
  );
}

export default AppRoutes;

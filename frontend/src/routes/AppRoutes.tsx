import { Route, Routes } from "react-router-dom";
import LoginPage from "../features/auth/LoginPage";
import RegisterPage from "../features/auth/RegisterPage";
import ProtectedRoute from "../components/ProtectedRoute";
import FoldersPage from "../features/folders/FoldersPage";
import NotesPage from "../features/notes/NotesPage";

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
        path="/notes"
        element={
          <ProtectedRoute>
            <NotesPage />
          </ProtectedRoute>
        }
      />
      <Route path='*' element={<LoginPage />} />
    </Routes>
  );
}

export default AppRoutes;

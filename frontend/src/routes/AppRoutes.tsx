import { Route, Routes } from "react-router-dom";
import LoginPage from "../features/auth/LoginPage";
import RegisterPage from "../features/auth/RegisterPage";

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path='/login' element={<LoginPage />} />
      {/* Public routes */}
      <Route path='/register' element={<RegisterPage />} />

      {/* Default route */}
      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
}

export default AppRoutes;

import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: Readonly<ProtectedRouteProps>) {
  const token = useAppSelector((state) => state.auth.token);

  if (!token) {
    return <Navigate to='/login' replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;

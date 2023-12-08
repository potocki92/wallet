import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import React from "react";

interface PrivateRouteProps {
  component: React.ComponentType;
  redirectTo?: string;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  redirectTo = "/",
}) => {
  const { isLoggedIn, isRefreshing } = useAuth();
  const shouldRedirect = !isLoggedIn && !isRefreshing;

  return shouldRedirect ? <Navigate to={redirectTo} /> : <Component />;
};

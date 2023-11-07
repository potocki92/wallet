import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { RestrictedRoute } from "./RestrictedRoute";
import { PrivateRoute } from "./PrivateRoute";
import { useAuth } from "../hooks/useAuth";
import { refreshUser } from "../api/auth/operations";
import { useAppDispatch } from "../api/hooks";
import Register from "../pages/Register";

const HomePage = lazy(() => import("../pages/Home"));
const RegisterPage = lazy(() => import("../pages/Register"));
const LoginPage = lazy(() => import("../pages/Login"));
const AuthenticationPage = lazy(() => import("../pages/Authentication"));

export const App = () => {
  const dispatch = useAppDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);
  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <div>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route
              path="*"
              element={
                <RestrictedRoute redirectTo="/home" component={RegisterPage} />
              }
            />
            <Route
              path="/login"
              element={
                <RestrictedRoute redirectTo="/home" component={LoginPage} />
              }
            />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/home"
              element={
                <PrivateRoute redirectTo="/login" component={HomePage} />
              }
            />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
};

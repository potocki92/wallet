import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { RestrictedRoute } from "./RestrictedRoute";
import { PrivateRoute } from "./PrivateRoute";
import { refreshUser } from "../api/auth/operations";
import { useAppDispatch } from "../api/hooks";
import SharedLayoutRestricted from "./SharedLayoutRestricted";
import SharedLayoutPrivate from "./SharedLayoutPrivate";

const HomePage = lazy(() => import("../pages/Home"));
const RegisterPage = lazy(() => import("../pages/Register"));
const LoginPage = lazy(() => import("../pages/Login"));

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<SharedLayoutRestricted />}>
            <Route
              index
              element={
                <RestrictedRoute redirectTo="/home" component={LoginPage} />
              }
            />
            <Route
              path="register"
              element={
                <RestrictedRoute redirectTo="/home" component={RegisterPage} />
              }
            />
          </Route>
          <Route path="/home" element={<SharedLayoutPrivate />}>
            <Route
              index
              element={<PrivateRoute redirectTo="/" component={HomePage} />}
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

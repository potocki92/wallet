import {
  selectIsLoggedIn,
  selectIsRefreshing,
  selectUser,
} from "../api/auth/selectors";
import { useAppSelector } from "../api/hooks";

export const useAuth = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const isRefreshing = useAppSelector(selectIsRefreshing);
  const user = useAppSelector(selectUser);
  return {
    isLoggedIn,
    isRefreshing,
    user,
  };
};

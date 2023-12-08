import { Suspense } from "react";
import { useAuth } from "../hooks/useAuth";
import { Outlet } from "react-router-dom";

const SharedLayoutPrivate = () => {
  //   const { isRefreshing } = useAuth();
  return (
    <>
      <Suspense fallback={<>Loading</>}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default SharedLayoutPrivate;

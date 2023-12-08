import { Suspense } from "react";
import { useAuth } from "../hooks/useAuth";
import { Outlet } from "react-router-dom";

const SharedLayoutRestricted = () => {

  // Dodanie Loadingu
  // const { isRefreshing } = useAuth();

  return (
    <>
        <Suspense fallback={<div>Loading...</div>}>
            <Outlet/>
        </Suspense>
    </>
  )
}

export default SharedLayoutRestricted
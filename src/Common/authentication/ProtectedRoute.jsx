import { useUser } from "@/context/AuthContext";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuthenication } = useUser();
  return isAuthenication ? <Outlet /> : <Navigate to={"/signin"} />;
};

export default ProtectedRoute;
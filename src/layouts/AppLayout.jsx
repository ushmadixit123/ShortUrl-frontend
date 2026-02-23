// layouts/AppLayout.jsx
import React from "react";
import PublicLayout from "./PublicLayout";
import PrivateLayout from "./PrivateLayout";

const AppLayout = ({ children }) => {
  const token = localStorage.getItem("token");

  return token ? <PrivateLayout /> : <PublicLayout />;
};

export default AppLayout;
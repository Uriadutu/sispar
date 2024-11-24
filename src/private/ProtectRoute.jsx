import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth"; // Opsional, gunakan firebase-hooks
import { auth } from "../config/Database"; // Konfigurasi Firebase

const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth); // Mendapatkan user dari Firebase Authentication

  if (loading) {
    return <p>Loading...</p>; // Atau tampilkan spinner jika prosesnya lambat
  }

  if (!user) {
    return <Navigate to="/" replace />; // Redirect ke halaman login jika tidak ada user
  }

  return children; // Render halaman jika user sudah login
};

export default ProtectedRoute;

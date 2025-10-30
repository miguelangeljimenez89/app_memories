import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import LoadData from "./pages/LoadData";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Página de login */}
        <Route path="/login" element={<Login />} />

        {/* Ruta protegida */}
        <Route
          path="/loadData"
          element={
            <ProtectedRoute>
              <LoadData />
            </ProtectedRoute>
          }
        />

        {/* Redirigir raíz a login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

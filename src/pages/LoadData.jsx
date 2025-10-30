// src/pages/LoadData.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { logout } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

export default function LoadData() {
  const [mood, setMood] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const backendURL = "http://localhost:4000/api/memories"; // Ajusta si cambias el backend

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login", { replace: true });
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!mood || !file) {
      setMessage("⚠️ Selecciona un estado de ánimo y una imagen.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("mood", mood);
      formData.append("file", file);

      const response = await axios.post(backendURL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setMessage("✅ Archivo cargado correctamente.");
        setMood("");
        setFile(null);
        e.target.reset();
      }
    } catch (error) {
      console.error("❌ Error al enviar al servidor:", error);
      setMessage("❌ Error al enviar los datos al servidor.");
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
        {/* Encabezado */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Cargar imagen</h1>
          {user && (
            <div className="flex items-center gap-3">
              <img
                src={user.photo}
                alt="User"
                className="w-10 h-10 rounded-full border"
              />
              <div>
                <p className="text-sm font-semibold text-gray-700">{user.name}</p>
                <button
                  onClick={handleLogout}
                  className="text-xs text-red-500 hover:text-red-700"
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-gray-700">Estado de ánimo:</span>
            <select
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            >
              <option value="">Seleccione...</option>
              <option value="Triste">Triste</option>
              <option value="Feliz">Feliz</option>
              <option value="Indiferente">Indiferente</option>
            </select>
          </label>

          <label className="block">
            <span className="text-gray-700">Seleccionar imagen:</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="mt-1 block w-full"
            />
          </label>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Subir imagen
          </button>
        </form>

        {/* Mensaje */}
        {message && (
          <p className="mt-4 text-center text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
}

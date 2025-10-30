// src/pages/Login.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginWithGoogle } from "../firebaseConfig";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      // 👇 Si el usuario ya está autenticado, redirige automáticamente
      navigate("/loadData", { replace: true });
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate("/loadData", { replace: true });
    } catch (error) {
      console.error("❌ Error al iniciar sesión:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">App Memories</h1>
        <p className="mb-6 text-gray-600">Inicia sesión para continuar</p>
        <button
          onClick={handleLogin}
          className="bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-md w-full font-medium transition"
        >
          Iniciar sesión con Google
        </button>
      </div>
    </div>
  );
}

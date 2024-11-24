import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/Database"; // Pastikan file konfigurasi Firebase benar

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Kata sandi dan konfirmasi kata sandi tidak cocok.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Registrasi berhasil! Silakan masuk.");
      navigate("/"); // Arahkan ke halaman login
    } catch (err) {
      console.error("Registration Error:", err.message);
      setError("Registrasi gagal. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-white flex justify-center items-center">
      <div>
        <section className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg px-8 py-10">
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            Sistem Pakar
          </h1>
          <div className="flex w-full justify-center items-center gap-2">
            <p className="text-gray-500">Buat Akun Untuk Melakukan Prediksi</p>
          </div>
          <div className="flex w-full text-center justify-center relative mt-3">
            <div className="absolute top-3 w-full">
              <div className="flex border-t-2 border-gray-300 w-full h-[30px]"></div>
            </div>
            <p className="text-sm text-gray-500 z-30 bg-white px-3">Daftar</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-center my-2 bg-red-100 p-2 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister}>
            <input
              type="email"
              className="input w-full mt-5 bg-gray-100 px-3 py-2 rounded"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              className="input w-full mt-3 bg-gray-100 px-3 py-2 rounded"
              placeholder="Kata Sandi"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              className="input w-full mt-3 bg-gray-100 px-3 py-2 rounded"
              placeholder="Konfirmasi Kata Sandi"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center mt-5 gap-2 bg-blue-500 text-white text-sm font-medium px-4 py-3 rounded-md hover:bg-blue-600 transition duration-300 disabled:bg-blue-300"
            >
              {isLoading ? "Mendaftarkan..." : "Daftar"}
            </button>
          </form>
        </section>
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg px-8 py-4 mt-2">
          <div className="flex w-full justify-center items-center gap-2">
            <p className="text-gray-500">Sudah Punya Akun?</p>{" "}
            <Link className="text-blue-500" to="/">
              Masuk
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

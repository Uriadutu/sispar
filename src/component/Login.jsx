import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "../config/Database"; // Pastikan file konfigurasi Firebase benar
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault(); // Menghindari reload halaman saat form disubmit

    setIsLoading(true);
    setError(""); // Reset error setiap kali login dicoba

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User Info:", user); // Data pengguna berhasil login
      navigate("/dasbor"); // Arahkan ke halaman dashboard setelah login berhasil
    } catch (err) {
      console.error(err);
      setError("Login gagal. Email atau kata sandi salah.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    setIsLoading(true);
    setError(""); // Reset error setiap kali login dicoba

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User Info:", user); // Data pengguna berhasil login
      navigate("/dasbor"); // Arahkan ke halaman dashboard setelah login berhasil
    } catch (err) {
      console.error(err);
      setError("Login dengan Google gagal.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-white flex justify-center items-center">
      <div className="">

      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg px-8 py-10">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Sistem Pakar
        </h1>

        <div className="flex w-full text-center justify-center relative mt-3">
          <div className="absolute top-3 w-full">
            <div className="flex border-t-2 border-gray-300 w-full h-[30px]"></div>
          </div>

          <p className="text-sm text-gray-500 z-30 bg-white px-3">Masuk</p>
        </div>

        <form onSubmit={handleEmailLogin}>
          <div className="w-full">
            <input
              type="email"
              className="input w-full mt-5 bg-gray-100"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="input w-full mt-3 bg-gray-100"
              placeholder="Kata Sandi"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center mt-2 gap-2 bg-blue-500 text-white text-sm font-medium px-4 py-3 rounded-md hover:bg-blue-600 transition duration-300 disabled:bg-blue-300"
            >
              {isLoading ? "Memuat..." : "Masuk"}
            </button>
          </div>
        </form>

        <div className="flex w-full text-center justify-center relative mt-3">
          <div className="absolute top-3 w-full">
            <div className="flex border-t-2 border-gray-300 w-full h-[30px]"></div>
          </div>

          <p className="text-sm text-gray-500 z-30 bg-white px-3">Atau</p>
        </div>

        <div className="mt-6">
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white text-sm font-medium px-4 py-3 rounded-md hover:bg-blue-600 transition duration-300 disabled:bg-blue-300"
          >
            {isLoading ? (
              "Memuat..."
            ) : (
              <>
                <FcGoogle size={20} />
                Masuk dengan Google
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="text-sm mt-2 text-center text-red-600 bg-red-100 border border-red-300 rounded-md py-2 px-4 mb-4">
            {error}
          </div>
        )}
      </div>

      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg px-8 py-4 mt-2">
        <div className="flex w-full justify-center items-center gap-2">
          <p className="text-gray-500">Tidak punya akun?</p>
          <Link className="text-blue-500" to="/daftar">
            Buat Akun
          </Link>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Login;

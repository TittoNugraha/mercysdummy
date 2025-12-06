import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import bg from "../assets/images/bg1.jpg";
import axios from "axios";

export default function Landing() {
  const [showLogin, setShowLogin] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [clickCount, setClickCount] = useState(0);

  const handleLogoClick = () => {
    setClickCount((prev) => prev + 1);
    if (clickCount + 1 === 3) {
      setShowLogin(true);
      setClickCount(0);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/login",
        form
      );

      if (res.data.admin) {
        localStorage.setItem("admin", JSON.stringify(res.data.admin));
        navigate("/admin/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Terjadi kesalahan login");
    }
  };

  // STATE UNTUK MODAL REGISTER
  const [showRegister, setShowRegister] = useState(false);

  // DATA FORM REGISTER
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    name: "",
  });

  // FEEDBACK REGISTER
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");

  // HANDLE REGISTER
  const handleRegister = async () => {
    setRegisterError("");
    setRegisterSuccess("");

    // VALIDASI INPUT – semua kolom wajib diisi
    if (
      !registerForm.name ||
      !registerForm.username ||
      !registerForm.password
    ) {
      setRegisterError("Semua kolom wajib diisi!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/admin/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerForm),
      });

      const data = await res.json();

      if (!res.ok) {
        setRegisterError(data.message);
        return;
      }

      setRegisterSuccess("Registrasi admin berhasil!");

      // reset form
      setRegisterForm({
        username: "",
        password: "",
        name: "",
      });
    } catch (err) {
      setRegisterError("Terjadi kesalahan server");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed inset-0 overflow-hidden bg-cream"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bg})`,
          filter: "blur(2px)",
        }}
      ></div>

      <div className="absolute inset-0 bg-white/40"></div>

      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 min-h-screen">
        {/* Logo */}
        <h1
          onClick={handleLogoClick}
          className="text-6xl font-extrabold text-choco mb-4 cursor-pointer select-none"
        >
          Mercy’s Coffee
        </h1>
        <p className="text-lg text-gray-700 mb-10">
          Nikmati setiap tegukan dengan suasana yang hangat ☕
        </p>

        {/* Button User */}
        <button
          onClick={() => (window.location.href = "/order")}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-4 rounded-full text-xl font-bold shadow-lg hover:scale-105 transition"
        >
          Pesan Sekarang
        </button>

        {/* Modal Login Admin */}
        {showLogin && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="relative bg-white rounded-xl shadow-xl p-6 w-80">
              {/* Tombol X (Close) */}
              <button
                onClick={() => setShowLogin(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
              >
                &times;
              </button>

              <h2 className="text-2xl font-extrabold text-choco mb-5 text-center tracking-wide">
                Admin Login
              </h2>

              <input
                type="text"
                placeholder="Username"
                className="border w-full px-3 py-2 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-amber-400"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
              />

              <input
                type="password"
                placeholder="Password"
                className="border w-full px-3 py-2 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-amber-400"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />

              {error && (
                <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
              )}

              {/* Tombol Login (Dominan) */}
              <button
                onClick={handleLogin}
                className="bg-amber-600 hover:bg-amber-700 text-white w-full py-3 rounded-lg text-lg font-semibold shadow-md transition"
              >
                Login
              </button>

              {/* Register Text */}
              <p className="text-sm text-gray-600 text-center mt-4">
                Belum punya akun?{" "}
                <span
                  onClick={() => {
                    setShowLogin(false);
                    setShowRegister(true);
                  }}
                  className="text-blue-600 hover:text-blue-700 font-semibold cursor-pointer"
                >
                  Create your account
                </span>
              </p>
            </div>
          </div>
        )}
        {showRegister && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm relative animate-fadeIn">
              {/* ❌ Tombol close - sama seperti pop up login */}
              <button
                onClick={() => setShowLogin(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
              >
                &times;
              </button>

              {/* Judul sama style dengan Admin Login */}
              <h2 className="text-2xl font-extrabold text-choco mb-5 text-center tracking-wide">
                Create Admin Account
              </h2>

              <input
                type="text"
                placeholder="Full Name"
                className="border w-full px-3 py-2 rounded-xl mb-3 focus:ring-2 focus:ring-choco/60 outline-none"
                value={registerForm.name}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, name: e.target.value })
                }
              />

              <input
                type="text"
                placeholder="Username"
                className="border w-full px-3 py-2 rounded-xl mb-3 focus:ring-2 focus:ring-choco/60 outline-none"
                value={registerForm.username}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, username: e.target.value })
                }
              />

              <input
                type="password"
                placeholder="Password"
                className="border w-full px-3 py-2 rounded-xl mb-3 focus:ring-2 focus:ring-choco/60 outline-none"
                value={registerForm.password}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, password: e.target.value })
                }
              />

              {registerError && (
                <p className="text-red-500 text-sm mb-2">{registerError}</p>
              )}

              {registerSuccess && (
                <p className="text-green-600 text-sm mb-2">{registerSuccess}</p>
              )}

              {/* Tombol Register - warna coklat (tidak putih lagi) */}
              <button
                onClick={handleRegister}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-xl font-semibold shadow-md transition mb-4"
              >
                Register
              </button>

              {/* Link Back to login */}
              <p className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <span
                  className="text-choco font-semibold hover:underline cursor-pointer"
                  onClick={() => {
                    setShowRegister(false);
                    setShowLogin(true);
                  }}
                >
                  Back to Login
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

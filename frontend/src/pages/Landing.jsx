import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import bg from "../assets/images/bg1.jpg";

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

  const handleLogin = (e) => {
    e.preventDefault();
    if (form.username === "admin" && form.password === "9987") {
      navigate("/admin/dashboard");
    } else {
      setError("Username atau password salah!");
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
            <div className="bg-white rounded-lg shadow-lg p-6 w-80">
              <h2 className="text-xl font-bold text-choco mb-4 text-center">
                Admin Login
              </h2>
              <input
                type="text"
                placeholder="Username"
                className="border w-full px-3 py-2 rounded mb-3"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
              />
              <input
                type="password"
                placeholder="Password"
                className="border w-full px-3 py-2 rounded mb-3"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
              <div className="flex justify-between">
                <button
                  onClick={handleLogin}
                  className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded font-semibold shadow-md"
                >
                  Login
                </button>
                <button
                  onClick={() => setShowLogin(false)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-semibold shadow-md"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

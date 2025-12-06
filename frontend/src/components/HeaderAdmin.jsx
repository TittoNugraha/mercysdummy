import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const HeaderAdmin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Jika kamu menyimpan token di localStorage, bisa dihapus di sini
    // localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="bg-[#f5ebe0] shadow-md px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-[#5c3d2e]">
        Mercy’s Coffee <span className="text-sm text-[#a47148]">Admin</span>
      </h1>

      {/* Tombol Logout Stylish */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-4 py-2 
        bg-gradient-to-r from-[#a47148] to-[#8c5e3c]
        text-white font-medium rounded-full shadow-md
        hover:shadow-lg hover:scale-[1.03] active:scale-[0.98]
        transition-all duration-200"
      >
        <LogOut size={18} />
        <span>Logout</span>
      </button>
    </header>
  );
};

export default HeaderAdmin;

import { useState } from "react";
import { FaBars } from "react-icons/fa";
import logo from "../assets/images/Logo.png";

export default function Header({ tableNumber, setTableNumber }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-[#fdf7f2] shadow z-50 flex items-center justify-between px-4 py-3 border-b border-[#d2b48c]">
      <input
        type="number"
        value={tableNumber}
        onChange={(e) => {
          const value = e.target.value;
          if (value.length <= 2) {
            setTableNumber(value.replace(/\D/, ""));
          }
        }}
        placeholder="No Meja"
        className="border border-coffee rounded-lg px-2 py-1 w-14 sm:w-16 md:w-20 text-center 
             focus:outline-none focus:ring-2 focus:ring-coffee focus:border-transparent 
             transition duration-200"
      />

      <div className="flex items-center gap-2">
        <img
          src={logo}
          alt="Mercy's Coffee Logo"
          className="w-10 h-10 object-contain"
        />
        <h1 className="text-xl font-bold text-[#6F4E37]">Mercy’s Coffee</h1>
      </div>

      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className={`transition-transform duration-300 ${
            showMenu ? "scale-90 rotate-90" : "scale-100"
          }`}
        >
          <FaBars className="text-coffee text-xl" />
        </button>

        {showMenu && (
          <div
            className="absolute right-0 mt-2 w-48 bg-[#fdf7f2] border border-[#d2b48c] 
                     rounded-lg shadow-md animate-fadeSlide z-50"
          >
            <a
              href="/"
              className="block px-4 py-2 text-coffee hover:bg-[#e6d8c3] transition-colors duration-200"
            >
              Halaman Pemesanan
            </a>
            <a
              href="/check-order"
              className="block px-4 py-2 text-coffee hover:bg-[#e6d8c3] transition-colors duration-200"
            >
              Halaman Order
            </a>
          </div>
        )}
      </div>
    </header>
  );
}

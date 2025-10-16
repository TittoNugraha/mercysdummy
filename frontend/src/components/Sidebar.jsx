import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import { Bars3Icon } from "@heroicons/react/24/outline";

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarOpen = windowWidth >= 768 ? isOpen : false;

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <HomeIcon className="h-5 w-5" />,
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: <ClipboardDocumentListIcon className="h-5 w-5" />,
    },
    {
      name: "Menu",
      path: "/admin/menu",
      icon: <Squares2X2Icon className="h-5 w-5" />,
    },
  ];

  return (
    <>
      {/* Toggle button untuk layar kecil */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden p-2 bg-[#a47148] text-white rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bars3Icon className="h-6 w-6" />
      </button>

      <aside
        className={`fixed top-0 left-0 h-screen bg-[#e6d5c3] shadow-lg pt-20 
          transition-all duration-300
          ${sidebarOpen ? "w-60" : "w-16"}
        `}
      >
        <nav className="flex flex-col gap-2 px-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all duration-200
                ${
                  location.pathname === item.path
                    ? "bg-[#a47148] text-white shadow-md"
                    : "text-[#5c3d2e] hover:bg-[#d8c3a5] hover:text-[#3b2f2f]"
                }
              `}
            >
              {item.icon}
              <span
                className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${
                  sidebarOpen ? "opacity-100" : "opacity-0 w-0"
                }`}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;

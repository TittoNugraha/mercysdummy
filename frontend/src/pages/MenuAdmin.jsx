import React, { useEffect, useState } from "react";
import {
  getMenus,
  addMenu,
  updateMenu,
  deleteMenu,
  updateAvailability,
} from "../services/menuService";
import HeaderAdmin from "../components/HeaderAdmin";
import Sidebar from "../components/Sidebar";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

const MenuAdmin = () => {
  const [menus, setMenus] = useState([]);
  const [editingMenu, setEditingMenu] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    photo: "",
    category: "",
    available: true,
  });
  const [menuToDelete, setMenuToDelete] = useState(false);
  const [addingMenu, setAddingMenu] = useState(false);
  const [newMenuData, setNewMenuData] = useState({
    name: "",
    price: "",
    photo: "",
    category: "",
    available: true,
  });

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      const data = await getMenus();
      setMenus(data);
    } catch (err) {
      console.error("Gagal ambil data menu", err);
    }
  };

  const handleAvailability = async (menuId, currentAvailable) => {
    try {
      const updatedMenu = await updateAvailability(menuId, !currentAvailable);
      setMenus((prevMenus) =>
        prevMenus.map((menu) =>
          menu.id === menuId ? { ...menu, ...updatedMenu } : menu
        )
      );
    } catch (err) {
      console.error("Gagal update availability:", err);
    }
  };

  const handleEdit = (menu) => {
    setEditingMenu(menu);
    setFormData({
      name: menu.name,
      price: menu.price,
      photo: menu.photo,
      category: menu.category,
      available: menu.available,
    });
  };

  const handleSave = async () => {
    try {
      await updateMenu(editingMenu.id, formData);
      setEditingMenu(null);
      fetchMenus();
    } catch (err) {
      console.error("Gagal update menu:", err.response?.data || err);
    }
  };

  const handleAddMenu = async () => {
    try {
      await addMenu(newMenuData);
      setAddingMenu(false);
      fetchMenus();
      setNewMenuData({
        name: "",
        price: "",
        photo: "",
        category: "",
        available: true,
      });
    } catch (err) {
      console.error("Gagal tambah menu:", err);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-60">
        <HeaderAdmin />
        <div className="p-8 min-h-screen bg-[#fdfaf6]">
          <div className="p-8 min-h-screen bg-[#fdfaf6]">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-[#5c3d2e]">Menu</h1>
              <button
                onClick={() => setAddingMenu(true)}
                className="px-4 py-2 bg-[#5c3d2e] text-white rounded hover:bg-[#3b2f2f] transition"
              >
                Tambah Menu
              </button>
            </div>

            {menus.length > 0 ? (
              Object.entries(
                menus.reduce((acc, menu) => {
                  if (!acc[menu.category]) acc[menu.category] = [];
                  acc[menu.category].push(menu);
                  return acc;
                }, {})
              ).map(([category, menusInCategory]) => (
                <div key={category} className="mb-8">
                  <h2 className="text-xl font-semibold text-[#5c3d2e] mb-4">
                    {category}
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {menusInCategory.map((menu) => (
                      <div
                        key={menu.id}
                        className="bg-white shadow rounded-xl p-4 hover:shadow-lg transition flex flex-col h-full"
                      >
                        <img
                          src={`http://localhost:5000${menu.photo}`}
                          alt={menu.name}
                          className="w-full h-40 object-cover rounded-md mb-3"
                        />
                        <h3 className="font-semibold text-lg text-[#3b2f2f] mb-1">
                          {menu.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-1">
                          Rp {menu.price}
                        </p>

                        <div className="flex justify-between items-center mt-2 gap-2">
                          <button
                            onClick={() => handleEdit(menu)}
                            className="p-2 bg-[#e6d5c3] rounded hover:bg-[#d9c4ad] transition"
                          >
                            <PencilIcon className="h-5 w-5 text-[#3b2f2f]" />
                          </button>

                          <button
                            onClick={() => setMenuToDelete(menu)}
                            className="p-2 bg-red-500 rounded hover:bg-red-600 transition"
                          >
                            <TrashIcon className="h-5 w-5 text-white" />
                          </button>

                          <button
                            onClick={() =>
                              handleAvailability(menu.id, menu.available)
                            }
                            className={`p-2 rounded transition ${
                              menu.available ? "bg-green-500" : "bg-gray-300"
                            }`}
                          >
                            {menu.available ? (
                              <CheckCircleIcon className="h-5 w-5 text-white" />
                            ) : (
                              <XCircleIcon className="h-5 w-5 text-white" />
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">Belum ada menu</p>
            )}
          </div>

          {editingMenu && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="bg-white p-6 rounded-xl shadow-md w-96">
                <h2 className="text-lg font-semibold mb-4 text-[#5c3d2e]">
                  Edit Menu
                </h2>
                <input
                  type="text"
                  placeholder="Nama"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded mb-3"
                />
                <input
                  type="number"
                  placeholder="Harga"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded mb-3"
                />
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) =>
                    setFormData({ ...formData, photo: e.target.files[0] })
                  }
                  className="w-full border px-3 py-2 rounded mb-3 bg-white"
                />
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded mb-3 bg-white"
                >
                  <option value="">Pilih Kategori</option>
                  <option value="Signature">Signature</option>
                  <option value="Coffee">Coffee</option>
                  <option value="Non-Coffee">Non-Coffee</option>
                  <option value="Food">Food</option>
                </select>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setEditingMenu(null)}
                    className="px-3 py-1 bg-gray-300 rounded text-sm"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-3 py-1 bg-[#5c3d2e] text-white rounded text-sm hover:bg-[#3b2f2f]"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          )}

          {addingMenu && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="bg-white p-6 rounded-xl shadow-md w-96">
                <h2 className="text-lg font-semibold mb-4 text-[#5c3d2e]">
                  Tambah Menu
                </h2>
                <input
                  type="text"
                  placeholder="Nama"
                  value={newMenuData.name}
                  onChange={(e) =>
                    setNewMenuData({ ...newMenuData, name: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded mb-3"
                />
                <input
                  type="number"
                  placeholder="Harga"
                  value={newMenuData.price}
                  onChange={(e) =>
                    setNewMenuData({ ...newMenuData, price: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded mb-3"
                />
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) =>
                    setNewMenuData({ ...newMenuData, photo: e.target.files[0] })
                  }
                  className="w-full border px-3 py-2 rounded mb-3 bg-white"
                />
                <select
                  value={newMenuData.category}
                  onChange={(e) =>
                    setNewMenuData({ ...newMenuData, category: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded mb-3 bg-white"
                >
                  <option value="">Pilih Kategori</option>
                  <option value="Signature">Signature</option>
                  <option value="Coffee">Coffee</option>
                  <option value="Non-Coffee">Non-Coffee</option>
                  <option value="Food">Food</option>
                </select>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium">Available</span>
                  <button
                    type="button"
                    onClick={() =>
                      setNewMenuData({
                        ...newMenuData,
                        available: !newMenuData.available,
                      })
                    }
                    className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors duration-300 focus:outline-none ${
                      newMenuData.available ? "bg-green-500" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                        newMenuData.available
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    ></span>
                  </button>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setAddingMenu(false)}
                    className="px-3 py-1 bg-gray-300 rounded text-sm"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleAddMenu}
                    className="px-3 py-1 bg-[#5c3d2e] text-white rounded text-sm hover:bg-[#3b2f2f]"
                  >
                    Tambah
                  </button>
                </div>
              </div>
            </div>
          )}

          {menuToDelete && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-xl shadow-md w-80 text-center">
                <h2 className="text-lg font-semibold mb-4 text-[#5c3d2e]">
                  Konfirmasi Hapus
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                  Apakah Anda yakin ingin menghapus menu{" "}
                  <strong>{menuToDelete.name}</strong>?
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setMenuToDelete(null)}
                    className="px-4 py-2 bg-gray-300 rounded text-sm hover:bg-gray-400 transition"
                  >
                    Batal
                  </button>
                  <button
                    onClick={async () => {
                      await deleteMenu(menuToDelete.id);
                      fetchMenus();
                      setMenuToDelete(null);
                    }}
                    className="px-4 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuAdmin;

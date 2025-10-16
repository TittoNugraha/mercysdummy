import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../components/Header";
import MenuSection from "../components/MenuSection";
import Footer from "../components/Footer";
import { getMenus } from "../services/menuService";

export default function Home() {
  const navigate = useNavigate();
  const [tableNumber, setTableNumber] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [activeTab, setActiveTab] = useState("minuman");
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const data = await getMenus();
        setMenus(data);
      } catch (err) {
        console.error("Gagal ambil menu:", err);
      }
    };
    fetchMenus();
  }, []);

  const handleAddItem = (item) => {
    const existing = selectedItems.find((i) => i.id === item.id);
    if (existing) {
      setSelectedItems((prev) =>
        prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setSelectedItems((prev) => [...prev, { ...item, quantity: 1 }]);
    }
  };

  const handleRemoveItem = (itemId) => {
    const existing = selectedItems.find((i) => i.id === itemId);
    if (!existing) return;

    if (existing.quantity === 1) {
      setSelectedItems((prev) => prev.filter((i) => i.id !== itemId));
    } else {
      setSelectedItems((prev) =>
        prev.map((i) =>
          i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
        )
      );
    }
  };

  const getQty = (id) => {
    const item = selectedItems.find((i) => i.id === id);
    return item ? item.quantity : 0;
  };
  l;
  const totalItems = selectedItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  const totalPrice = selectedItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const handleProceed = () => {
    navigate("/payment", {
      state: {
        tableNumber,
        selectedItems,
        totalItems,
        totalPrice,
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="pt-20 pb-24 px-4 bg-cream min-h-screen"
    >
      <Header tableNumber={tableNumber} setTableNumber={setTableNumber} />

      {/* Tab Pilihan */}
      <div className="flex justify-center gap-4 mb-6 fixed top-20 left-1/2 transform -translate-x-1/2 z-40">
        <button
          onClick={() => setActiveTab("minuman")}
          className={`px-4 py-2 rounded-full font-medium shadow-lg transition ${
            activeTab === "minuman"
              ? "bg-[#a47148] text-white"
              : "bg-[#f0e5d8] text-brown"
          }`}
        >
          Minuman
        </button>

        <button
          onClick={() => setActiveTab("makanan")}
          className={`px-4 py-2 rounded-full font-medium shadow-lg transition ${
            activeTab === "makanan"
              ? "bg-[#a47148] text-white"
              : "bg-[#f0e5d8] text-brown"
          }`}
        >
          Makanan
        </button>
      </div>

      {/* Section Menu */}
      {activeTab === "minuman" && (
        <div className="space-y-8">
          <MenuSection
            title="Signature Drink"
            items={menus.filter((m) => m.category === "signature")}
            onAdd={handleAddItem}
            onRemove={handleRemoveItem}
            getQty={getQty}
          />
          <MenuSection
            title="Coffee"
            items={menus.filter((m) => m.category === "coffee")}
            onAdd={handleAddItem}
            onRemove={handleRemoveItem}
            getQty={getQty}
          />
          <MenuSection
            title="Non Coffee"
            items={menus.filter((m) => m.category === "non-coffee")}
            onAdd={handleAddItem}
            onRemove={handleRemoveItem}
            getQty={getQty}
          />
        </div>
      )}

      {activeTab === "makanan" && (
        <MenuSection
          title="Snack"
          items={menus.filter((m) => m.category === "food")}
          onAdd={handleAddItem}
          onRemove={handleRemoveItem}
          getQty={getQty}
        />
      )}

      {/* Footer Checkout */}
      <Footer
        total={totalPrice}
        count={totalItems}
        disabled={!tableNumber || selectedItems.length === 0}
        onProceed={handleProceed}
      />
    </motion.div>
  );
}

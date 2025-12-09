// src/pages/Home.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../components/Header";
import MenuSection from "../components/MenuSection";
import Footer from "../components/Footer";

// ========== DUMMY DATA ==========
const dummyMenus = [
  {
    id: 1,
    name: "Caramel Macchiato",
    price: 28000,
    available: true,
    category: "signature",
    photo: "/img/caramel.jpg",
  },
  {
    id: 2,
    name: "Hazelnut Latte",
    price: 30000,
    available: true,
    category: "signature",
    photo: "/img/hazelnut.jpg",
  },

  {
    id: 3,
    name: "Americano",
    price: 20000,
    available: true,
    category: "coffee",
    photo: "/img/americano.jpg",
  },
  {
    id: 4,
    name: "Cappuccino",
    price: 25000,
    available: false,
    category: "coffee",
    photo: "/img/cappucino.jpg",
  },

  {
    id: 5,
    name: "Lychee Tea",
    price: 18000,
    available: true,
    category: "non-coffee",
    photo: "/img/lychee tea.jpg",
  },
  {
    id: 6,
    name: "Chocolate",
    price: 24000,
    available: true,
    category: "non-coffee",
    photo: "/img/chocolate.jpg",
  },

  {
    id: 7,
    name: "French Fries",
    price: 18000,
    available: true,
    category: "food",
    photo: "/img/fries.jpg",
  },
  {
    id: 8,
    name: "Sausage",
    price: 15000,
    available: false,
    category: "food",
    photo: "/img/sausage.jpg",
  },
];

export default function Order() {
  const navigate = useNavigate();
  const [tableNumber, setTableNumber] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [activeTab, setActiveTab] = useState("minuman");
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    setMenus(dummyMenus);
  }, []);

  const handleAddItem = (item) => {
    const exists = selectedItems.find((i) => i.id === item.id);

    if (exists) {
      setSelectedItems((prev) =>
        prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setSelectedItems((prev) => [...prev, { ...item, quantity: 1 }]);
    }
  };

  const handleRemoveItem = (id) => {
    const exists = selectedItems.find((i) => i.id === id);
    if (!exists) return;

    if (exists.quantity === 1) {
      setSelectedItems((prev) => prev.filter((i) => i.id !== id));
    } else {
      setSelectedItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
      );
    }
  };

  const getQty = (id) => {
    const item = selectedItems.find((i) => i.id === id);
    return item ? item.quantity : 0;
  };

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
      className="pt-20 pb-24 px-4 bg-cream min-h-screen"
    >
      <Header tableNumber={tableNumber} setTableNumber={setTableNumber} />

      {/* TABS */}
      <div className="flex justify-center gap-4 mb-6 fixed top-20 left-1/2 transform -translate-x-1/2 z-40">
        <button
          onClick={() => setActiveTab("minuman")}
          className={`px-4 py-2 rounded-full font-medium shadow-lg ${
            activeTab === "minuman" ? "bg-[#a47148] text-white" : "bg-[#f0e5d8]"
          }`}
        >
          Minuman
        </button>

        <button
          onClick={() => setActiveTab("makanan")}
          className={`px-4 py-2 rounded-full font-medium shadow-lg ${
            activeTab === "makanan" ? "bg-[#a47148] text-white" : "bg-[#f0e5d8]"
          }`}
        >
          Makanan
        </button>
      </div>

      {/* MENU LIST */}
      {activeTab === "minuman" && (
        <>
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
        </>
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

      <Footer
        total={totalPrice}
        count={totalItems}
        disabled={!tableNumber || selectedItems.length === 0}
        onProceed={handleProceed}
      />
    </motion.div>
  );
}

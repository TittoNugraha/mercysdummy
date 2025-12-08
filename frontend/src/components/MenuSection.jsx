// src/components/MenuSection.jsx
export default function MenuSection({ title, items, onAdd, onRemove, getQty }) {
  return (
    <section className="mb-10 mt-6">
      <h2 className="text-xl font-bold text-[#6b4c32] mb-3">{title}</h2>

      <div className="grid grid-cols-2 gap-4">
        {items.length === 0 && (
          <p className="text-gray-600 text-sm col-span-2">Tidak ada menu.</p>
        )}

        {items.map((item) => (
          <div
            key={item.id}
            className="bg-[#f5efe6] rounded-lg p-3 border border-[#d7c7b2] shadow-sm"
          >
            <img
              src={item.photo}
              alt={item.name}
              className="w-full h-28 object-cover rounded-md"
            />

            <h3 className="font-semibold text-[#6b4c32] mt-2 text-sm">
              {item.name}
            </h3>

            <p className="text-xs text-[#8a6f4d] mb-2">
              Rp{item.price.toLocaleString("id-ID")}
            </p>

            {/* Habis */}
            {!item.available ? (
              <span className="block text-red-500 text-xs font-semibold">
                Habis
              </span>
            ) : (
              <div className="flex items-center gap-2 mt-2">
                {getQty(item.id) > 0 ? (
                  <>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="px-2 py-1 bg-red-300 text-white rounded"
                    >
                      -
                    </button>

                    <span className="font-semibold text-sm">
                      {getQty(item.id)}
                    </span>

                    <button
                      onClick={() => onAdd(item)}
                      className="px-2 py-1 bg-green-500 text-white rounded"
                    >
                      +
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => onAdd(item)}
                    className="w-full px-2 py-1 bg-[#6b4c32] text-white rounded text-sm"
                  >
                    Tambah
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

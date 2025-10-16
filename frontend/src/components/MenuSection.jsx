export default function MenuSection({ title, items, onAdd, onRemove, getQty }) {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold text-center text-brown mb-6 underline underline-offset-8 decoration-brown/30">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {items.map((item) => {
          const quantity = getQty(item.id);

          return (
            <div
              key={item.id}
              className={`bg-[#f8f3ef] border border-[#d3c1b5] p-4 rounded-xl shadow-sm transition-transform hover:scale-[1.02]
    ${!item.available ? "opacity-50 pointer-events-none" : ""}`}
            >
              <img
                src={`http://localhost:5000${item.photo}`}
                alt={item.name}
                className="w-full h-40 object-cover rounded-md mb-3"
              />
              <h3 className="text-lg font-bold text-brown text-center">
                {item.name}
              </h3>
              <p className="text-center text-sm text-gray-700 mb-2">
                Rp {item.price.toLocaleString("id-ID")}
              </p>

              {!item.available && (
                <span className="text-red-500 font-semibold text-center block mb-2">
                  Unavailable
                </span>
              )}

              <div className="flex items-center justify-center mt-3 gap-2">
                {quantity > 0 && (
                  <button
                    onClick={() => onRemove(item.id)}
                    className="px-3 py-1 text-lg bg-[#8b5e3c] text-white rounded-md shadow-sm hover:bg-[#7a4f2f] active:scale-90 transition-transform duration-150"
                  >
                    -
                  </button>
                )}
                {quantity > 0 && (
                  <span className="text-brown font-semibold">{quantity}</span>
                )}
                <button
                  onClick={() => onAdd(item)}
                  className="px-3 py-1 text-lg bg-[#a47148] text-white rounded-md shadow-sm hover:bg-[#945c35] active:scale-90 transition-transform duration-150"
                  disabled={!item.available}
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useCart } from '../context/CartContext';

const MenuCard = ({ item }) => {
  const { cart, dispatch } = useCart();
  const [imgErr, setImgErr] = useState(false);
  const fallback = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80';

  const cartItem = cart.find(i => i.id === item.id);
  const qty = cartItem ? cartItem.quantity : 0;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden h-36 sm:h-40 bg-gray-100">
        <img
          src={imgErr ? fallback : item.image}
          alt={item.name}
          onError={() => setImgErr(true)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-gray-700 text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-sm">
          {item.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col flex-1 gap-2">
        <h3 className="font-semibold text-gray-800 text-sm leading-snug line-clamp-2">{item.name}</h3>

        <div className="flex items-center justify-between mt-auto pt-1">
          <span className="text-gray-900 font-bold text-base">₹{item.price}</span>

          {qty === 0 ? (
            <button
              onClick={() => dispatch({ type: 'ADD_ITEM', item })}
              className="border border-gray-300 hover:border-orange-400 hover:text-orange-600 text-gray-600 text-xs font-bold px-3 py-1.5 rounded-lg transition-all duration-200 bg-white"
            >
              ADD +
            </button>
          ) : (
            <div className="flex items-center gap-1 border border-gray-200 rounded-lg px-1 py-0.5 bg-white">
              <button
                onClick={() => dispatch({ type: 'DECREASE', id: item.id })}
                className="w-6 h-6 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm flex items-center justify-center transition"
              >
                −
              </button>
              <span className="font-bold text-gray-800 w-5 text-center text-sm">{qty}</span>
              <button
                onClick={() => dispatch({ type: 'INCREASE', id: item.id })}
                className="w-6 h-6 rounded-md bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm flex items-center justify-center transition"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuCard;

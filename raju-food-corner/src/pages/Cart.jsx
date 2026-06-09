import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, dispatch, totalItems, totalAmount } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 text-center">
        <div className="bg-white rounded-3xl shadow-sm p-12 max-w-xs w-full border border-gray-100">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <svg className="w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-black text-gray-800 mb-2">Cart is empty</h2>
          <p className="text-gray-400 text-sm mb-6">You haven't added anything yet</p>
          <Link to="/menu" className="block w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 rounded-xl text-sm transition">
            Browse Menu →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 py-6 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Your Cart</h1>
          <p className="text-gray-400 text-sm mt-0.5">{totalItems} item{totalItems !== 1 ? 's' : ''} selected</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-3">
        {cart.map(item => (
          <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex gap-3 p-3">
            <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-800 text-sm leading-snug">{item.name}</p>
              <p className="text-xs text-gray-400 mt-0.5">{item.category}</p>
              <p className="text-gray-500 text-sm mt-1">
                ₹{item.price} <span className="text-gray-400">× {item.quantity} =</span>{' '}
                <span className="text-gray-900 font-extrabold">₹{item.price * item.quantity}</span>
              </p>
            </div>

            <div className="flex flex-col items-end justify-between">
              <button
                onClick={() => dispatch({ type: 'REMOVE', id: item.id })}
                className="text-gray-300 hover:text-gray-500 transition p-1 rounded-lg hover:bg-gray-100"
                aria-label="Remove"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-lg px-1 py-0.5">
                <button
                  onClick={() => dispatch({ type: 'DECREASE', id: item.id })}
                  className="w-6 h-6 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md font-bold flex items-center justify-center text-sm transition"
                >
                  −
                </button>
                <span className="w-5 text-center font-bold text-gray-800 text-sm">{item.quantity}</span>
                <button
                  onClick={() => dispatch({ type: 'INCREASE', id: item.id })}
                  className="w-6 h-6 bg-orange-500 hover:bg-orange-600 text-white rounded-md font-bold flex items-center justify-center text-sm transition"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Bill */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mt-2">
          <p className="font-bold text-gray-700 mb-4 text-xs uppercase tracking-widest">Bill Summary</p>
          <div className="space-y-2 text-sm text-gray-500">
            <div className="flex justify-between">
              <span>Subtotal ({totalItems} items)</span>
              <span>₹{totalAmount}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery charges</span>
              <span className="text-green-600 font-semibold">FREE</span>
            </div>
          </div>
          <div className="border-t border-dashed border-gray-200 mt-4 pt-4 flex justify-between items-center">
            <span className="font-black text-gray-900">Grand Total</span>
            <span className="font-black text-gray-900 text-xl">₹{totalAmount}</span>
          </div>
        </div>

        <Link
          to="/checkout"
          className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 rounded-xl text-center text-sm shadow-sm transition-all duration-200 mt-1"
        >
          Proceed to Checkout →
        </Link>
        <button
          onClick={() => dispatch({ type: 'CLEAR' })}
          className="w-full text-gray-400 hover:text-gray-600 font-medium py-2 text-sm transition"
        >
          Clear all items
        </button>
      </div>
    </div>
  );
};

export default Cart;

import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

// Load cart from localStorage
const loadCart = () => {
  try {
    const saved = localStorage.getItem('raju_cart');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.find(i => i.id === action.item.id);
      if (existing) {
        return state.map(i =>
          i.id === action.item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...state, { ...action.item, quantity: 1 }];
    }
    case 'INCREASE':
      return state.map(i =>
        i.id === action.id ? { ...i, quantity: i.quantity + 1 } : i
      );
    case 'DECREASE':
      return state
        .map(i => i.id === action.id ? { ...i, quantity: i.quantity - 1 } : i)
        .filter(i => i.quantity > 0);
    case 'REMOVE':
      return state.filter(i => i.id !== action.id);
    case 'CLEAR':
      return [];
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, [], loadCart);

  // Persist to localStorage on every change
  useEffect(() => {
    localStorage.setItem('raju_cart', JSON.stringify(cart));
  }, [cart]);

  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
  const totalAmount = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, dispatch, totalItems, totalAmount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

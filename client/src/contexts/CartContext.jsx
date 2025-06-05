// @ts-nocheck
import React, { createContext, useReducer, useEffect, useContext, useRef } from 'react';

const CartContext = createContext();

const initialState = {
  cartItems: [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      console.log('🛒 SET_CART → Restored cart:', action.payload);
      return { ...state, cartItems: action.payload };

    case 'ADD_ITEM': {
      const existing = state.cartItems.find(
        (item) =>
          item._id === action.payload._id &&
          item.selectedSize === action.payload.selectedSize
      );
      const quantityToAdd = action.payload.quantity || 1;

      const updatedItems = existing
        ? state.cartItems.map((item) =>
            item._id === action.payload._id &&
            item.selectedSize === action.payload.selectedSize
              ? { ...item, quantity: item.quantity + quantityToAdd }
              : item
          )
        : [...state.cartItems, { ...action.payload, quantity: quantityToAdd }];

      console.log('🟢 ADD_ITEM →', updatedItems);
      return { ...state, cartItems: updatedItems };
    }

    case 'REMOVE_ITEM':
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) =>
            item._id !== action.payload.id ||
            item.selectedSize !== action.payload.selectedSize
        ),
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item._id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case 'CLEAR_CART':
      return { ...state, cartItems: [] };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const hasMounted = useRef(false); // ✅ Prevent early overwrite

  useEffect(() => {
    if (!hasMounted.current) {
      const stored = localStorage.getItem('cart');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          dispatch({ type: 'SET_CART', payload: parsed });
        } catch (err) {
          console.error('❌ Failed to parse cart:', err);
        }
      }
      hasMounted.current = true;
    }
  }, []);

  useEffect(() => {
    if (hasMounted.current) {
      console.log('💾 Saving cart to localStorage:', state.cartItems);
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    }
  }, [state.cartItems]);

  const subtotal = state.cartItems.reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
    0
  );

  return (
    <CartContext.Provider value={{ ...state, dispatch, subtotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);

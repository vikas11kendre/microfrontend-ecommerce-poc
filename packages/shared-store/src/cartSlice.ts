import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { CartItem, CartState } from './types';

const initialState: CartState = {
  items: [],
  totalCount: 0,
  totalPrice: 0,
};

function recalculate(state: CartState) {
  state.totalCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
        });
      }

      recalculate(state);
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      recalculate(state);
    },
    clearCart: () => initialState,
  },
});

export const { actions, reducer } = cartSlice;
export const { addItem, removeItem, clearCart } = actions;
export const cartReducer = reducer;

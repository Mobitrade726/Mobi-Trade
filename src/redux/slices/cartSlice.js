import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  items: [
    {
      id: 1,
      name: 'iPhone 13 Pro',
      image: 'https://i.postimg.cc/qqnTp72r/Depth-4-Frame-1-7.png',
      storage: '256GB',
      price: 79999,
    },
    {
      id: 2,
      name: 'Samsung Galaxy',
      image: 'https://i.postimg.cc/cJHGrhfX/Depth-4-Frame-1-8.png',
      storage: '512GB',
      price: 79999,
    },
    {
      id: 3,
      name: 'iPad Pro',
      image: 'https://i.postimg.cc/Tw58cP7b/Depth-4-Frame-1-9.png',
      storage: '256GB',
      price: 79999,
    },
  ],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearCart: state => {
      state.items = [];
    },

  },
});

export const {addToCart, removeFromCart, clearCart} = cartSlice.actions;
export default cartSlice.reducer;

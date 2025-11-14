// src/redux/store.js
import {configureStore} from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import wishlistReducer from './slices/wishlistSlice';
import homeReducer from './slices/homeSlice';
import catReducer from './slices/catSlice';
import profileReducer from './slices/profileSlice';
import productReducer from './slices/productSlice';
import walletReducer from './slices/walletSlice';
import orderReducer from './slices/orderSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    home: homeReducer,
    cat: catReducer,
    profile: profileReducer,
    product: productReducer,
    wallet: walletReducer,
    orders: orderReducer, // 👈 add here
  },
});

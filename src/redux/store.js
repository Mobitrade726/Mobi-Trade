// src/redux/store.js
import {configureStore} from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import recentlyviewReducer from './slices/recentviewSlice';
import wishlistReducer from './slices/wishlistSlice';
import homeReducer from './slices/homeSlice';
import catReducer from './slices/catSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    recentlyview: recentlyviewReducer,
    wishlist: wishlistReducer,
    home: homeReducer,
    cat: catReducer,
  },
});

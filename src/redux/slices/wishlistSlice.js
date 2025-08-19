// // wishlistSlice.js
// import { createSlice } from "@reduxjs/toolkit";

// const wishlistSlice = createSlice({
//   name: "wishlist",
//   initialState: [],
//   reducers: {
//     toggleWishlist: (state, action) => {
//       const exists = state.find(item => item.id === action.payload.id);
//       if (exists) {
//         return state.filter(item => item.id !== action.payload.id);
//       } else {
//         state.push(action.payload);
//       }
//     },
//   },
// });

// export const { toggleWishlist } = wishlistSlice.actions;
// export default wishlistSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: [],
  reducers: {
    addToWishlist: (state, action) => {
      state.push(action.payload);
    },
    removeFromWishlist: (state, action) => {
      return state.filter(item => item.id !== action.payload);
    },
    toggleWishlist: (state, action) => {
      const exists = state.find(item => item.id === action.payload.id);
      if (exists) {
        return state.filter(item => item.id !== action.payload.id);
      } else {
        state.push(action.payload);
      }
    },
  },
});

export const { addToWishlist, removeFromWishlist, toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;

import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  recentlyView : [
    {
      id: '1',
      image:
        'https://i.postimg.cc/FR7g3304/Whats-App-Image-2025-07-11-at-5-45-27-PM-1.jpg',
      name: 'Samsung Galaxy S21',
      color: 'Black',
      price: '₹20,999',
      originalPrice: '₹24,999',
      grade: 'A1',
      refurbished: true,
    },
    {
      id: '2',
      image:
        'https://i.postimg.cc/FR7g3304/Whats-App-Image-2025-07-11-at-5-45-27-PM-1.jpg',
      name: 'Apple iPhone 13',
      color: 'Midnight',
      price: '₹69,900',
      originalPrice: '₹79,900',
      grade: 'A1',
      refurbished: true,
    },
    {
      id: '3',
      image:
        'https://i.postimg.cc/FR7g3304/Whats-App-Image-2025-07-11-at-5-45-27-PM-1.jpg',
      name: 'OnePlus 9',
      color: 'Winter Mist',
      price: '₹44,999',
      originalPrice: '₹49,999',
      grade: 'A1',
      refurbished: true,
    },
  ],
};

const recentviewSlice = createSlice({
  name: 'recentlyview',
  initialState,
  reducers: {
    recentlyView: state => {
      state.items = [];
    },
  },
});

export const {recentlyView} = recentviewSlice.actions;
export default recentviewSlice.reducer;

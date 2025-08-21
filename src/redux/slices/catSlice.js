import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  carouselData: [
    {
      id: 1,
      image: 'https://i.postimg.cc/9MMJdTFM/Frame-90.png',
      title: 'Get the finest in Smartphones & Laptops, pre-owned & certified.',
      subtitle: 'Best from Your Favourite Brand ',
      titleColor: '#fff',
      subtitleColor: '#fff',
      subtitleMarginTop: 80,
      marginLeft: 40,
    },
    {
      id: 2,
      image: 'https://i.postimg.cc/DyqHyrWk/Content-1.png',
      title: 'Extra 5% Off',
      subtitle: 'On All Prepaid Orders',
      titleColor: '#666666',
      subtitleColor: '#333333',
      subtitleMarginTop: 100,
      marginLeft: 40,
      fontSize: 25,
      fontWeight: 'bold',
    },
    {
      id: 3,
      image: 'https://i.postimg.cc/ZKhsgWwf/Frame-36799-1.png',
      title: 'Hurry!\nFree Delivery',
      subtitle: 'On Every Order — No Minimum Spend',
      titleColor: '#000',
      subtitleColor: '#666666',
      subtitleMarginTop: 10,
      titlewidth: '40%',
      marginLeft: 10,
      titleMarginLeft: 250,
      titleMarginTop: 100,
      titleFontSize: 20,
    },
  ],
  uri: {
    url: 'https://i.postimg.cc/7ZxSBcTt/Whats-App-Image-2025-08-14-at-3-35-45-PM.jpg',
  },
};

const catSlice = createSlice({
  name: 'cat',
  initialState,
  reducers: {
    // No reducers yet, add here later if you need state updates
  },
});

export default catSlice.reducer;

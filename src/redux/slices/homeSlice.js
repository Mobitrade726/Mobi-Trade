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
  categories: [
    {
      id: '1',
      title: 'Android',
      image: 'https://i.postimg.cc/bvfB5mLG/Product-Image-2x.png',
    },
    {
      id: '2',
      title: 'iOS',
      image: 'https://i.postimg.cc/T1K01bCM/Product-Image-1.png',
    },
    {
      id: '3',
      title: 'Windows OS',
      image: 'https://i.postimg.cc/66419sS7/Product-Image-2.png',
    },
    {
      id: '4',
      title: 'MacOS',
      image: 'https://i.postimg.cc/Jht5PZCy/Product-Image-3.png',
    },
  ],
  uri: {
    url: 'https://i.postimg.cc/3wdk2CDW/Banner-Background-1.png',
  },
  mobileBudget: [
    {
      id: '1',
      image:
        'https://i.postimg.cc/B6HGCYW5/A-sleek-smartphone-with-a-modern-design-resting-on-a-wooden-table-surrounded-by-small-decorative-pla.png',
      name: 'Under ₹10,000',
      subname: 'Great for budget buyers',
    },
    {
      id: '2',
      image:
        'https://i.postimg.cc/B6HGCYW5/A-sleek-smartphone-with-a-modern-design-resting-on-a-wooden-table-surrounded-by-small-decorative-pla.png',
      name: '₹20,000 – ₹30,000',
      subname: 'Ideal for beginners ',
    },
    {
      id: '3',
      image:
        'https://i.postimg.cc/B6HGCYW5/A-sleek-smartphone-with-a-modern-design-resting-on-a-wooden-table-surrounded-by-small-decorative-pla.png',
      name: '₹30,000 – ₹40,000',
      subname: 'Premium selections ',
    },
  ],
  LaptopBudget: [
    {
      id: '1',
      image:
        'https://i.postimg.cc/T3pKjD0d/A-sleek-modern-chair-with-a-minimalist-design-placed-in-a-well-lit-room-with-elegant-decor.png',
      name: 'Under ₹20,000',
      subname: 'Ideal for savvy students',
    },
    {
      id: '2',
      image:
        'https://i.postimg.cc/nrFzXjMt/A-sleek-smartphone-with-a-modern-design-resting-on-a-wooden-table-surrounded-by-small-decorative-pla.png',
      name: '₹30,000 – ₹40,000',
      subname: 'Premium selections ',
    },
    {
      id: '3',
      image:
        'https://i.postimg.cc/DZgf3v6p/A-sleek-modern-laptop-placed-on-a-wooden-desk-with-a-potted-plant-beside-it.png',
      name: 'Above ₹40,000',
      subname: 'Luxury Macbooks & Windows PC',
    },
  ],
  offers: [
    {id: '1', image: 'https://i.postimg.cc/sxhk6FPT/Img-Placeholder.png'},
    {id: '2', image: 'https://i.postimg.cc/bJ2V8xGJ/Img-Placeholder-2.png'},
    {id: '3', image: 'https://i.postimg.cc/rFh1ndmY/Img-Placeholder-3.png'},
    {id: '4', image: 'https://i.postimg.cc/kXx4GLrN/Img-Placeholder-4.png'},
  ],
  recentlyView: [
    {
      id: '1',
      image: 'https://i.postimg.cc/FR7g3304/Whats-App-Image.jpg',
      name: 'Samsung Galaxy S21',
      color: 'Black',
      price: '₹20,999',
      originalPrice: '₹24,999',
      grade: 'A1',
      refurbished: true,
    },
    {
      id: '2',
      image: 'https://i.postimg.cc/FR7g3304/Whats-App-Image.jpg',
      name: 'Apple iPhone 13',
      color: 'Midnight',
      price: '₹69,900',
      originalPrice: '₹79,900',
      grade: 'A1',
      refurbished: true,
    },
  ],
  SUPPORT_CARDS: [
    {
      id: '1',
      icon: 'refresh-ccw',
      title: 'Video-Backed Returns',
      description: 'Sales return ticketing with secure video proof.',
    },
    {
      id: '2',
      icon: 'map-pin',
      title: 'Track Your Orders',
      description: 'Real-time updates on your deliveries.',
    },
  ],
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    toggleWishlist: (state, action) => {
      const item = state.recentlyView.find(x => x.id === action.payload);
      if (item) {
        item.wishlist = !item.wishlist;
      }
    },
  },
});

export const {toggleWishlist} = homeSlice.actions;
export default homeSlice.reducer;

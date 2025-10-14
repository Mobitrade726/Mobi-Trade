import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { API_BASE_URL } from '../../utils/utils';

// Fetch cart items from API
export const fetchCartAPI = createAsyncThunk(
  'cart/fetchCartAPI',
  async (_, {rejectWithValue}) => {
    const token = await AsyncStorage.getItem('TOKEN');
    const userId = await AsyncStorage.getItem('USERID');

    try {
      const response = await axios.get(
        `${API_BASE_URL}/cart/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        },
      );

      if (response.data.success && response.data.data) {
        console.log(
          'res++++++++++++++++++++++++++++++',
          response?.data?.data?.items,
        );
        // Make sure to map all needed fields for the UI
        const cartItems = response.data.data.items.map(item => ({
          model: item.model,
          price: parseFloat(item.price) || 0,
          feature_image: item.feature_image || '',
          ram: item.ram || '',
          rom: item.rom || '',
          barcode_id: item.barcode_id || '',
          quantity: item.quantity || '',
          cart_id: response.data.data?.cart_id,
        }));

        return cartItems;
      } else {
        // If API success=false, return empty array
        return [];
      }
    } catch (error) {
      console.log('Cart API error:', error?.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// Add item to cart API
export const addToCartAPI = createAsyncThunk(
  'cart/addToCartAPI',
  async ({product, navigation}, {rejectWithValue}) => {
    const token = await AsyncStorage.getItem('TOKEN');
    const userId = await AsyncStorage.getItem('USERID');

    try {
      const response = await axios.post(
        `${API_BASE_URL}/cart/add`,
        {
          barcode_id: product?.barcode?.barcode_id,
          user_id: userId,
          price: product?.barcode?.purchase_price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.data.success) {
        const productForRedux = {
          id: product.barcode.barcode_id,
          name: product.name,
          image: product.image,
          price: product.barcode.purchase_price,
          storage: product.storage || '',
          quantity: product.quantity || '',
        };
        Toast.show({type: 'success', text1: 'Added to cart'});
        navigation.navigate('Cart', {getproduct : product});
        return productForRedux;
      } else {
        Toast.show({type: 'success', text1: response?.data?.message});
        navigation.navigate('Cart', {getproduct : product});
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// delete cart
export const removeFromCartAPI = createAsyncThunk(
  'cart/removeFromCartAPI',
  async (barcode_id, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('TOKEN');
      const userId = await AsyncStorage.getItem('USERID');

      const response = await axios.delete(
        `${API_BASE_URL}/cart/remove/${userId}/${barcode_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        },
      );
      console.log('respone_____________________', response?.data);
      if (response.data.success) {
        Toast.show({type: 'success', text1: 'Item removed from cart'});
        return barcode_id; // Return the id to remove from Redux
      } else {
        Toast.show({type: 'error', text1: response.data.message});
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      console.log('Remove Cart API error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// Clear cart API
export const clearCartAPI = createAsyncThunk(
  'cart/clearCartAPI',
  async (_, {rejectWithValue}) => {
    const token = await AsyncStorage.getItem('TOKEN');
    const userId = await AsyncStorage.getItem('USERID');

    try {
      const response = await axios.delete(
        `${API_BASE_URL}/cart/clear${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        },
      );

      if (response.data.success) {
        Toast.show({type: 'success', text1: 'Item removed from cart'});
        return true; // 👈 just return success
      } else {
        Toast.show({type: 'error', text1: response.data.message});
        return rejectWithValue(response.data.message || 'Failed to clear cart');
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const checkoutAPI = createAsyncThunk(
  'checkout/checkoutAPI',
  async ({ type, cart_id, barcode_id, single_product_price, navigation }, { rejectWithValue }) => {
    console.log("data===============>", type, cart_id, barcode_id, single_product_price);
    try {
      const token = await AsyncStorage.getItem('TOKEN');
      const userId = await AsyncStorage.getItem('USERID');

      const response = await axios.post(
        `${API_BASE_URL}/checkout`,
        {
          type,
          user_id: userId,
          barcode_id,
          cart_id,
          single_product_price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      console.log("response----------->", response?.data?.data);
      if (response.data.status) {
        console.log('Checkout response:', response.data);
        Toast.show({ type: 'success', text1: response.data.message });

        // navigate after checkout success
        navigation.navigate('Checkout', {
          checkoutData: response.data.data,
        });

        return response.data.data;
      } else {
        Toast.show({ type: 'error', text1: response.data.message });
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      console.log('Checkout error:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);


const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearCart: state => {
      state.items = [];
    },
  },
  extraReducers: builder => {
    builder
      // fetchCartAPI
      .addCase(fetchCartAPI.pending, state => {
        state.loading = true;
      })
      .addCase(fetchCartAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCartAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // addToCartAPI
      .addCase(addToCartAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })

      // removeFromCartAPI
      .addCase(removeFromCartAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(item => item.id !== action.payload);
      })

      // clearCartAPI
      .addCase(clearCartAPI.pending, state => {
        state.loading = true;
      })
      .addCase(clearCartAPI.fulfilled, state => {
        state.loading = false;
        state.items = []; // 👈 empty cart in Redux
      })
      .addCase(clearCartAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {removeFromCart, clearCart} = cartSlice.actions;
export default cartSlice.reducer;

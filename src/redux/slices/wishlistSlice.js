import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { API_BASE_URL } from '../../utils/utils';

// ✅ Fetch wishlist from API
export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (_, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('TOKEN');
      const userId = await AsyncStorage.getItem('USERID'); // ✅ read inside thunk
      console.log('userId=------->', userId);

      const response = await axios.get(
        `${API_BASE_URL}/wishlist/${userId}`,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data.data; // returns wishlist array
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// ✅ Add to wishlist (API + Redux)
export const addToWishlistAPI = createAsyncThunk(
  'wishlist/addToWishlistAPI',
  async (item, {rejectWithValue}) => {
    try {
      console.log('📦 Product received:', item); // 👈 Add this log

      const token = await AsyncStorage.getItem('TOKEN');
      const userId = await AsyncStorage.getItem('USERID'); // ✅ read inside thunk

      const payload = {
        user_id: userId,
        barcode_id: item.barcode_id,
      };

      console.log('📤 Sending Payload Add:', payload);

      const response = await axios.post(
        `${API_BASE_URL}/wishlist/add`,
        payload,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      Toast.show({
        type: 'success',
        text2: response?.data?.message,
      });
      return item;
    } catch (error) {
      Toast.show({
        type: 'error',
        text2: error.response?.data || error.message,
      });
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// ✅ Remove from wishlist (API + Redux)
export const removeFromWishlistAPI = createAsyncThunk(
  'wishlist/removeFromWishlistAPI',
  async (item, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('TOKEN');
      const userId = await AsyncStorage.getItem('USERID'); // ✅ read inside thunk
      const payload = {
        user_id: userId,
        barcode_id: item.barcode_id,
      };
      console.log('📤 Sending Payload Removed:', payload);

      const response = await axios.post(
        `${API_BASE_URL}/wishlist/remove`,
        payload,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      Toast.show({
        type: 'success',
        text2: response?.data?.message,
      });
      return item;
    } catch (error) {
      Toast.show({
        type: 'error',
        text2: error?.response?.data?.message || error.message,
      });
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      // Fetch
      .addCase(fetchWishlist.pending, state => {
        state.loading = true;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload || [];
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add
      .addCase(addToWishlistAPI.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // Remove
      .addCase(removeFromWishlistAPI.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  },
});

export default wishlistSlice.reducer;


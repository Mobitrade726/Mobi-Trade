import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {API_BASE_URL} from '../../utils/utils';

// =====================================================
// 🔹 Async Thunk: Fetch Product List
// =====================================================
export const fetchProductList = createAsyncThunk(
  'product/fetchProductList',
  async (_, {rejectWithValue}) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/product/list`);
      return res?.data?.data || [];
    } catch (error) {
      Toast.show({
        type: 'error',
        text2: error?.response?.data?.message || 'Failed to fetch products',
      });
      return rejectWithValue(error.response?.data);
    }
  },
);
// =====================================================
// 🔹 Async Thunk: Fetch Product List
// =====================================================
export const fetchProductLatestStock = createAsyncThunk(
  'product/fetchProductLatestStock',
  async (_, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('TOKEN');
      if (!token) {
        return rejectWithValue('User not logged in');
      }
      const res = await axios.get(`${API_BASE_URL}/lateststocklist`, {
        headers: {Authorization: `Bearer ${token}`},
      });
      return res?.data?.data || [];
    } catch (error) {
      Toast.show({
        type: 'error',
        text2: error?.response?.data?.message || 'Failed to fetch products',
      });
      return rejectWithValue(error.response?.data);
    }
  },
);

// =====================================================
// 🔹 Async Thunk: Add Recently Viewed Product
// =====================================================
export const addRecentlyViewed = createAsyncThunk(
  'product/addRecentlyViewed',
  async (barcode_id, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('TOKEN');
      const user_id = await AsyncStorage.getItem('USERID');

      if (!token || !user_id) {
        return rejectWithValue('User not logged in');
      }

      const res = await axios.post(
        `${API_BASE_URL}/recently-viewed/add`,
        {user_id, barcode_id},
        {headers: {Authorization: `Bearer ${token}`}},
      );
      Toast.show({
        type: 'success',
        text1: res?.data?.message,
      });
      console.log('Recently viewed added:', res?.data?.data);
      return res?.data?.data;
    } catch (error) {
      console.log('Error adding recently viewed:', error?.response?.data);
      return rejectWithValue(error?.response?.data);
    }
  },
);

// =====================================================
// 🔹 3️⃣ Fetch Filter API
// =====================================================
export const fetchFilterData = createAsyncThunk(
  'product/fetchFilterData',
  async (_, {rejectWithValue}) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/filterapi`);
      console.log(
        'Filter API response slice------------------>:',
        res?.data?.filters,
      );
      return res?.data?.filters || [];
    } catch (error) {
      console.log('Filter API error:', error?.response?.data);
      Toast.show({
        type: 'error',
        text2: error?.response?.data?.message || 'Failed to fetch filters',
      });
      return rejectWithValue(error.response?.data);
    }
  },
);

// =====================================================
// 🔹 3️⃣ Fetch recently viewed products
// =====================================================
export const fetchRecentlyViewed = createAsyncThunk(
  'products/fetchRecentlyViewed',
  async (_, {rejectWithValue}) => {
    try {
      const user_id = await AsyncStorage.getItem('USERID');
      const token = await AsyncStorage.getItem('TOKEN');

      const response = await axios.get(
        `${API_BASE_URL}/recently-viewed/${user_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.data.status && response.data.data) {
        return response.data.data; // ✅ this will be payload
      } else {
        return rejectWithValue(
          response.data.message || 'Failed to fetch recently viewed',
        );
      }
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error.message);
    }
  },
);

// =====================================================
// 🔹 Slice Definition
// =====================================================
const productSlice = createSlice({
  name: 'product',
  initialState: {
    productData: [],
    recentlyViewed: [],
    addrecentlyview: [],
    filterdata: [],
    lateststock: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      // ✅ Product List
      .addCase(fetchProductList.pending, state => {
        state.loading = true;
      })
      .addCase(fetchProductList.fulfilled, (state, action) => {
        state.loading = false;
        state.productData = action.payload;
      })
      .addCase(fetchProductList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Recently Viewed Added
      .addCase(addRecentlyViewed.pending, state => {
        state.loading = true;
      })
      .addCase(addRecentlyViewed.fulfilled, (state, action) => {
        state.loading = false;
        state.addrecentlyview = action.payload;
      })
      .addCase(addRecentlyViewed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Filter API
      .addCase(fetchFilterData.pending, state => {
        state.loading = true;
      })
      .addCase(fetchFilterData.fulfilled, (state, action) => {
        state.loading = false;
        state.filterdata = action.payload;
      })
      .addCase(fetchFilterData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Recently Viewed
      .addCase(fetchRecentlyViewed.pending, state => {
        state.loading = true;
      })
      .addCase(fetchRecentlyViewed.fulfilled, (state, action) => {
        state.loading = false;
        state.recentlyview = action.payload;
      })
      .addCase(fetchRecentlyViewed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ✅ Recently Viewed
      .addCase(fetchProductLatestStock.pending, state => {
        state.loading = true;
      })
      .addCase(fetchProductLatestStock.fulfilled, (state, action) => {
        state.loading = false;
        state.lateststock = action.payload;
      })
      .addCase(fetchProductLatestStock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;

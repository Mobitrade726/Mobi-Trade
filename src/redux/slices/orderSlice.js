// import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Toast from 'react-native-toast-message';
// import {API_BASE_URL} from '../../utils/utils';

// // 🧩 1️⃣ Fetch Orders API
// export const fetchOrdersAPI = createAsyncThunk(
//   'orders/fetchOrdersAPI',
//   async (userId, {rejectWithValue}) => {
//     try {
//       const token = await AsyncStorage.getItem('TOKEN');
//       const response = await axios.get(
//         `${API_BASE_URL}/fetchorders/${userId}`,
//         {
//           headers: {
//             Accept: 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       if (response.data.status) {
//         return response.data.data;
//       } else {
//         Toast.show({type: 'error', text1: response.data.message});
//         return rejectWithValue(response.data.message);
//       }
//     } catch (error) {
//       console.log(
//         'fetchOrdersAPI Error:',
//         error?.response?.data || error.message,
//       );
//       return rejectWithValue(error?.response?.data || error.message);
//     }
//   },
// );

// // ✅ Async thunk to fetch order details
// export const fetchOrderDetailsAPI = createAsyncThunk(
//   'orders/fetchOrderDetails',
//   async (order_id, {rejectWithValue}) => {
//     try {
//       const response = await axios.get(
//         `${API_BASE_URL}/fetchordersdetail/${order_id}`,
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || 'Something went wrong');
//     }
//   },
// );

// // 🧩 2️⃣ Slice
// const orderSlice = createSlice({
//   name: 'orders',
//   initialState: {
//     orderList: [],
//     loading: false,
//     error: null,
//     orderDetails: null,
//   },
//   reducers: {
//     clearOrders: state => {
//       state.orderList = [];
//       state.error = null;
//       state.loading = false;
//     },
//   },
//   extraReducers: builder => {
//     builder
//       .addCase(fetchOrdersAPI.pending, state => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchOrdersAPI.fulfilled, (state, action) => {
//         state.loading = false;
//         state.orderList = action.payload;
//       })
//       .addCase(fetchOrdersAPI.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || 'Failed to fetch orders';
//       })

//       .addCase(fetchOrderDetailsAPI.pending, state => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchOrderDetailsAPI.fulfilled, (state, action) => {
//         state.loading = false;
//         state.orderDetails = action.payload;
//       })
//       .addCase(fetchOrderDetailsAPI.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const {clearOrders} = orderSlice.actions;
// export default orderSlice.reducer;



import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { API_BASE_URL } from '../../utils/utils';

// 🧩 1️⃣ Fetch All Orders API
export const fetchOrdersAPI = createAsyncThunk(
  'orders/fetchOrdersAPI',
  async (userId, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('TOKEN');

      const response = await axios.get(`${API_BASE_URL}/fetchorders/${userId}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.status) {
        return response.data.data;
      } else {
        Toast.show({ type: 'error', text1: response.data.message });
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      console.log('fetchOrdersAPI Error:', error?.response?.data || error.message);
      return rejectWithValue(error?.response?.data || error.message);
    }
  },
);

// 🧩 2️⃣ Fetch Order Details API
export const fetchOrderDetailsAPI = createAsyncThunk(
  'orders/fetchOrderDetailsAPI',
  async (order_id, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('TOKEN');

      const response = await axios.get(`${API_BASE_URL}/fetchordersdetail/${order_id}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.status) {
        Toast.show({ type: 'success', text1: 'Order details loaded successfully' });
        return response.data.data;
      } else {
        Toast.show({ type: 'error', text1: response.data.message });
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      console.log('fetchOrderDetailsAPI Error:', error?.response?.data || error.message);
      return rejectWithValue(error?.response?.data || error.message);
    }
  },
);

// 🧩 3️⃣ Slice Definition
const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orderList: [],
    orderDetails: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearOrders: (state) => {
      state.orderList = [];
      state.orderDetails = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Orders
      .addCase(fetchOrdersAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.orderList = action.payload;
      })
      .addCase(fetchOrdersAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch orders';
      })

      // Fetch Order Details
      .addCase(fetchOrderDetailsAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderDetailsAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload;
      })
      .addCase(fetchOrderDetailsAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch order details';
      });
  },
});

export const { clearOrders } = orderSlice.actions;
export default orderSlice.reducer;

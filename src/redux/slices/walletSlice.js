import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import { API_BASE_URL } from '../../../utils/utils';
import {API_BASE_URL} from '../../../../utils/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ✅ Fetch Wallet Balance
export const fetchWalletBalance = createAsyncThunk(
  'wallet/fetchWalletBalance',
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('TOKEN');
      const userId = await AsyncStorage.getItem('USERID');

      const response = await axios.get(`${API_BASE_URL}/wallet/${userId}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error fetching balance');
    }
  },
);

// ✅ Update Wallet After Razorpay Payment
export const updateWalletAfterPayment = createAsyncThunk(
  'wallet/updateWalletAfterPayment',
  async (payload, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('TOKEN');
      const response = await axios.post(
        `${API_BASE_URL}/wallet/verify`,
        payload,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error updating wallet');
    }
  },
);

const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    balance: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchWalletBalance.pending, state => {
        state.loading = true;
      })
      .addCase(fetchWalletBalance.fulfilled, (state, action) => {
        state.loading = false;
        state.balance = action.payload?.balance || 0;
      })
      .addCase(fetchWalletBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateWalletAfterPayment.fulfilled, (state, action) => {
        state.balance = action.payload?.new_balance || state.balance;
      });
  },
});

export default walletSlice.reducer;

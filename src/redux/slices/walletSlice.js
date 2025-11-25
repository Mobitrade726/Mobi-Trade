import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_BASE_URL} from '../../utils/utils';

// ✅ Fetch Wallet Balance
export const fetchWalletBalance = createAsyncThunk(
  'wallet/fetchWalletBalance',
  async (_, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('TOKEN');
      const userId = await AsyncStorage.getItem('USERID');

      const payload = {
        buyer_id: userId,
      };

      const response = await axios.post(
        `${API_BASE_URL}/wallet/balance`,
        payload,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error fetching balance');
    }
  },
);
// ✅ Fetch Latest history
export const fetchLatestWalletHistory = createAsyncThunk(
  'wallet/fetchLatestWalletHistory',
  async (_, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('TOKEN');
      const userId = await AsyncStorage.getItem('USERID');

      const url = `${API_BASE_URL}/wallet/latesthistory/${userId}`;

      const response = await axios.get(url, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data; // return API response
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Error fetching wallet history',
      );
    }
  },
);

// ✅ Update Wallet After Razorpay Payment
export const updateWalletAfterPayment = createAsyncThunk(
  'wallet/updateWalletAfterPayment',
  async (payload, {rejectWithValue}) => {
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
    balance: [],
    latesthistory: [], // ✅ new state for latest history
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchWalletBalance.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWalletBalance.fulfilled, (state, action) => {
        state.loading = false;
        state.balance = action.payload?.balance || 0; // ✅ extract balance
      })
      .addCase(fetchWalletBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateWalletAfterPayment.fulfilled, (state, action) => {
        state.balance = action.payload?.new_balance || state.balance;
      })

      // fetchLatestWalletHistory
      .addCase(fetchLatestWalletHistory.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLatestWalletHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.history = action.payload || []; // store history in state
      })
      .addCase(fetchLatestWalletHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default walletSlice.reducer;

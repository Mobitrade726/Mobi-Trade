import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchBuyerAddress = createAsyncThunk(
  'buyerAddress/fetchBuyerAddress',
  async (_, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('TOKEN');
      const userId = await AsyncStorage.getItem('USERID'); // ✅ read inside thunk

      const response = await axios.get(
        `https://api.mobitrade.in/api/buyer-address/${userId}`,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

const buyerAddressSlice = createSlice({
  name: 'buyerAddress',
  initialState: {
    addresses: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchBuyerAddress.pending, state => {
        state.loading = true;
      })
      .addCase(fetchBuyerAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload.data || [];
      })
      .addCase(fetchBuyerAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default buyerAddressSlice.reducer;

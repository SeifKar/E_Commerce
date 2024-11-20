import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fetchAddresses = createAsyncThunk(
  'addresses/fetchAddresses',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(`${API_URL}/addresses`, config);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch addresses'
      );
    }
  }
);

export const addAddress = createAsyncThunk(
  'addresses/addAddress',
  async (addressData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `${API_URL}/addresses`,
        addressData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to add address'
      );
    }
  }
);

export const updateAddress = createAsyncThunk(
  'addresses/updateAddress',
  async ({ id, ...addressData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${API_URL}/addresses/${id}`,
        addressData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update address'
      );
    }
  }
);

export const deleteAddress = createAsyncThunk(
  'addresses/deleteAddress',
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(`${API_URL}/addresses/${id}`, config);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete address'
      );
    }
  }
);

export const setDefaultAddress = createAsyncThunk(
  'addresses/setDefault',
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${API_URL}/addresses/${id}/default`,
        {},
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to set default address'
      );
    }
  }
);

const addressSlice = createSlice({
  name: 'addresses',
  initialState: {
    addresses: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearAddressState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch addresses
      .addCase(fetchAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload;
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add address
      .addCase(addAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.addresses.push(action.payload);
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update address
      .addCase(updateAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const index = state.addresses.findIndex(
          (addr) => addr._id === action.payload._id
        );
        if (index !== -1) {
          state.addresses[index] = action.payload;
        }
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete address
      .addCase(deleteAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.addresses = state.addresses.filter(
          (addr) => addr._id !== action.payload
        );
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Set default address
      .addCase(setDefaultAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setDefaultAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.addresses = state.addresses.map((addr) => ({
          ...addr,
          isDefault: addr._id === action.payload._id,
        }));
      })
      .addCase(setDefaultAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAddressState } = addressSlice.actions;
export default addressSlice.reducer;

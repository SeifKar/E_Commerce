import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${API_URL}/users/profile`,
        profileData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update profile'
      );
    }
  }
);

export const changePassword = createAsyncThunk(
  'profile/changePassword',
  async (passwordData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${API_URL}/users/password`,
        passwordData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to change password'
      );
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearProfileState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProfileState } = profileSlice.actions;
export default profileSlice.reducer;

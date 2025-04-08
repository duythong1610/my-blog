// lib/features/user/userSlice.ts
import { authApi } from "@/api/auth.api";
import { User } from "@/types/user";
import { setToken } from "@/utils/auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface UserState {
  info: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Khởi tạo state ban đầu
const initialState: UserState = {
  info: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const getProfile = createAsyncThunk(
  "user/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authApi.profile();
      return response.data;
    } catch (error: any) {
      rejectWithValue(error.response.data.message || "Get profile failed");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      setToken(action.payload);
    },
    logout: (state) => {
      state.info = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      setToken("");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.info = action.payload;
    });
  },
});

// Export action logout và reducer
export const { logout, login } = userSlice.actions;
export default userSlice.reducer;

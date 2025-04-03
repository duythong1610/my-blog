// lib/features/user/userSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { setToken } from "@/utils/auth";
import { authApi } from "@/api/auth.api";
import { set } from "lodash";
import { User } from "@/types/user";

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

// Tạo async thunk cho việc đăng nhập
export const login = createAsyncThunk(
  "user/login",
  async (
    { username, password }: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await authApi.login({ username, password });
      return response.data;
    } catch (error) {}
  }
);

export const getProfile = createAsyncThunk("user/getProfile", async () => {
  try {
    const response = await authApi.profile();
    return response.data;
  } catch (error) {}
});

// Tạo slice với các reducers
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.info = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      setToken(action.payload); // Giả sử bạn có setToken function
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.info = action.payload;
    });
  },
});

// Export action logout và reducer
export const { logout } = userSlice.actions;
export default userSlice.reducer;

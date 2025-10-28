import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiAxios } from "../../axios";

// 🟠 تسجيل الدخول
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await apiAxios.post("/users/login", { email, password });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 🟢 التسجيل (Register)
export const register = createAsyncThunk(
  "auth/register",
  async ({ name, email, password, phone, role }, { rejectWithValue }) => {
    try {
      const res = await apiAxios.post("/users/register", {
        name,
        email,
        password,
        phone,
        role,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ تسجيل الدخول
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })

      // ✅ التسجيل
      .addCase(register.fulfilled, (state, action) => {
        if (action.payload.token) {
          // لو السيرفر بيرجع توكن
          state.user = action.payload.user;
          state.token = action.payload.token;
          localStorage.setItem("token", action.payload.token);
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        } else {
          // لو السيرفر بيرجع بس بيانات المستخدم
          state.user = action.payload.user || null;
        }
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

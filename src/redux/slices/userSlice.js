import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiAxios } from "../../axios";

// ✅ Get all users
export const getAllUsers = createAsyncThunk("users/getAllUsers", async () => {
  const res = await apiAxios.get("/users/users");
  return res.data.data;
});

// ✅ Get single user by ID
export const getUserById = createAsyncThunk("users/getUserById", async (id) => {
  const res = await apiAxios.get(`/users/users/${id}`);
  return res.data.data;
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    singleUser: null,
  },
  extraReducers: (builder) => {
    builder
      // ✅ كل المستخدمين
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      // ✅ مستخدم واحد
      .addCase(getUserById.fulfilled, (state, action) => {
        state.singleUser = action.payload;
      });
  },
});

export default userSlice.reducer;

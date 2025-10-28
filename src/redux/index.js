import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import propertiesReducer from "./slices/propertySlice";
import usersReducer from "./slices/userSlice";


export const myStore = configureStore({
  reducer: {
    authReducer,
    propertiesReducer,
    usersReducer,
  },
});

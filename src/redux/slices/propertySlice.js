import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiAxios } from "../../axios";

// ✅ Get all properties
export const getALLproperty = createAsyncThunk(
  "properties/getAllProperties",
  async () => {
    const res = await apiAxios.get("/properties/");
    return res.data.data;
  }
);


// ✅ Get developer properties
export const getDeveloperProperties = createAsyncThunk(
  "properties/getDeveloperProperties", // 🔹 غير الاسم
  async () => {
    const res = await apiAxios.get("/properties/developers");
    return res.data.data;
  }
);


// ✅ Get property by ID
export const getPropertyById = createAsyncThunk(
  "properties/getPropertyById",
  async (id) => {
    const res = await apiAxios.get(`/properties/${id}`);
    return res.data;
  }
);

// ✅ Get properties of current seller
export const getSellerProperties = createAsyncThunk(
  "properties/getSellerProperties",
  async () => {
    const res = await apiAxios.get("/properties/seller/me");
    return res.data.data;
  }
);

// ✅ Delete property
export const deleteProperty = createAsyncThunk(
  "properties/deleteProperty",
  async (id, { rejectWithValue }) => {
    try {
      await apiAxios.delete(`/properties/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const updateProperty = createAsyncThunk(
  "properties/updateProperty",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const res = await apiAxios.put(`/properties/${id}`, updatedData);
      console.log("🔥 API Response:", res.data); // 👈 شوف الـ response

      // تأكد من الـ structure الصح
      return res.data.property || res.data.data || res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);



// ✅ Create new property
export const createProperty = createAsyncThunk(
  "properties/createProperty",
  async (newProperty, { rejectWithValue }) => {
    try {
      const res = await apiAxios.post("/properties/", newProperty);
      return res.data.property;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const propertySlice = createSlice({
  name: "properties",
  initialState: {
    properties: [],
    sellerProperties: [],
    developerProperties: [], // 🔹 جديد
    singleProperty: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getALLproperty.fulfilled, (state, action) => {
        state.properties = action.payload;
      })
      .addCase(getPropertyById.fulfilled, (state, action) => {
        state.singleProperty = action.payload;
      })
      .addCase(createProperty.fulfilled, (state, action) => {
        state.properties.push(action.payload);
      })
      .addCase(getSellerProperties.fulfilled, (state, action) => {
        state.sellerProperties = action.payload;
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.sellerProperties = state.sellerProperties.filter(
          (property) => property._id !== action.payload
        );
        state.properties = state.properties.filter(
          (property) => property._id !== action.payload
        );
      })
      .addCase(updateProperty.fulfilled, (state, action) => {
        state.loading = false;

        // ✅ تحديث باستخدام map لضمان immutability
        state.sellerProperties = state.sellerProperties.map((property) =>
          property._id === action.payload._id ? action.payload : property
        );

        state.properties = state.properties.map((property) =>
          property._id === action.payload._id ? action.payload : property
        );
      })
      .addCase(getDeveloperProperties.fulfilled, (state, action) => {
        state.developerProperties = action.payload;
      });
  },
});

export default propertySlice.reducer;

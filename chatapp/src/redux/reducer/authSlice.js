import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api";
export const login = createAsyncThunk(
  "auth/login",
  async ({ data, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.login(data);
      setTimeout(() => {
        toast("Login successfully");
        navigate("/");
      }, 1000);
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async ({ data, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.register(data);
      setTimeout(() => {
        toast("Register successfully");
        navigate("/");
      }, 1000);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const searchUser = createAsyncThunk(
  "auth/searchUser",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await api.getUser(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    close: false,
    user: null,
    users: [],
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("user");
      state.user = null;
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      // state.loading = false;
      localStorage.setItem("user", JSON.stringify({ ...action.payload }));
      // localStorage.setItem("token", action.payload.token);
      // localStorage.setItem(
      //   "user",
      //   JSON.stringify({ ...action.payload.result })
      // );
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [register.pending]: (state) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      // state.loading = false;
      localStorage.setItem("user", JSON.stringify({ ...action.payload }));

      // localStorage.setItem("token", action.payload.token);
      // localStorage.setItem(
      //   "user",
      //   JSON.stringify({ ...action.payload.result })
      // );
      state.user = action.payload;
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [searchUser.pending]: (state) => {
      state.loading = true;
    },
    [searchUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    [searchUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;

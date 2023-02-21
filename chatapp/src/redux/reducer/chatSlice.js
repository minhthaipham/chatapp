import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api";

export const accessChat = createAsyncThunk(
  "chat/getChat",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.accessChat(data);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const createGroup = createAsyncThunk(
  "chat/createGroup",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.createGroup(data);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const getCurrentChat = createAsyncThunk(
  "chat/getCurrentChat",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.getChat(id);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const reNameGroup = createAsyncThunk(
  "chat/reNameGroup",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.reNameGroup(data);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);
const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: null,
    check: false,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state, action) => {
      state.chats = null;
      state.loading = false;
      state.error = null;
    },
    back: (state, action) => {
      state.check = false;
    },
  },
  extraReducers: {
    [accessChat.pending]: (state, action) => {
      state.loading = true;
    },
    [accessChat.fulfilled]: (state, action) => {
      state.loading = false;
      state.chats = action.payload;
      state.check = true;
    },
    [accessChat.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [createGroup.pending]: (state, action) => {
      state.loading = true;
    },
    [createGroup.fulfilled]: (state, action) => {
      state.loading = false;
      state.chats = action.payload;
    },
    [createGroup.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getCurrentChat.pending]: (state, action) => {
      state.loading = true;
    },
    [getCurrentChat.fulfilled]: (state, action) => {
      state.loading = false;
      state.chats = action.payload;
      state.check = true;
    },
    [getCurrentChat.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [reNameGroup.pending]: (state, action) => {
      state.loading = true;
    },
    [reNameGroup.fulfilled]: (state, action) => {
      state.loading = false;
      state.chats = action.payload;
    },
    [reNameGroup.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const { logout, back } = chatSlice.actions;
export default chatSlice.reducer;

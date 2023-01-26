import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api";

export const sendMessage = createAsyncThunk(
  "message/sendMessage",
  async (data, { rejectWithValue }) => {
    console.log(data);
    try {
      const response = await api.sendMessage(data);
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const getMessage = createAsyncThunk(
  "chat/getMessage",
  async ({ id }, { rejectWithValue }) => {
    console.log(id);
    try {
      const response = await api.getMessages(id);
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

const messageSlice = createSlice({
  name: "message",
  initialState: {
    messages: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [sendMessage.pending]: (state, action) => {
      state.loading = true;
    },
    [sendMessage.fulfilled]: (state, action) => {
      state.loading = false;
      state.messages = action.payload;
    },
    [sendMessage.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getMessage.pending]: (state, action) => {
      state.loading = true;
    },
    [getMessage.fulfilled]: (state, action) => {
      state.loading = false;
      state.messages = action.payload;
    },
    [getMessage.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default messageSlice.reducer;

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
  async ({ data, toast }, { rejectWithValue }) => {
    try {
      const res = await api.createGroup(data);
      return res.data;
    } catch (e) {
      toast.error(e.response.data.message);
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

export const addMembers = createAsyncThunk(
  "chat/addMembers",
  async ({ data, toast }, { rejectWithValue }) => {
    try {
      const res = await api.addMembers(data);
      toast("Add member successfully");
      return res.data;
    } catch (e) {
      toast.error(e.response.data.message);
    }
  }
);

export const leaveRoom = createAsyncThunk(
  "chat/leaveRoom",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.leaveRoom(data);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const deleteRoom = createAsyncThunk(
  "chat/deleteRoom",
  async ({ data, toast }, { rejectWithValue }) => {
    try {
      const res = await api.deleteGroup(data);
      toast("Delete group successfully");
      return res.data;
    } catch (e) {
      toast.error(e.response.data.message);
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
    checkgorup: false,
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
    [addMembers.pending]: (state, action) => {
      state.loading = true;
    },
    [addMembers.fulfilled]: (state, action) => {
      state.loading = false;
      state.chats = action.payload;
    },
    [addMembers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [leaveRoom.pending]: (state, action) => {
      state.loading = true;
    },
    [leaveRoom.fulfilled]: (state, action) => {
      state.loading = false;
      state.chats = action.payload;
    },
    [leaveRoom.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [deleteRoom.pending]: (state, action) => {
      state.loading = true;
      state.checkgorup = true;
    },
    [deleteRoom.fulfilled]: (state, action) => {
      state.loading = false;
      state.chats = action.payload;
      state.checkgorup = false;
    },
    [deleteRoom.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.checkgorup = false;
    },
  },
});
export const { logout, back } = chatSlice.actions;
export default chatSlice.reducer;

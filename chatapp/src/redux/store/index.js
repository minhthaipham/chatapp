import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../reducer/authSlice";
import modalSlice from "../reducer/modalSlice";
import chatSlice from "../reducer/chatSlice";
import messageSlice from "../reducer/messageSlice";
export default configureStore({
  reducer: {
    auth: authSlice,
    modal: modalSlice,
    message: messageSlice,
    chat: chatSlice,
  },
});

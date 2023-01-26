import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isOpen: false,
    isOpenSideBar: false,
  },
  reducers: {
    closeModal: (state) => {
      state.isOpen = !state.isOpen;
    },
    closeSideBar: (state) => {
      state.isOpenSideBar = !state.isOpenSideBar;
    },
  },
});

export const { closeModal, closeSideBar } = modalSlice.actions;
export default modalSlice.reducer;

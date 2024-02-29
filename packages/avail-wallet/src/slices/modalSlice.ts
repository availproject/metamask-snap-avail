import { createSlice } from '@reduxjs/toolkit';

export interface modalState {
  infoModalVisible: boolean;
}

const initialState: modalState = {
  infoModalVisible: false
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setInfoModalVisible: (state, { payload }) => {
      state.infoModalVisible = payload;
    }
  }
});

export const { setInfoModalVisible } = modalSlice.actions;

export default modalSlice.reducer;

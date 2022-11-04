import { createSlice } from '@reduxjs/toolkit';

const initialGagState = {
  show: false,
  data: null
}

export const gagSlice = createSlice({
  name: 'gag',
  initialState: initialGagState,
  reducers: {
    resetGag: () => initialGagState,
    setGag: (state, data) => {
      state.show = true;
      state.data = data.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { resetGag, setGag } = gagSlice.actions;

export default gagSlice.reducer;

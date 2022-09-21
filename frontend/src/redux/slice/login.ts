import { createSlice } from '@reduxjs/toolkit';
// import moment from 'moment';

const loginSlice = createSlice({
  name: 'login',
  initialState: { username: '' },
  reducers: {
    setUsername(state, action) {
      state.username = action.payload;
    },
  },
});
export const loginActions = loginSlice.actions;
export default loginSlice.reducer;

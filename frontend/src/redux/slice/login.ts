import { createSlice } from '@reduxjs/toolkit';
// import moment from 'moment';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    userInfo: { height: 0, weight: 0, name: '', birthDay: '', gender: '' },
  },
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
  },
});
export const loginActions = loginSlice.actions;
export default loginSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
// import moment from 'moment';

const refrigeratorSlice = createSlice({
  name: 'refrigerator',
  initialState: { ingredientList: [] },
  reducers: {
    setIngredients(state, action) {
      state.ingredientList = action.payload;
    },
  },
});
export const refrigeratorActions = refrigeratorSlice.actions;
export default refrigeratorSlice.reducer;

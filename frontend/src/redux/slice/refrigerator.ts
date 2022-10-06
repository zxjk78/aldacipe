import { createSlice } from '@reduxjs/toolkit';
// import moment from 'moment';
import { Ingredient } from '../../util/interface';

const refrigeratorState = () => {
  return {
    cookingIngredientList: [] as Ingredient[],
    isCook: false,
  };
};

const refrigeratorSlice = createSlice({
  name: 'refrigerator',
  initialState: refrigeratorState,
  reducers: {
    addIngredients(state, action) {
      state.cookingIngredientList = [
        ...state.cookingIngredientList,
        action.payload,
      ];
    },
    removeIngredients(state, action) {
      const tmpArr = state.cookingIngredientList;
      for (let i = 0; i < tmpArr.length; i++) {
        if (tmpArr[i].id === action.payload.id) {
          tmpArr.splice(i, 1);
        }
      }
      state.cookingIngredientList = tmpArr;
    },
    emptyIngredients(state) {
      state.cookingIngredientList = [];
    },
    toggleIsCook(state) {
      state.isCook = !state.isCook;
    },
  },
});
export const refrigeratorActions = refrigeratorSlice.actions;
export default refrigeratorSlice.reducer;

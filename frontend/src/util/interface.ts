// main, search
export interface Recipe_carousel {
  id: number;
  name: string;
  image: string;
  weight: number;
}

export interface Recipe_detail {
  evaluationList: [];
  ingredientList: [];
  ingredientListIHave: [];
  manualList: [];
  nutrient: {};
  recipe: Recipe_carousel;
  userEvaluationInfo: {};
}

// search, mypage
export interface Ingredient {
  id: string;
  name: string;
  largeCategory: string;
  smallCategory: string;
}

// mypage
export interface MyInfomation {
  height: number;
  weight: number;
  gender: string;
  birthDay: Date;
}

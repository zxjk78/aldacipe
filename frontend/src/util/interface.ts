// main, search
export interface Recipe {
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
  recipe: Recipe;
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

// detail
export interface Manual {
  image: string;
  instruction: string;
  order: number;
}

export interface RecipeDetail {
  evaluationList: [];
  ingredientList: Ingredient[];
  ingredientListIHave: [];
  manualList: Manual[];
  nutrient: {};
  recipe: Recipe;
  userEvaluationInfo: { didEvaluate: boolean; score: number };
}

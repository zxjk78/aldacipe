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
  id: number;
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

// 냉장고

export interface IngredientIHave extends Ingredient {
  expirationDate: Date;

  weight: number;
}

// recipe detail
export interface Manual {
  image: string;
  instruction: string;
  order: number;
}

export interface Review {
  score: number;
  userId: number;
  userName: string;
}

export interface Nutrient {
  biotin: number;
  calcium: number;
  carbohydrate: number;
  cholesterol: number;
  copper: number;
  dietaryFiber: number;
  fat: number;
  folicAcid: number;
  id: string;
  iodine: number;
  iron: number;
  kcal: number;
  magnesium: number;
  manganese: number;
  moisture: number;
  molybdenum: number;
  niacin: number;
  omega3FattyAcids: number;
  pantothenicAcid: number;
  phosphorus: number;
  potassium: number;
  protein: number;
  selenium: number;
  sodium: number;
  sugar: number;
  transFattyAcid: number;
  vitaminB12: number;
  vitaminB6: number;
  vitaminC: number;
  vitaminD: number;
  vitaminE: number;
  vitaminK: number;
  zinc: number;
}

export interface RecipeDetail {
  evaluationList: Review[];
  ingredientList: Ingredient[];
  ingredientListIHave: IngredientIHave[];
  manualList: Manual[];
  nutrient: Nutrient;
  recipe: Recipe;
  userEvaluationInfo: { didEvaluate: boolean; score: number };
}

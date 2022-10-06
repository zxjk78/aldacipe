import { Ingredient, IngredientIHave, Nutrient, NutObj } from './interface';
import { nutritionDictionary, largeCategoryDictionary } from './data';
import { ingredient } from '../components/refrigerator/interface';
// 있는재료 없는재료 양념 리스트 출력함수
export const calculateIngredient = (
  allIngredient: Ingredient[],
  myIngredient: IngredientIHave[]
) => {
  const myIngredientIdArray = myIngredient.map((item) => item.id);
  const spiceArray: Ingredient[] = allIngredient.filter(
    (item) => item.smallCategory === '조미료류'
  );
  const spiceIdArray = spiceArray.map((item) => item.id);

  const notMyIngredientArray: Ingredient[] = allIngredient.filter(
    (item) =>
      !spiceIdArray.includes(item.id) && !myIngredientIdArray.includes(item.id)
  );

  return [myIngredient, notMyIngredientArray, spiceArray];
};

// 영양소 목록 받아서, 주요, 비타민, 무기질, 당류, 지방산, 기타의 6개 배열로 분류하는 함수
export const categorializeNutrient = (nutrient: Nutrient) => {
  const categoryArr: { categoryName: string; itemArr: NutObj[] }[] = [
    { categoryName: '주요 영양소', itemArr: [] }, //0
    { categoryName: '당류', itemArr: [] }, //1
    { categoryName: '지방산', itemArr: [] }, //2
    { categoryName: '비타민', itemArr: [] }, //3
    { categoryName: '무기질', itemArr: [] }, //4
    { categoryName: '기타', itemArr: [] }, //5
  ];

  for (const key in nutrient) {
    if (key === 'id') continue;
    let category = nutritionDictionary[key].category;
    let s = nutritionDictionary[key].scale;
    categoryArr[category].itemArr.push({
      name: key,
      value: +nutrient[key],
      scale: s,
    });
  }

  return categoryArr;
};
export const sortByLargeCategory = (ingredients: Ingredient[]) => {
  const categoryList: any = [[], [], [], [], [], [], []];

  for (const item of ingredients) {
    categoryList[largeCategoryDictionary[item.largeCategory]].push(item);
  }

  return [...categoryList];
};

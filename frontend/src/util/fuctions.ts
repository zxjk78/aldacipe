import { Ingredient, IngredientIHave } from './interface';

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

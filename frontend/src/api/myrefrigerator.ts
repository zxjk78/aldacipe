import { ingredient } from '../components/refrigerator/interface';
import { axiosAuthInstance } from './config/apiController';

export const getRefrigerator = async () => {
  try {
    const response = await axiosAuthInstance.get(
      `user/${localStorage.getItem('userId')}/refrigerator/`
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};
export const addMyRefrigeList = async (
  ingredientId: number,
  ingreData: { expirationDate: string; weight: number }
) => {
  const data = {
    expirationDate: ingreData.expirationDate,
    weight: ingreData.weight,
  };
  try {
    const response: any = await axiosAuthInstance.post(
      `user/${localStorage.getItem('userId')}/refrigerator/${ingredientId}`,
      data
    );

    return response.data.success;
  } catch (error: any) {
    return error.response.data.code;
    // return error.response.config
  }
};

// 냉장고 재료로 만들 수 있는 요리

export const searchRecipeBySelectedIngredient = async (ingreData: string) => {
  try {
    const response = await axiosAuthInstance.get(
      `recipe/search?ingredient=${ingreData}&with-food=false`
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

import { axiosAuthInstance } from './apiController';
import { API_URL } from './http-config';

// 제목에 맞는 요리 5개만 추천해주는
export const searchRecipeByKeyword = async (keyword: string) => {
  try {
    const response: {
      data: { recipe: string[] };
    } = await axiosAuthInstance.get(API_URL + `어쩌고${keyword}`, {});

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const searchIngredient = async (keyword: string) => {
  try {
    const response: { data: { ingredient: string[] } } =
      await axiosAuthInstance.get(API_URL + `어쩌고${keyword}`, {});

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

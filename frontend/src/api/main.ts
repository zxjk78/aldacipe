import { axiosAuthInstance } from './config/apiController';
import { API_URL } from './config/http-config';

// 냉장고 재료로 만들 수 있는 요리
export const refrigeratorRecipe = async () => {
  try {
    const response = await axiosAuthInstance.get(API_URL + 'recipe/cookable');
    console.log(response.data.data);

    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

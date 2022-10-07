import { axiosAuthInstance } from './config/apiController';

// 냉장고 재료로 만들 수 있는 요리
export const refrigeratorRecipe = async () => {
  try {
    const response = await axiosAuthInstance.get('recipe/cookable');
    // console.log('냉장고 성공')
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

export const userLikeRecipe = async () => {
  try {
    const response = await axiosAuthInstance.get('recipe/likable');
    // console.log('유저 성공')
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

export const popularRecipe = async () => {
  try {
    const response = await axiosAuthInstance.get('recipe/popular');
    // console.log('인기 성공')
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

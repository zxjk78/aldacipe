import { axiosAuthInstance } from './config/apiController';

export const fetchRecipe = async (recipeId: number) => {
  try {
    const response: any = await axiosAuthInstance.get(`recipe/${recipeId}`);

    return response.data.data;
  } catch (error) {
    console.log(error);
    return -1;
  }
};

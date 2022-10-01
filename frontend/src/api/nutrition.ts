import { axiosAuthInstance } from './config/apiController';

export const fetchRecipeNutrition = async (recipeId: number) => {
  try {
    const response: any = await axiosAuthInstance.get(
      `recipe/${recipeId}/nutrient`
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

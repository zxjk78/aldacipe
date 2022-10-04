import { axiosAuthInstance } from './config/apiController';

export const fetchRecipeNutrition = async (
  foodId: number,
  foodType: string
) => {
  if (!foodId) return;
  try {
    const response: any = await axiosAuthInstance.get(
      `recipe/${foodId}/nutrient`,
      { params: { type: foodType.toLowerCase() } }
    );

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

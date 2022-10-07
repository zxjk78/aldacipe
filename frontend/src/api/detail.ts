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
export const fetchReview = async (recipeId: number) => {
  try {
    const response: any = await axiosAuthInstance.get(
      `recipe/${recipeId}/review`
    );
    // console.log(response.data.data);

    return response.data.data;
  } catch (error) {
    console.log(error);
    return -1;
  }
};

export const createReview = async (recipeId: number, contents: string) => {
  try {
    const response: any = await axiosAuthInstance.post(
      `recipe/${recipeId}/review`,
      { contents }
    );
    // console.log(response);

    return response.data.success;
  } catch (error) {
    console.log(error);
  }
};
export const createRating = async (recipeId: number, rating: number) => {
  try {
    const response: any = await axiosAuthInstance.post(
      `recipe/${recipeId}/evaluation`,
      { score: rating }
    );
    // console.log(response);

    return response.data.success;
  } catch (error) {
    console.log(error);
  }
};
export const createIntakeInDetail = async (recipeId: number) => {
  try {
    const response: any = await axiosAuthInstance.put(
      `recipe/${recipeId}/intake`
    );
    // console.log(response);

    return response.data.success;
  } catch (error) {
    console.log(error);
  }
};

import { Axios, AxiosError } from 'axios';
import { axiosAuthInstance } from './config/apiController';

export const fetchUserIntake = async (date: string, setFnc: any) => {
  try {
    const response = await axiosAuthInstance.get(
      `user/${localStorage.getItem('userId')}/intake?date=${date}`
    );
    // console.log(response.data.data);

    setFnc(response.data.data);
  } catch (error) {
    console.log(error);
  }
};
export const addUserIntake = async (data: any) => {
  try {
    const response = await axiosAuthInstance.post(
      `user/${localStorage.getItem('userId')}/intake`,
      data
    );
    return response.data.success;
  } catch (error) {
    console.log(error);
  }
};

export const fetchUserNutrientByPeriod = async (period: string) => {
  try {
    const response = await axiosAuthInstance.get(
      `user/${localStorage.getItem('userId')}/nutrient?period=${period}`
    );

    return response.data.data;
  } catch (error: any) {
    console.log(error);

    if (error.response.data.code === 1018) {
      return '섭취 기록이 존재하지 않습니다.';
    }
  }
};

export const fetchWeekDetail = async () => {
  try {
    const response = await axiosAuthInstance.get(
      `user/${localStorage.getItem('userId')}/nutrient/detail`
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
export const deleteUserIntake = async (intakeId: number) => {
  try {
    const response: any = await axiosAuthInstance.delete(
      `user/${localStorage.getItem('userId')}/intake/${intakeId}`
    );
    return response.data.success;
  } catch (error) {
    console.log(error);
  }
};
export const fetchIngredientNutrition = async (ingredientId: number) => {
  try {
    const response = await axiosAuthInstance.get(
      `ingredient/${ingredientId}/nutrient`
    );

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
export const fetchHealthyRecipe = async () => {
  try {
    // 임시로 인기 레시피로 포맷 잡기
    const response = await axiosAuthInstance.get(`recipe/healthy`);
    // const response = await axiosAuthInstance.get(`recipe/popular`);
    console.log(response);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

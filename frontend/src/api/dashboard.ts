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

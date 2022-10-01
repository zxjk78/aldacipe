import { Dispatch } from 'react';
import { axiosAuthInstance } from './config/apiController';

export const fetchUserIntake = async (date: string, setFnc: any) => {
  try {
    const response = await axiosAuthInstance.get(
      `user/${localStorage.getItem('userId')}/intake?date=${date}`
    );
    console.log(response.data.data);

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

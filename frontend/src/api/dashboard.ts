import { Dispatch } from 'react';
import { axiosAuthInstance } from './config/apiController';

export const fetchUserIntake = async (date: string, setFnc: any) => {
  try {
    const response = await axiosAuthInstance.get(
      `/user/${localStorage.getItem('userId')}/intage`,
      {
        data: {
          date,
        },
      }
    );
    console.log(response.data.data);

    setFnc(response.data.data);
  } catch (error) {
    console.log(error);
  }
};

import { API_URL } from './config/http-config';
import { axiosCommonInstance } from './config/apiController';

export const signup = async (userInfo: {
  email: string;
  password: string;
  gender: string;
  height: number;
  weight: number;
  name: string;
}) => {
  try {
    const response: any = await axiosCommonInstance.post(`signup`, userInfo);

    return response.data.success;
  } catch (error) {
    console.error(error);
  }
};

export const emailDupCheck = async (enteredEmail: string) => {
  try {
    const response = await axiosCommonInstance.get('check-email', {
      params: { email: enteredEmail },
    });

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

import { API_URL } from './config/http-config';
// import { axiosPostCommonInstance } from './apiController';
import axios from 'axios';

export const signup = async (userInfo: {
  email: string;
  password: string;
  gender: string;
  height: number;
  weight: number;
}) => {
  try {
    const response: any = await axios.post(API_URL + `signup`, userInfo, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data.success;
  } catch (error) {
    console.error(error);
  }
};

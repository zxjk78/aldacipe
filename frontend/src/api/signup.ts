import { API_URL } from './http-config';
import axios from 'axios';

export const signUp = async (userInfo: {
  email: string;
  name: string;
  password: string;
}) => {
  try {
    const response: {
      success: boolean;
      code: string;
      message: string;
    } = await axios.post(API_URL + `signup`, userInfo);

    return response.success;
  } catch (error) {
    console.error(error);
  }
};

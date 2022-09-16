import axios, { AxiosResponse } from 'axios';
import { API_URL } from './http-config';
export const searchKeyword = async (keyword: string) => {
  try {
    const response: {
      data: { recipe: string[]; ingredient: string[] };
    } = await axios.get(API_URL + `어쩌고${keyword}`, {});

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const searchIngredient = async (keyword: string) => {
  try {
    const response: { data: { ingredient: string[] } } = await axios.get(
      API_URL + `어쩌고${keyword}`,
      {}
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

import { axiosAuthInstance } from './config/apiController';

// 제목에 맞는 요리 5개만 추천해주는
export const searchRecipeByKeyword = async (keyword: string) => {
  try {
    // console.log('레시피 키워드검색');

    const response: any = await axiosAuthInstance.get(
      `recipe/search?keyword=${keyword}&ingredient=${''}`
    );
    // console.log(response.data.data);

    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};
export const searchRecipeByKeyword2 = async (keyword: string) => {
  try {
    // console.log('레시피 키워드검색 + 요리 포함');

    const response: any = await axiosAuthInstance.get(
      `recipe/search?keyword=${keyword}&ingredient=${''}&with-food=true`
    );
    // console.log(response.data.data);

    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

// 재료 검색
export const searchIngredient = async (keyword: string) => {
  try {
    const response: any = await axiosAuthInstance.get(
      `ingredient/search?keyword=${keyword}`
    );

    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchSearchRecipe = async (
  keyword: string,
  ingredientString: string
) => {
  try {
    console.log('검색키워드:', keyword, '\n재료코드:', ingredientString);

    const response = await axiosAuthInstance.get(
      `recipe/search?keyword=${keyword}&ingredient=${ingredientString}`
    );
    // console.log(response.data.data);

    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

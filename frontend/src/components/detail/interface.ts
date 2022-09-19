export interface Ingredient {
  isExist: boolean;
  name: string;
  amount: number;
}
export interface Recipe {
  id: number;
  name: string;
  img_bg: string;
  img_sm: string;
  recipe_ingredient: Ingredient[];
  manual: {
    order: string;
    instruction: string;
    image: string;
  };
  evaluation: {
    score: number;
  };
  review: {
    user_name: string;
    comment: string;
    score: number;
    img: string;
  };
}

export interface Review {
  id: number;
  author: string;
  content: string;
  createdDate: Date;
  score: number;
}

export const dummyReview: Review[] = [
  {
    id: 1,
    author: 'string',
    content: 'string',
    createdDate: new Date(),
    score: 2,
  },
  {
    id: 2,
    author: 'absada',
    content: '내용입니다.',
    createdDate: new Date(),
    score: 2.53,
  },
];

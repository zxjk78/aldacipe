// react core
import React from 'react';

// API

// external module

// external component

// custom component

// css, interface(type)
import classes from './SearchResultListItem.module.scss';
import { Ingredient } from '../../util/interface';
// etc
import { ingredientCategoryDictionary } from '../../util/data';
import imageArr from '../../assets/ingredients';

const SearchResultListItem = (props: {
  ingredient: Ingredient;
  addItem: (ingredientId: number) => void;
}) => {
  // dataset을 지정한 div에서만 사용하기 위해서는 이렇게 명시해주어야 함. event의 target은 document, element, window가 될 수 있기 때문
  const addIngredient = (event: React.SyntheticEvent) => {
    if (!(event.target instanceof HTMLDivElement)) return;

    props.addItem(+event.target.dataset.idx!);
  };
  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.main}>
          <div>
            <img
              src={
                imageArr[
                  ingredientCategoryDictionary[props.ingredient.smallCategory]
                ]
              }
              alt="재료이미지"
            />
          </div>
          <div>{props.ingredient.name}</div>
          <div onClick={addIngredient} data-idx={props.ingredient.id}>
            추가
          </div>
        </div>
      </div>
    </>
  );
};
export default SearchResultListItem;

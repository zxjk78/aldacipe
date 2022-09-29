// custom component
import { useState } from 'react';
import CustomTable from './IngredientTable';
import IngredientToggle from './IngredientToggle';
import IngredientList from './IngredientList';
// css, interface
import classes from './IngredientContainer.module.scss';
import { Recipe, Ingredient, RecipeDetail } from '../../../util/interface';
import { API_URL } from '../../../api/config/http-config';
import { calculateIngredient } from '../../../util/fuctions';
/* 
있는 재료 없는 재료, 양념을 그냥 나누어서 3개의 영역에 모아서 보여줄 것


을 위해서는 있는 재료, 없는 재료, 소분류 양념까지 따져야 함

*/

const IngredientContainer = (props: { recipeInfo: RecipeDetail }) => {
  const {
    recipe,
    ingredientList: allIngre,
    ingredientListIHave: myIngre,
  } = props.recipeInfo;

  const [myIngredient, notMyIngredient, spiceArray] = calculateIngredient(
    allIngre,
    myIngre
  );

  const imgErrorhandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = require('../../../assets/recipeImgNotfound.png');
  };
  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.header}>{recipe.name}</div>
        <div className={classes.main}>
          <img
            src={`${API_URL}image/${recipe.image}`}
            className={classes.recipeImg}
            alt="레시피 큰 이미지"
            onError={imgErrorhandler}
          />
          <div className={classes.ingredientContainer}>
            <div>
              <IngredientList
                title="나에게 있는 재료"
                ingredients={myIngredient}
              />
            </div>
            <div>
              <IngredientList
                title="나에게 없는 재료"
                ingredients={notMyIngredient}
              />
            </div>
            <div>
              <IngredientList title="양념" ingredients={spiceArray} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IngredientContainer;

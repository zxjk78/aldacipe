// custom component
import { useState } from 'react';
import CustomTable from './IngredientTable';
import IngredientToggle from './IngredientToggle';
import { Recipe, Ingredient } from '../interface';

// css
import classes from './IngredientContainer.module.scss';

const Ingred: React.FC<{ ingredients: Ingredient[] }> = (props) => {
  const tmp = [
    { name: '밥', amount: 123, isExist: true },
    { name: '빵', amount: 123, isExist: false },
  ];
  return (
    <>
      {/* <CustomTable ingredients={props.ingredients} /> */}
      <CustomTable ingredients={tmp} />
    </>
  );
};
const Spice: React.FC<{ ingredients: Ingredient[] }> = (props) => {
  const tmp = [
    { name: '후추', amount: 123, isExist: true },
    { name: '설탕', amount: 123, isExist: false },
  ];
  return (
    <>
      {/* <CustomTable ingredients={props.ingredients} /> */}
      <CustomTable ingredients={tmp} />
    </>
  );
};

const IngredientContainer: React.FC<{ recipe: any }> = (props) => {
  const recipe = props.recipe;
  const [isSpice, setIsSpice] = useState(false);
  const toggleSpice = () => {
    setIsSpice((prev) => !prev);
  };
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
            src={''}
            className={classes.recipeImg}
            alt="레시피 큰 이미지"
            onError={imgErrorhandler}
          />
          <div>
            <div className={classes.toggle}>
              <IngredientToggle toggleSpice={toggleSpice} />
            </div>
            {/* filter 주어서 소분류 조미료, 식재료 구분해서 띄우기 */}
            {!isSpice ? (
              <Ingred ingredients={recipe.recipe_ingredient} />
            ) : (
              <Spice ingredients={recipe.recipe_ingredient} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default IngredientContainer;

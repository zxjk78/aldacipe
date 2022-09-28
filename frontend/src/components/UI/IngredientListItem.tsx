// react core

// API

// external module

// external component

// custom component

// css, interface(type)
import classes from './IngredientListItem.module.scss';
import { Ingredient } from '../../util/interface';
const IngredientListItem = (props: {
  ingredient: Ingredient;
  addBlackList?: (ingredientId: number) => void;
}) => {
  const addBlackList = () => {
    props.addBlackList!(+props.ingredient.id);
  };
  return (
    <>
      <div className={classes.container}>
        <div className={classes.main}>
          <div>
            <div>
              <img src="" alt="재료" />
            </div>
            <div>{props.ingredient.name}</div>
          </div>
          <div onClick={addBlackList}>추가</div>
        </div>
      </div>
    </>
  );
};
export default IngredientListItem;

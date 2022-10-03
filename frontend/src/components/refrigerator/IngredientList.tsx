// react core

// API

// external module

// external component

// custom component

// css, interface(type)
import classes from './IngredientList.module.scss';
import { Ingredient } from '../../util/interface';

const IngredientList = (props: {
  ingredient: Ingredient;
  addRefrigeList: (ingredientId: number) => void;
}) => {
  const addRefrigeList = () => {
    props.addRefrigeList!(+props.ingredient.id);
  };
  return (
    <>
      <div className={classes.container}>
        <div className={classes.main}>
          <div>
            <div>{props.ingredient.name}</div>
          </div>
          <div className={classes.button} onClick={addRefrigeList}>추가</div>
        </div>
      </div>
    </>
  );
};
export default IngredientList;

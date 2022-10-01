// react core

// API

// external module

// external component

// custom component
import IngredientListItem from '../../UI/IngredientListItem';

// css, interface(type)
import classes from './IngredientList.module.scss';
import { Ingredient, IngredientIHave } from '../../../util/interface';
const IngredientList = (props: {
  ingredients: Ingredient[] | IngredientIHave[];
  title: string;
}) => {
  return (
    <>
      <div className={classes.container}>
        <div className={classes.main}>
          <div>{props.title}</div>

          <div className={classes.amount}> {props.ingredients.length}</div>
          <div className={classes.content}>
            {props.ingredients.map((item) => (
              <IngredientListItem key={item.id} ingredient={item} isNormal />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default IngredientList;

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
        <div className={classes.header}>
          <div>{props.title}</div>
          <div>총 {props.ingredients.length}개</div>
        </div>
        <div className={classes.main}>
          {props.ingredients.map((item) => (
            <IngredientListItem ingredient={item} isNormal />
          ))}
        </div>
      </div>
    </>
  );
};
export default IngredientList;

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
  type: string;
}) => {
  return (
    <>
      <div className={classes.container}>
        <div className={`${classes.main} ${classes[props.type]}`}>
          <div className={classes.title}>{props.title}</div>

          <div className={`${classes.amount} ${classes[props.type]}`}>
            {props.ingredients.length}
          </div>
          <div className={classes.content}>
            {props.ingredients.map((item, index) => (
              <IngredientListItem
                key={item.id + '' + index}
                ingredient={item}
                isNormal
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default IngredientList;

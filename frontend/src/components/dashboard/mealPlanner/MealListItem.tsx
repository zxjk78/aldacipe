// react core

// API

// external module

// external component

// custom component

// css, interface(type)
import classes from './MealListItem.module.scss';
import { Meal } from '../../../util/interface';
export default function MealListItem(props: { meal: Meal }) {
  const modifyHandler = () => {};
  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.left}>
            <div>
              <img
                src="https://img.freepik.com/free-photo/cheesy-tokbokki-korean-traditional-food-on-black-board-background-lunch-dish_1150-42993.jpg?size=626&ext=jpg"
                alt="그림"
              />
            </div>
            <div className={classes.foodName}>
              <div>{props.meal.name}</div>
            </div>
          </div>
          <div className={classes.right}>
            <div onClick={modifyHandler}>수정</div>
            <div>
              {9999} <span> Kcal</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

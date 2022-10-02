// react core

// API

// external module

// external component

// custom component
import NutritionInfo from '../../UI/NutritionInfo';
// css, interface(type)
import classes from './MealDetail.module.scss';
import { Nutrient, Intake } from '../../../util/interface';
const MealDetail = (props: { foodInfo: Nutrient }) => {
  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.header}></div>
          <div className={classes.main}>
            <NutritionInfo nutrition={props.foodInfo} dashboard />
          </div>
          <div className={classes.footer}></div>
        </div>
      </div>
    </>
  );
};
export default MealDetail;

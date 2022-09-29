// react core

// API

// external module

// external component

// custom component

// css, interface(type)
import classes from './NutrientContainer.module.scss';
import { Nutrient } from '../../../util/interface';
const NutrientContainer = (props: { nutrient: Nutrient }) => {
  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.header}>영양정보</div>
          <div className={classes.main}>{props.nutrient.biotin}</div>
        </div>
      </div>
    </>
  );
};
export default NutrientContainer;

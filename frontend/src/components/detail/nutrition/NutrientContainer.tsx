// react core

// API

// external module

// external component

// custom component

// css, interface(type)
import classes from './NutrientContainer.module.scss';

const NutrientContainer = (props: {}) => {
  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.header}>영양정보</div>
          <div className={classes.main}></div>
        </div>
      </div>
    </>
  );
};
export default NutrientContainer;

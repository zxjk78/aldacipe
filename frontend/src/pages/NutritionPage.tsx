// react core

// API

// external module

// external component

// custom component

// css, interface(type)
import classes from './NutritionPage.module.scss';

export default function NutritionPage(props: {}) {
  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.graphWeek}></div>
          <div className={classes.meal}></div>
          <div className={classes.graphDay}></div>
          <div className={classes.graphMonth}></div>
          <div className={classes.overall}></div>
        </div>
      </div>
    </>
  );
}

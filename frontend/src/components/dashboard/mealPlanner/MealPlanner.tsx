// react core

// API

// external module

// external component

// custom component
import MealListItem from './MealListItem';
// css, interface(type)
import classes from './MealPlanner.module.scss';

export default function MealPlanner(props: {}) {
  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.header}>오늘 식단</div>
          <div className={classes.main}>
            {[1, 2, 3].map((item) => (
              <MealListItem />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

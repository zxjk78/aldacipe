// custom component
import GraphWeek from './graph/GraphWeek';
import Detail from './datail/Detail';
import MealPlanner from './mealPlanner/MealPlanner';
// css
import classes from './Nutrients.module.scss';

const Nutrients = () => {
  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.title}>영양관리</div>
        <div className={classes.container}>
          <div className={classes.graphWeek}>
            <GraphWeek />
          </div>
          <div className={classes.graphDay}></div>
          <div className={classes.graphMonth}></div>
          <div className={classes.mealPlanner}>
            <MealPlanner />
          </div>
          <div className={classes.detail}>
            <Detail />
          </div>
        </div>
      </div>
    </>
  );
};

export default Nutrients;

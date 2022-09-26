// custom component
import GraphWeek from '../components/dashboard/graph/GraphWeek';
import Detail from '../components/dashboard/datail/Detail';
import MealPlanner from '../components/dashboard/mealPlanner/MealPlanner';
// css
import classes from './DashboardPage.module.scss';

const DashboardPage = () => {
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

export default DashboardPage;

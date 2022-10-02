// custom component
import RadarChart from '../components/dashboard/graph/RadarChart';
import Detail from '../components/dashboard/datail/Detail';
import MealPlanner from '../components/dashboard/mealPlanner/MealPlanner';
import MealSearch from '../components/dashboard/mealPlanner/MealSearch';
import MealDetail from '../components/dashboard/mealPlanner/MealDetail';
// css
import classes from './DashboardPage.module.scss';
import { useState } from 'react';

const DashboardPage = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [foodId, setFoodId] = useState(0);

  const handleFoodDetail = (foodId: number) => {
    setFoodId((prev) => foodId);
    setIsDetailVisible(true);
  };
  const handleDetailClose = () => {
    setIsDetailVisible(false);
  };
  const handleSearchOpen = () => {
    setIsSearching(true);
  };
  const handleSearchClose = () => {
    setIsSearching(false);
  };
  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.title}>영양관리</div>
        <div className={classes.container}>
          <div className={classes.graphWeek}>
            <RadarChart period="week" />
          </div>
          <div className={classes.graphDay}>
            {!isSearching ? (
              <RadarChart period="day" />
            ) : (
              <MealSearch onSearchClose={handleSearchClose} />
            )}
          </div>
          {isDetailVisible && (
            <div className={classes.recipeDetail}>
              <MealDetail foodId={foodId} onDetailClose={handleDetailClose} />
            </div>
          )}
          <div className={classes.graphMonth}>
            <RadarChart period="month" />
          </div>
          <div className={classes.mealPlanner}>
            <MealPlanner
              onSearch={handleSearchOpen}
              onFoodDetail={handleFoodDetail}
            />
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

// external module
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
// custom component
import RadarChart from '../components/dashboard/graph/RadarChart';
import Detail from '../components/dashboard/datail/Detail';
import MealPlanner from '../components/dashboard/mealPlanner/MealPlanner';
import MealSearch from '../components/dashboard/mealPlanner/MealSearch';
import MealDetail from '../components/dashboard/mealPlanner/MealDetail';
import RecommendRecipe from '../components/dashboard/recommendRecipe/RecommendRecipe';
// css
import classes from './DashboardPage.module.scss';
import React, { useRef, useState } from 'react';

const DashboardPage = () => {
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [isMealPlannerUpdated, setIsMealPlannerUpdated] = useState(false);
  const [isNutChartUpdated, setIsNutChartUpdated] = useState(false);
  const [chartPeriod, setChartPeriod] = useState('day');
  const [foodInfo, setFoodInfo] = useState<{
    foodId: number;
    foodType: string;
  }>({
    foodId: 0,
    foodType: '',
  });
  const searchRefs = useRef<HTMLDivElement[] | null[]>([]);

  const infoToastr = (message: string) =>
    toast.info(<div className={classes.errorMsg}>{message}</div>);

  const handleFoodDetail = (foodId: number, foodType: string) => {
    setFoodInfo(() => {
      return { foodId: foodId, foodType: foodType };
    });
    setIsDetailVisible(true);
  };
  const handleDetailClose = () => {
    setIsDetailVisible(false);
  };

  const handlePeriodChange = (
    event: React.MouseEvent<HTMLElement>,
    newPeriod: string
  ) => {
    setChartPeriod(newPeriod);
  };

  const handleSearchOpen = () => {
    searchRefs.current[0]!.classList.remove(classes.visible);
    searchRefs.current[1]!.classList.remove(classes.fadeOut);
    setTimeout(() => {
      searchRefs.current[0]!.classList.add(classes.fadeOut);
    }, 100);
    setTimeout(() => {
      searchRefs.current[0]!.classList.add(classes.notVisible);
    }, 500);
    setTimeout(() => {
      searchRefs.current[1]!.classList.remove(classes.notVisible);
      searchRefs.current[1]!.classList.add(classes.visible);
    }, 600);
  };
  const handleSearchClose = (isAdded: boolean) => {
    if (isAdded) {
      infoToastr('섭취한 음식을 기록하였습니다.');
    }
    searchRefs.current[1]!.classList.remove(classes.visible);
    searchRefs.current[0]!.classList.remove(classes.fadeOut);
    setTimeout(() => {
      searchRefs.current[1]!.classList.add(classes.fadeOut);
    }, 100);
    setTimeout(() => {
      searchRefs.current[1]!.classList.add(classes.notVisible);
    }, 500);
    setTimeout(() => {
      searchRefs.current[0]!.classList.remove(classes.notVisible);
      searchRefs.current[0]!.classList.add(classes.visible);
    }, 600);

    // mealPlanner, pieChart에 신호 전달
    setIsMealPlannerUpdated((prev) => !prev);
    setIsNutChartUpdated((prev) => !prev);
  };
  return (
    <>
      <div className={classes.wrapper}>
        <div>
          <ToastContainer autoClose={2000} closeOnClick />
        </div>
        <div className={classes.title}>영양관리</div>
        <div className={classes.container}>
          <div className={classes.recommendRecipe}>
            <RecommendRecipe />
          </div>

          <div className={classes.chartOrSearch}>
            <div
              className={classes.nutritionChart}
              ref={(ele) => (searchRefs.current[0] = ele)}
            >
              <div className={classes.nutHeader}>
                <div>섭취 영양소</div>
                <div className={classes.periodToggle}>
                  <ToggleButtonGroup
                    color="success"
                    size="small"
                    value={chartPeriod}
                    exclusive
                    onChange={handlePeriodChange}
                    aria-label="Platform"
                  >
                    <ToggleButton value="day">Day</ToggleButton>
                    <ToggleButton value="week">Week</ToggleButton>
                    <ToggleButton value="month">Month</ToggleButton>
                  </ToggleButtonGroup>
                </div>
              </div>
              <RadarChart period={chartPeriod} isUpdated={isNutChartUpdated} />
            </div>
            <div
              className={classes.notVisible}
              ref={(ele) => (searchRefs.current[1] = ele)}
            >
              <MealSearch onSearchClose={handleSearchClose} />
            </div>
          </div>
          {isDetailVisible && (
            <div className={classes.recipeDetail}>
              <MealDetail
                foodInfo={foodInfo}
                onDetailClose={handleDetailClose}
              />
            </div>
          )}

          <div className={classes.mealPlanner}>
            <MealPlanner
              onSearch={handleSearchOpen}
              onFoodDetail={handleFoodDetail}
              isUpdated={isMealPlannerUpdated}
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

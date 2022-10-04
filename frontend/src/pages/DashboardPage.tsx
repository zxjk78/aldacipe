// external module
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// custom component
import RadarChart from '../components/dashboard/graph/RadarChart';
import Detail from '../components/dashboard/datail/Detail';
import MealPlanner from '../components/dashboard/mealPlanner/MealPlanner';
import MealSearch from '../components/dashboard/mealPlanner/MealSearch';
import MealDetail from '../components/dashboard/mealPlanner/MealDetail';
// css
import classes from './DashboardPage.module.scss';
import { useRef, useState } from 'react';

const DashboardPage = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [foodId, setFoodId] = useState(0);
  const searchRefs = useRef<HTMLDivElement[] | null[]>([]);

  const infoToastr = (message: string) =>
    toast.info(<div className={classes.errorMsg}>{message}</div>);

  const handleFoodDetail = (foodId: number) => {
    setFoodId((prev) => foodId);
    setIsDetailVisible(true);
  };
  const handleDetailClose = () => {
    setIsDetailVisible(false);
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

    setIsSearching(true);
  };
  const handleSearchClose = () => {
    infoToastr('섭취한 음식을 기록하였습니다.');
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

    setIsSearching(false);
  };
  return (
    <>
      <div className={classes.wrapper}>
        <div>
          <ToastContainer autoClose={2000} closeOnClick />
        </div>
        <div className={classes.title}>영양관리</div>
        <div className={classes.container}>
          <div className={classes.graphWeek}>
            <RadarChart period="week" />
          </div>
          <div className={classes.graphDay}>
            <div ref={(ele) => (searchRefs.current[0] = ele)}>
              <RadarChart period="day" />
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

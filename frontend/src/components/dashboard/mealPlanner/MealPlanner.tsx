// react core
import { useEffect, useState } from 'react';

// API
import { fetchUserIntake } from '../../../api/dashboard';
// external module
import moment from 'moment';
// external component
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// custom component

import MealListItem from './MealListItem';
// css, interface(type)
import classes from './MealPlanner.module.scss';
import { Intake } from '../../../util/interface';
// etc
import mealEmpty from '../../../assets/mealPlanner_empty.png';


// 부모: DashboardPage
export default function MealPlanner(props: {
  isUpdated: boolean;
  onSearch: () => void;
  onFoodDetail: (intakeRedocd: Intake) => void;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [mealList, setMealList] = useState<Intake[]>([]);
  useEffect(() => {
    setIsLoading(true);

    fetchUserIntake(moment(new Date()).format('YYYY-MM-DD'), setMealList);

    setIsLoading(false);
  }, [props.isUpdated]);
  const handleSearchOpen = () => {
    // setModalOpen(true);
    props.onSearch();
  };

  const handleFoodDetailOpen = (intakeRecode: Intake) => {
    props.onFoodDetail(intakeRecode);
  };
  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.header}>
            <div>오늘 먹은 음식</div>
            <div className={classes.addMeal} onClick={handleSearchOpen}>
              <div>
                <AddCircleOutlineIcon fontSize="small" />
              </div>
              <div>식사 추가하기</div>
            </div>
          </div>
          <div className={classes.main}>
            {mealList.length === 0 ? (
              <div className={classes.empty}>
                <img src={mealEmpty} width={'200px'} alt="재료이미지" />
                <div>
                  먹은 음식을
                  <br /> 추가해주세요
                </div>
              </div>
            ) : (
              mealList.map((item) => (
                <MealListItem
                  key={item.id}
                  intake={item}
                  onFoodDetail={handleFoodDetailOpen}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// react core
import { useState, useEffect } from 'react';

// API
import { fetchRecipeNutrition } from '../../../api/nutrition';
// external module

// external component

// custom component
import NutritionInfo from '../../UI/NutritionInfo';
// css, interface(type)
import classes from './MealDetail.module.scss';
import { Nutrient } from '../../../util/interface';
const MealDetail = (props: { foodId: number; onDetailClose: () => void }) => {
  const [foodInfo, setFoodInfo] = useState<Nutrient | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const handleClose = () => props.onDetailClose();

  useEffect(() => {
    setIsLoading(true);
    // console.log(props.foodId);

    (async () => {
      const data = await fetchRecipeNutrition(props.foodId);
      setFoodInfo(data);
    })();
    setIsLoading(false);
  }, [props.foodId]);

  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.header}></div>
          {!isLoading && (
            <div className={classes.main}>
              <NutritionInfo
                nutrition={foodInfo!}
                dashboard
                onDetailClose={handleClose}
              />
            </div>
          )}
          <div className={classes.footer}></div>
        </div>
      </div>
    </>
  );
};
export default MealDetail;

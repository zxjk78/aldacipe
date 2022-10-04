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
const MealDetail = (props: {
  foodInfo: { foodId: number; foodType: string };
  onDetailClose: () => void;
}) => {
  const [foodInfo, setFoodInfo] = useState<Nutrient | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const handleClose = () => props.onDetailClose();

  useEffect(() => {
    setIsLoading(true);
    // console.log(props.foodInfo.foodId, props.foodInfo.foodType);

    (async () => {
      const data = await fetchRecipeNutrition(
        props.foodInfo.foodId,
        props.foodInfo.foodType
      );
      // console.log(data);

      setFoodInfo(data);
    })();
    setIsLoading(false);
  }, [props.foodInfo]);

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

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
import { Recipe, Nutrient } from '../../../util/interface';
const MealDetail = (props: {
  foodInfo: { foodId: number; foodType: string };
  onDetailClose: () => void;
}) => {
  const [foodNutInfo, setFoodNutInfo] = useState<Nutrient | null>(null);
  // const [recipeInfo, setRecipeInfo] = useState<Recipe|null>(null);
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

      setFoodNutInfo(data);
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
                nutrition={foodNutInfo!}
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

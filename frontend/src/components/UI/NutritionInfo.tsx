// react core
import { useEffect, useState } from 'react';

// API

import { fetchRecipeNutrition } from '../../api/nutrition';
// external module

// external component
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
// custom component

// css, interface(type)
import classes from './NutritionInfo.module.scss';
import { Nutrient } from '../../util/interface';
import { nutritionDictionary } from '../../util/data';
const NutritionInfo = (props: {
  recipeName?: string;
  recipeId?: number;
  nutrition?: Nutrient;
  dashboard?: boolean;
  showDetail?: () => void;
  onDetailClose?: () => void;
}) => {
  const [nutrition, setNutrition] = useState<Nutrient | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (props?.nutrition) {
      setNutrition(props.nutrition);
    } else {
      (async () => {
        const data = await fetchRecipeNutrition(props.recipeId!, 'recipe');
        setNutrition(data);
      })();
    }
    setIsLoading(false);
  }, [props.nutrition, props.recipeId]);
  const handleShowDetail = () => {
    props.showDetail!();
  };
  const handleClose = () => {
    props.onDetailClose!();
  };
  return (
    <>
      {nutrition && !isLoading && (
        <div className={classes.wrapper}>
          <div className={classes.container}>
            <div className={classes.header}>
              <div>영양성분</div>
              {!props.dashboard ? (
                <div className={classes.detailBtn} onClick={handleShowDetail}>
                  <InfoIcon fontSize="small" />
                  <span>자세히 보기</span>
                </div>
              ) : (
                <div onClick={handleClose}>
                  <CloseIcon />
                </div>
              )}
            </div>
            <div className={classes.main}>
              <div className={`${classes.nutItem} ${classes.kcal}`}>
                <div className={classes.nutName}>열량</div>
                <div>{Math.floor(nutrition.kcal)} Kcal</div>
              </div>
              <div className={classes.nutItem}>
                <div className={classes.nutName}>탄수화물</div>
                <div>{Math.floor(nutrition.carbohydrate)} g</div>
              </div>
              <div className={classes.nutItem}>
                <div className={classes.nutName}>단백질</div>
                <div>{Math.floor(nutrition.protein)} g</div>
              </div>
              <div className={classes.nutItem}>
                <div className={classes.nutName}>지방</div>
                <div>{Math.floor(nutrition.fat)} g</div>
              </div>
              <div className={classes.etcContainer}>
                <div>
                  <div className={classes.nutTitle}>주요 비타민</div>
                  <div className={classes.nutItem}>
                    <div className={classes.nutName}>비타민 D</div>
                    <div>{Math.floor(nutrition.vitaminD)} mg</div>
                  </div>
                  <div className={classes.nutItem}>
                    <div className={classes.nutName}>비타민 C</div>
                    <div>{Math.floor(nutrition.vitaminC)} mg</div>
                  </div>
                </div>
                <div>
                  <div className={classes.nutTitle}>주요 무기질</div>
                  <div className={classes.nutItem}>
                    <div className={classes.nutName}>칼슘</div>
                    <div>{Math.floor(nutrition.calcium)} mg</div>
                  </div>
                  <div className={classes.nutItem}>
                    <div className={classes.nutName}>나트륨</div>
                    <div>{Math.floor(nutrition.sodium)} mg</div>
                  </div>
                  <div className={classes.nutItem}>
                    <div className={classes.nutName}>철분</div>
                    <div>{Math.floor(nutrition.iron)} mg</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.footer}></div>
          </div>
        </div>
      )}
    </>
  );
};
export default NutritionInfo;

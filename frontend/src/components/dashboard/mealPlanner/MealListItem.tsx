// react core
import { useState } from 'react';

// API
import { API_URL } from '../../../api/config/http-config';
import { fetchRecipeNutrition } from '../../../api/nutrition';
// external module

// external component
import InfoIcon from '@mui/icons-material/Info';
// custom component
import MealDetail from './MealDetail';
// css, interface(type)
import classes from './MealListItem.module.scss';
import { Nutrient, Intake } from '../../../util/interface';
export default function MealListItem(props: {
  intake: Intake;
  onFoodDetail: (id: number) => void;
}) {
  const handleDetailToggle = () => {
    props.onFoodDetail(props.intake.intakeTargetId);
  };

  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.left}>
            <div>
              <img src={`${API_URL}${props.intake.image}`} alt="그림" />
            </div>
            <div className={classes.foodName}>
              <div>
                {props.intake.name + ' '}
                <span onClick={handleDetailToggle}>
                  <InfoIcon fontSize="small" />
                </span>
              </div>
            </div>
          </div>
          <div className={classes.right}>
            <div>
              {props.intake.intakeAmount} <span> g</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// react core
import { useState } from 'react';

// API
import { API_URL } from '../../../api/config/http-config';
import { fetchRecipeNutrition } from '../../../api/nutrition';
// external module

// external component
import InfoIcon from '@mui/icons-material/Info';
// custom component
import RecipeImgContainer from '../../UI/RecipeImgContainer';
// css, interface(type)
import classes from './MealListItem.module.scss';
import { Nutrient, Intake } from '../../../util/interface';

// 부모: MealPlanner
export default function MealListItem(props: {
  intake: Intake;
  onFoodDetail: (id: number, type: string) => void;
}) {
  const handleDetailToggle = () => {
    // console.log(props.intake.intakeTargetId, props.intake.intakeType);

    props.onFoodDetail(props.intake.intakeTargetId, props.intake.intakeType);
  };

  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.left}>
            <div>
              <RecipeImgContainer
                src={`${API_URL}image?path=${props.intake.image}`}
                width={'30px'}
                height={'30px'}
                alt="요리"
              />
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

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
export default function MealListItem(props: { intake: Intake }) {
  const [foodInfo, setFoodInfo] = useState<Nutrient | null>(null);
  const [foodInfoVisible, setFoodInfoVisible] = useState(false);
  const handleDetailToggle = () => {
    if (!foodInfoVisible) {
      (async () => {
        const data = await fetchRecipeNutrition(props.intake.id);
        setFoodInfo(data);
        setFoodInfoVisible(true);
      })();
    } else {
      setFoodInfoVisible(!foodInfoVisible);
    }
  };

  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.foodInfomation}>
          {foodInfoVisible && <MealDetail foodInfo={foodInfo!} />}
        </div>
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

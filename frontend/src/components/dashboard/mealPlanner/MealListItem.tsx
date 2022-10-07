// react core

// API
import { API_URL } from '../../../api/config/http-config';
// external module

// external component
import InfoIcon from '@mui/icons-material/Info';
// custom component
// import RecipeImgContainer from '../../UI/RecipeImgContainer';
import RecipeRoundImgContainer from '../../UI/RecipeRoundImgContainer';
// css, interface(type)
import classes from './MealListItem.module.scss';
import { Intake } from '../../../util/interface';

// 부모: MealPlanner
export default function MealListItem(props: {
  intake: Intake;
  onFoodDetail: (intake: Intake) => void;
}) {
  const handleDetailToggle = () => {
    // targetId, type, img 꺼내다 사요앟ㄹ것
    props.onFoodDetail(props.intake);
  };

  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.left}>
            <div>
              <RecipeRoundImgContainer
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
                  <InfoIcon fontSize="small" sx={{ color: "gray"}}/>
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

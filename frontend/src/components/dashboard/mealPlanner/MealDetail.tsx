// react core
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// API
import { fetchRecipeNutrition } from '../../../api/nutrition';
import { API_URL } from '../../../api/config/http-config';
import { deleteUserIntake } from '../../../api/dashboard';
// external module
import Button from '@mui/material/Button';

// external component

// custom component
import NutritionInfo from '../../UI/NutritionInfo';
import RecipeImgContainer from '../../UI/RecipeImgContainer';

// css, interface(type)
import classes from './MealDetail.module.scss';
import { Nutrient, Intake } from '../../../util/interface';
const MealDetail = (props: {
  foodInfo: Intake;
  onDetailClose: () => void;
  isUpdate: () => void;
}) => {
  const [foodNutInfo, setFoodNutInfo] = useState<Nutrient | null>(null);
  // const [recipeInfo, setRecipeInfo] = useState<Recipe|null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const handleClose = () => props.onDetailClose();
  const handleDelete = async () => {
    // 삭제 메소드
    const success = await deleteUserIntake(props.foodInfo.id);
    console.log(success);

    if (success) {
      props.isUpdate();
      handleClose();
    }
  };
  useEffect(() => {
    setIsLoading(true);

    (async () => {
      const data = await fetchRecipeNutrition(
        props.foodInfo.intakeTargetId,
        props.foodInfo.intakeType
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
              <div>
                <RecipeImgContainer
                  src={`${API_URL}image?path=${props.foodInfo.image}`}
                  height="200px"
                  width="100%"
                  alt="영양 상세"
                />
              </div>
              <div>
                <NutritionInfo
                  nutrition={foodNutInfo!}
                  dashboard
                  onDetailClose={handleClose}
                />
              </div>
            </div>
          )}

          <div className={classes.footer}>
            <Link to={`/detail/${props.foodInfo.intakeTargetId}`}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#2fbca0',
                  padding: '0.25rem 0.75rem',
                  '&:hover': { backgroundColor: '#058181' },
                }}
              >
                자세히 보기
              </Button>
            </Link>
            <Button
              variant="outlined"
              sx={{
                // backgroundColor: '#2fbca0',
                padding: '0.25rem 0.5rem',
                // '&:hover': { backgroundColor: '#058181' },
              }}
              color="error"
              onClick={handleDelete}
            >
              기록 삭제하기
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default MealDetail;

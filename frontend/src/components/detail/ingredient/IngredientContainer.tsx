import { useState, useEffect } from 'react';
// api
import { createRating } from '../../../api/detail';
import { API_URL } from '../../../api/config/http-config';
// external component
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Button from '@mui/material/Button';
import styled2 from '@emotion/styled';
import { styled } from '@mui/material';
// custom component
import IngredientList from './IngredientList';
import RecipeImgContainer from '../../UI/RecipeImgContainer';
// css, interface
import classes from './IngredientContainer.module.scss';
import { RecipeDetail } from '../../../util/interface';
import { calculateIngredient } from '../../../util/fuctions';

const CustomRating = styled(Rating)({
  '&.Mui-disabled': {
    '.MuiRating-iconFilled': {
      color: '#2fbba0',
    },
    opacity: 1,
  },
});
const CustomButton = styled2(Button)`
color:#2fbba0;
border: 1px solid #2fbba0;
// height: 1rem;

`;
const IngredientContainer = (props: { recipeInfo: RecipeDetail }) => {
  // console.log(props.recipeInfo);

  const {
    recipe,
    ingredientList: allIngre,
    ingredientListIHave: myIngre,
    userEvaluationInfo: myEval,
    avgEvalutationScore: avgScore,
  } = props.recipeInfo;
  const { didEvaluate, score } = myEval;
  const [myIngredient, notMyIngredient, spice] = calculateIngredient(
    allIngre,
    myIngre
  );
  const [rating, setRating] = useState<number | null>(score);
  const [didEval, setDidEval] = useState(didEvaluate);
  const handleRatingSubmit = async () => {
    const success = await createRating(recipe.id, rating!);
    if (success) {
      // window.location.reload();
      setDidEval(true);
    }
  };
  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.header}>
          <div>{recipe.name}</div>

          <div className={classes.totalRating}>
            <div>
              <span>
                <StarIcon fontSize="large" />
              </span>{' '}
              {avgScore.toFixed(1)}
            </div>
          </div>
        </div>
        <div className={classes.main}>
          <div>
            <RecipeImgContainer
              src={`${API_URL}image?path=${recipe.image}`}
              alt="레시피 큰 이미지"
              width="300px"
              height="300px"
            />
            <div className={classes.myRating}>
              <div>내 별점:</div>
              <div>
                <CustomRating
                  name="recipe-rating"
                  value={rating}
                  defaultValue={score}
                  precision={0.5}
                  disabled={didEval}
                  onChange={(event, newValue) => {
                    setRating(newValue);
                  }}
                />
              </div>
              {!didEval && (
                <CustomButton size="small" onClick={handleRatingSubmit}>
                  별점 주기
                </CustomButton>
              )}
            </div>
          </div>
          <div className={classes.ingredientContainer}>
            <div>
              <IngredientList
                key={1}
                title="있는 재료"
                ingredients={myIngredient}
                type="own"
              />
            </div>
            <div>
              <IngredientList
                key={2}
                title="없는 재료"
                ingredients={notMyIngredient}
                type="notOwn"
              />
            </div>
            <div>
              <IngredientList
                key={3}
                title="양념"
                ingredients={spice}
                type="seasoning"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IngredientContainer;

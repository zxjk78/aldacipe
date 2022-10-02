// custom component
import { useState, useEffect } from 'react';
import CustomTable from './IngredientTable';
import IngredientToggle from './IngredientToggle';
import IngredientList from './IngredientList';
import Rating from '@mui/material/Rating';

// css, interface
import classes from './IngredientContainer.module.scss';
import { Recipe, Ingredient, RecipeDetail } from '../../../util/interface';
import { API_URL } from '../../../api/config/http-config';
import { calculateIngredient } from '../../../util/fuctions';
/* 
있는 재료 없는 재료, 양념을 그냥 나누어서 3개의 영역에 모아서 보여줄 것


을 위해서는 있는 재료, 없는 재료, 소분류 양념까지 따져야 함

*/

const IngredientContainer = (props: { recipeInfo: RecipeDetail }) => {
  const {
    recipe,
    ingredientList: allIngre,
    ingredientListIHave: myIngre,
  } = props.recipeInfo;

  const [myIngredient, notMyIngredient, spiceArray] = calculateIngredient(
    allIngre,
    myIngre
  );
  const [rating, setRating] = useState<number | null>(2);

  useEffect(() => {
    // rating 변경 시마다 서버에 put 요청 보내는 API
    (async () => {
      const success = console.log(123);
    })();
  }, [rating]);

  const imgErrorhandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = require('../../../assets/recipeImgNotfound.png');
  };
  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.header}>{recipe.name}</div>
        <div className={classes.main}>
          <div>
            <img
              src={`${API_URL}image/${recipe.image}`}
              className={classes.recipeImg}
              alt="레시피 큰 이미지"
              onError={imgErrorhandler}
            />
            <div>
              <div>
                <div>별점 4.3</div>

                <Rating
                  name="recipe-rating"
                  value={rating}
                  precision={0.5}
                  size="large"
                  onChange={(event, newValue) => {
                    setRating(newValue);
                  }}
                />
              </div>
            </div>
          </div>
          <div className={classes.ingredientContainer}>
            <div>
              <IngredientList
                key={1}
                title="나에게 있는 재료"
                ingredients={myIngredient}
              />
            </div>
            <div>
              <IngredientList
                key={2}
                title="나에게 없는 재료"
                ingredients={notMyIngredient}
              />
            </div>
            <div>
              <IngredientList key={3} title="양념" ingredients={spiceArray} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IngredientContainer;

import { useState, useEffect } from 'react';
// api
import { API_URL } from '../../../api/config/http-config';
// custom component
import IngredientList from './IngredientList';
import Rating from '@mui/material/Rating';

// external component
import StarIcon from '@mui/icons-material/Star';
// css, interface
import classes from './IngredientContainer.module.scss';
import { RecipeDetail } from '../../../util/interface';
import { calculateIngredient } from '../../../util/fuctions';

const IngredientContainer = (props: { recipeInfo: RecipeDetail }) => {
  console.log(props.recipeInfo);

  const {
    recipe,
    ingredientList: allIngre,
    ingredientListIHave: myIngre,
  } = props.recipeInfo;

  const [myIngredient, notMyIngredient, spice] = calculateIngredient(
    allIngre,
    myIngre
  );
  const [rating, setRating] = useState<number | null>(2);

  // useEffect(() => {
  //   // rating 변경 시마다 서버에 put 요청 보내는 API
  //   (async () => {
  //     const success = console.log(123);
  //   })();
  // }, [rating]);

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
              src={`${API_URL}image?path=${recipe.image}`}
              className={classes.recipeImg}
              alt="레시피 큰 이미지"
              width={'150px'}
              height={'150px'}
              onError={imgErrorhandler}
            />

            <div>
              <div>
                <div className={classes.totalRating}>
                  <div>
                    <span>
                      <StarIcon />
                    </span>{' '}
                    4.3
                  </div>
                  <div>
                    <Rating
                      name="recipe-rating"
                      value={rating}
                      precision={0.5}
                      onChange={(event, newValue) => {
                        setRating(newValue);
                      }}
                    />
                  </div>
                </div>
              </div>
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

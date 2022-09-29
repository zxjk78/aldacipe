import { useEffect, useState } from 'react';
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';

// api
import { fetchRecipe } from '../api/detail';

import IngredientContainer from '../components/detail/ingredient/IngredientContainer';
import CuisineContainer from '../components/detail/cuisine/CuisineContainer';
import ReviewContainer from '../components/detail/reviews/ReviewContainer';
// css, interface
import classes from './RecipeDetailPage.module.scss';
import { RecipeDetail } from '../util/interface';
// 더미데이터
export default function RecipeDetailPage(props: {}) {
  const [isLoading, setIsLoading] = useState(true);
  const [recipeInfo, setRecipeInfo] = useState<RecipeDetail | null>(null);
  const location = useLocation();

  const { recipeId } = useParams();
  const navigate = useNavigate();
  if (!recipeId) {
    navigate('main');
  }
  const recipeId2 = recipeId as string;
  useEffect(() => {
    setIsLoading(true);

    (async () => {
      const data = await fetchRecipe(+recipeId2);
      setRecipeInfo(data);
    })();

    setIsLoading(false);
  }, [recipeId2]);

  return (
    <>
      <div className={classes.backdrop}>
        <div className={classes.wrapper}>
          <IngredientContainer recipe={{}} />
          <div className={classes.menus}>
            <NavLink
              to={`/detail/${recipeId}`}
              className={() =>
                location.pathname === `/detail/${recipeId}`
                  ? classes.selected
                  : classes.notselected
              }
            >
              요리 방법
            </NavLink>
            <NavLink
              to={`/detail/${recipeId}/nutrients`}
              className={({ isActive }) =>
                isActive ? classes.selected : classes.notselected
              }
            >
              영양소
            </NavLink>
            <NavLink
              to={`/detail/${recipeId}/review`}
              className={({ isActive }) =>
                isActive ? classes.selected : classes.notselected
              }
            >
              댓글 및 평점
            </NavLink>
          </div>
          <Outlet context={recipeInfo} />
        </div>
      </div>
    </>
  );
}

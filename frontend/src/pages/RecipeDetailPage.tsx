import { Link, Outlet } from 'react-router-dom';
import IngredientContainer from '../components/detail/ingredient/IngredientContainer';
import CuisineContainer from '../components/detail/cuisine/CuisineContainer';
import ReviewContainer from '../components/detail/reviews/ReviewContainer';
import Nutrients from '../components/detail/nutrients/Nutrients';
// css
import classes from './RecipeDetailPage.module.scss';
// 더미데이터
import { dummyReview } from '../components/detail/interface';
export default function RecipeDetailPage(props: {}) {
  return (
    <>
      <div className={classes.backdrop}>
        <div className={classes.wrapper}>
          <IngredientContainer recipe={{}} />
          <div className={classes.menus}>
            <Link to="/detail/1">요리 방법</Link>
            <Link to="/detail/1/nutrients">영양소</Link>
            <Link to="/detail/1/review">댓글 및 평점</Link>
          </div>
          <Outlet/>
        </div>
      </div>
    </>
  );
}

import IngredientContainer from '../components/detail/ingredient/IngredientContainer';
import CuisineContainer from '../components/detail/cuisine/CuisineContainer';
import ReviewContainer from '../components/detail/reviews/ReviewContainer';
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
            <div>요리 방법</div>
            <div>영양소</div>
            <div>댓글 및 평점</div>
          </div>

          <CuisineContainer recipeId={1} step={[1, 2, 3]} />
          <ReviewContainer reviewList={dummyReview} />
        </div>
      </div>
    </>
  );
}

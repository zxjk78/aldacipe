import IngredientContainer from '../components/detail/ingredient/IngredientContainer';
import CuisineContainer from '../components/detail/cuisine/CuisineContainer';
import ReviewContainer from '../components/detail/reviews/ReviewContainer';
// css
import classes from './RecipeDetailPage.module.scss';
// 더미데이터
import { dummyReview } from '../components/detail/interface';
const RecipeDetailPage: React.FC<{}> = () => {
  return (
    <>
      <div className={classes.backdrop}>
        <IngredientContainer recipe={{}} />
        <CuisineContainer recipeId={1} step={[1, 2, 3]} />
        <ReviewContainer reviewList={dummyReview} />
      </div>
    </>
  );
};

export default RecipeDetailPage;

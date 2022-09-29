// react core
import { useOutletContext } from 'react-router-dom';

// API

// external module

// external component

// custom component
import NutrientContainer from './nutrition/NutrientContainer';
import ReviewContainer from './reviews/ReviewContainer';
// css, interface(type)
import classes from './NutScoreContainer.module.scss';
import { RecipeDetail } from '../../util/interface';

const NutScoreContainer = (props: {}) => {
  const parentData: RecipeDetail = useOutletContext();
  const { nutrient, userEvaluationInfo, evaluationList } = parentData;
  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <NutrientContainer nutrient={nutrient} />
          <ReviewContainer
            userEval={userEvaluationInfo}
            reviewList={evaluationList}
          />
        </div>
      </div>
    </>
  );
};
export default NutScoreContainer;

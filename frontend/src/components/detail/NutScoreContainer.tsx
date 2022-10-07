// react core
import { useState } from 'react';

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
import NutrientDetail from './nutrition/NutrientDetail';

const NutScoreContainer = (props: {}) => {
  const parentData: RecipeDetail = useOutletContext();
  // evaluationList: 별점이고 리뷰가 아님
  const { nutrient, userEvaluationInfo, evaluationList, recipe } = parentData;
  const [detail, setDetail] = useState<null | boolean>(null);

  const openNutDetail = () => {
    setDetail(true);
  };
  const closeNutDetail = () => {
    setDetail(false);
  };
  return (
    <>
      <div
        className={`${classes.container1}            
        
        ${
          detail === null
            ? ''
            : detail
            ? `${classes.fadeOut}`
            : `${classes.fadeIn}`
        }
        `}
      >
        <NutrientContainer nutrient={nutrient} showDetail={openNutDetail} />
        <ReviewContainer
          recipeId={recipe.id}
          userEval={userEvaluationInfo}
          evaluationList={evaluationList}
        />
      </div>

      <div
        className={`${classes.container2}            
        
        ${
          detail === null
            ? `${classes.noShow}`
            : detail
            ? `${classes.fadeIn} ${classes.bottomUp}`
            : `${classes.bottomDown} ${setTimeout(() => {
                setDetail(null);
              }, 700)}`
        }
        `}
      >
        <NutrientDetail nutrient={nutrient} close={closeNutDetail} />
      </div>
    </>
  );
};
export default NutScoreContainer;

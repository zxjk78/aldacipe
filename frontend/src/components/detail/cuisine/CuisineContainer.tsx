// custom component
import CuisineStep from './CuisineStep';
import { useOutletContext } from 'react-router-dom';

// css
import classes from './CuisineContainer.module.scss';
import { Manual, RecipeDetail } from '../../../util/interface';

const CuisineContainer = (props: {}) => {
  const completeCooking = () => {
    //API로 recipeId 보내서 냉장고 재료 소비
  };

  const parentData: RecipeDetail = useOutletContext();

  const recipeMenual: Manual[] = parentData?.manualList;
  return (
    <>
      {recipeMenual && (
        <div className={classes.wrapper}>
          {/* <div className={classes.header}>조리방법</div> */}
          <div className={classes.main}>
            {recipeMenual.map((step) => (
              <CuisineStep key={step.order} step={step} />
            ))}

            <button className={classes.complete} onClick={completeCooking}>
              완료
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CuisineContainer;

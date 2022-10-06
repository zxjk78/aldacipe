// react core
import { useEffect, useState } from 'react';

// API
import { fetchHealthyRecipe } from '../../../api/dashboard';
// external module
// external component
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// custom component
import CardItem from './CardItem';
// css, interface(type)
import classes from './RecommendRecipe.module.scss';
import { CardRecipe2 } from '../../../util/interface';

// 부모: DashboardPage.tsx

const RecommendRecipe = (props: {}) => {
  const [recipeList, setRecipeList] = useState<CardRecipe2[] | null>(null);
  const [targetRecipeId, setTargetRecipeId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const data = await fetchHealthyRecipe();

      setRecipeList(data);
    })();
    setIsLoading(false);
  }, []);
  const handleBackword = () => {
    if (targetRecipeId === 0) return;
    setTargetRecipeId((prev) => prev - 1);
  };
  const handleForword = () => {
    if (targetRecipeId >= recipeList!.length - 1) return;
    setTargetRecipeId((prev) => prev + 1);
  };
  return (
    <>
      {!isLoading && recipeList && (
        <div className={classes.wrapper}>
          <div className={classes.container}>
            <div className={classes.header}>
              <div>부족한 영양소 기반 추천 레시피</div>
              <div className={classes.arrowContainer}>
                <span onClick={handleBackword} className={classes.arrow}>
                  <ArrowBackIosNewIcon />
                </span>
                <div>{`${targetRecipeId + 1} / ${recipeList.length}`}</div>
                <span onClick={handleForword} className={classes.arrow} >
                  <ArrowForwardIosIcon />
                </span>
              </div>
            </div>
            <div className={classes.main}>
              <CardItem card={recipeList[targetRecipeId]} />
            </div>
            <div className={classes.footer}></div>
          </div>
        </div>
      )}
    </>
  );
};
export default RecommendRecipe;

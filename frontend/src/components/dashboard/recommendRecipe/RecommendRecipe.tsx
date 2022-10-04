// react core
import { useEffect, useState } from 'react';

// API
import { fetchHealthyRecipe } from '../../../api/dashboard';
// external module

// external component

// custom component

// css, interface(type)
import classes from './RecommendRecipe.module.scss';
import { Recipe } from '../../../util/interface';
const RecommendRecipe = (props: {}) => {
  const [recipeList, setRecipeList] = useState<Recipe[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const data = await fetchHealthyRecipe();

      setRecipeList(data);
    })();
    setIsLoading(false);
  }, []);

  return (
    <>
      {!isLoading && recipeList && (
        <div className={classes.wrapper}>
          <div className={classes.container}>
            <div className={classes.header}>추천 레시피</div>
            <div className={classes.main}>1</div>
            <div className={classes.footer}></div>
          </div>
        </div>
      )}
    </>
  );
};
export default RecommendRecipe;

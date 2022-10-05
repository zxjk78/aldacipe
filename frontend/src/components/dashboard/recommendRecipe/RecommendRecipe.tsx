// react core
import { useEffect, useState } from 'react';

// API
import { fetchHealthyRecipe } from '../../../api/dashboard';
// external module

// external component

// custom component
import CardItem from './CardItem';
// css, interface(type)
import classes from './RecommendRecipe.module.scss';
import { CardRecipe2 } from '../../../util/interface';

// 부모: DashboardPage.tsx

const RecommendRecipe = (props: {}) => {
  const [recipeList, setRecipeList] = useState<CardRecipe2[] | null>(null);
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
            <div className={classes.header}>부족한 영양소 기반 추천 레시피</div>
            <div className={classes.main}>
              {recipeList.map((item) => (
                <CardItem card={item} key={item.id} />
                // <div>{item.name}</div>
              ))}
            </div>
            <div className={classes.footer}></div>
          </div>
        </div>
      )}
    </>
  );
};
export default RecommendRecipe;

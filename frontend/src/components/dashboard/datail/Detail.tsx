// react core
import { useEffect, useState } from 'react';

// API

import { fetchWeekDetail } from '../../../api/dashboard';
// external module

// external component

// custom component
import UpperDetail from './UpperDetail';
import VitaMineral from './VitaMineral';
import MostIngredient from './MostIngredient';
import MostRecipe from './MostRecipe';
// css, interface(type)
import classes from './Detail.module.scss';
export default function Detail(props: {}) {
  const [isLoading, setIsloading] = useState(true);

  const [mostIngredientList, setMostIngredientList] = useState<any>(null);

  const [recommendNut, setRecommendNut] = useState<any>(null);
  const [totalIntakeNut, setTotalIntakeNut] = useState<any>(null);
  const [mostRecipeList, setMostRecipeList] = useState<any>(null);

  useEffect(() => {
    setIsloading(true);
    (async () => {
      // const data = await fetchWeekDetail();
      const {
        mostIntakeIngredientList,
        mostIntakeRecipeList,
        recommendedIntakeNutrient,
        totalIntakeNutrient,
      } = await fetchWeekDetail();
      // console.log('추천영양소', recommendedIntakeNutrient);

      setMostIngredientList(mostIntakeIngredientList);
      setMostRecipeList(mostIntakeRecipeList);
      setRecommendNut(recommendedIntakeNutrient);
      setTotalIntakeNut(totalIntakeNutrient);
    })();
    setIsloading(false);
  }, []);

  return (
    <>
      <div className={classes.title}>
        상세 <span>개인의 기록을 상세히 표시합니다.</span>
      </div>
      {!isLoading && totalIntakeNut && (
        <div className={classes.container}>
          <div>
            <UpperDetail nutName={'kcal'} nutValue={+totalIntakeNut.kcal} />
          </div>
          <div>
            <UpperDetail
              nutName={'carbohydrate'}
              nutValue={+totalIntakeNut.carbohydrate}
            />
          </div>
          <div>
            <UpperDetail
              nutName={'protein'}
              nutValue={+totalIntakeNut.protein}
            />
          </div>
          <div>
            <UpperDetail nutName={'fat'} nutValue={+totalIntakeNut.fat} />
          </div>
          <div>
            <VitaMineral nutrient={totalIntakeNut} vitamin />
          </div>
          <div>
            <VitaMineral nutrient={totalIntakeNut} />
          </div>
          <div>
            <MostIngredient ingredients={mostIngredientList} />
          </div>
          <div>
            <MostRecipe recipe={mostRecipeList} />
          </div>
        </div>
      )}
    </>
  );
}

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
import { Nutrient } from '../../../util/interface';
export default function Detail(props: { isUpdated: boolean }) {
  const [isLoading, setIsloading] = useState(true);

  const [mostIngredientList, setMostIngredientList] = useState<any>(null);

  const [recommendNut, setRecommendNut] = useState<Nutrient | null>(null);
  const [totalIntakeNut, setTotalIntakeNut] = useState<Nutrient | null>(null);
  const [mostRecipeList, setMostRecipeList] = useState<any>(null);

  useEffect(() => {
    setIsloading(true);
    (async () => {
      // const data = await fetchWeekDetail();
      // console.log(data);

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
  }, [props.isUpdated]);

  return (
    <>
      <div className={classes.title}>
        상세 <span>7일간의 개인의 기록을 상세히 표시합니다.</span>
      </div>
      {!isLoading && totalIntakeNut && recommendNut && (
        <div className={classes.container}>
          <div>
            <UpperDetail
              nutName={'kcal'}
              nutValue={+totalIntakeNut.kcal}
              nutValueReco={+recommendNut!.kcal}
            />
          </div>
          <div>
            <UpperDetail
              nutName={'carbohydrate'}
              nutValue={+totalIntakeNut.carbohydrate}
              nutValueReco={+recommendNut!.carbohydrate}
            />
          </div>
          <div>
            <UpperDetail
              nutName={'protein'}
              nutValue={+totalIntakeNut.protein}
              nutValueReco={+recommendNut!.protein}
            />
          </div>
          <div>
            <UpperDetail
              nutName={'fat'}
              nutValue={+totalIntakeNut.fat}
              nutValueReco={+recommendNut!.fat}
            />
          </div>
          <div>
            <VitaMineral
              nutrient={totalIntakeNut}
              nutrientReco={recommendNut}
              vitamin
            />
          </div>
          <div>
            <VitaMineral
              nutrient={totalIntakeNut}
              nutrientReco={recommendNut}
            />
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

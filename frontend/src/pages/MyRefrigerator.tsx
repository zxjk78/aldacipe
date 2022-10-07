// custom component
import { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import setIngredients from '../redux/slice/refrigerator';

import { getRefrigerator } from '../api/myrefrigerator';
import { ingredient, recipe } from '../components/refrigerator/interface';
import Refrigerator from '../components/refrigerator/Refrigerator';
import RefrigeratorBox from '../components/refrigerator/RefrigeratorBox';
import CarouselSimilar from '../components/mainpage/CarouselSimilar';
import { useSelector } from 'react-redux';

// css
import classes from './MyRefrigerator.module.scss';

export default function MyRefrigerator() {
  const [myIngredient, setMyIngredient] = useState<ingredient[]>([]);

  const [isMyRefrigListUpdate, setIsMyRefrigeListUpdate] = useState(false);
  const selectedIngredientList = useSelector(
    (state: any) => state.refrigerator.cookingIngredientList
  );

  const handleMyRefrigeListUpdate = () => {
    setIsMyRefrigeListUpdate((prev) => !prev);
  };

  useEffect(() => {
    (async () => {
      const data = await getRefrigerator();
      setMyIngredient(data);
    })();
  }, [isMyRefrigListUpdate]);
  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.refrigerator}>
          <RefrigeratorBox
            item={myIngredient}
            onAddItem={handleMyRefrigeListUpdate}
          />
        </div>
        <div className={classes.ingredientlistContainer}>
          <div>현재 선택한 재료</div>
          <div className={classes.ingredientlistContainerMain}>
            <Refrigerator selectedItemList={selectedIngredientList} />
          </div>
        </div>
        <div className={classes.foodlistContainer}>
          <div>선택한 재료로 만들 수 있는 음식</div>
          <div className={classes.foodlistContainerMain}>
            <CarouselSimilar selectedItemList={selectedIngredientList} />
          </div>
        </div>
      </div>
    </>
  );
}

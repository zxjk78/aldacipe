// custom component
import { useEffect, useState } from 'react';
import { getRefrigerator } from '../api/myrefrigerator';
import { Ingredient } from '../components/refrigerator/interface';
import Refrigerator from '../components/refrigerator/Refrigerator';
import RefrigeratorBox from '../components/refrigerator/RefrigeratorBox';
// css
import classes from './MyRefrigerator.module.scss';

export default function MyRefrigerator() {
  const [ingredient, setIngredient] = useState<Ingredient[]>([])
  useEffect(() => {
    (async () => {
      const data = await getRefrigerator();
      setIngredient(data)
    })();
  }, [])
  return (
    <>
      <h2 className={classes.header}>내 냉장고</h2>
      <div className={classes.wrapper}>
        <div className={classes.refrigerator}>
          <RefrigeratorBox item={ingredient}/>
        </div>
        <div className={classes.ingredientlist}> 
          <h2>Refrigerator</h2>
          <Refrigerator item={ingredient}/>
        </div>
        <div className={classes.foodlist}>
          <h2>선택한 재료로 만들 수 있는 음식</h2>
        </div>
      </div>
    </>
  );
}

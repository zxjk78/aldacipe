// custom component
import { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import setIngredients from '../redux/slice/refrigerator';
import { getRefrigerator, searchRecipe } from '../api/myrefrigerator';
import { ingredient, recipe } from '../components/refrigerator/interface';
import Refrigerator from '../components/refrigerator/Refrigerator';
import RefrigeratorBox from '../components/refrigerator/RefrigeratorBox';
import CarouselSimilar from '../components/mainpage/CarouselSimilar';
// css
import classes from './MyRefrigerator.module.scss';

export default function MyRefrigerator() {
  const [ingredient, setIngredient] = useState<ingredient[]>([]);
  const [selectIngre, setSelectIngre] = useState<number[]>([]);
  const [searchData, setSearchData] = useState<never[]>([]);
  // 재료추가
  const addIngredient = (data: ingredient) => {
    setIngredient([...ingredient, data]);
  };
  // search 보내게 string으로 변환
  const ingre = (newValue: number[]) => {
    return newValue.join('-');
  };

  // 재료 선택 & 검색
  const searchIngre = (data: number) => {
    if (searchData.length === 0) {
      setSelectIngre([data]);
      (async () => {
        const tmp = ingre(selectIngre);
        const data = await searchRecipe(tmp);
        setSearchData(data);
      })();
    } else {
      setSelectIngre([...selectIngre, data]);
      (async () => {
        const tmp = ingre(selectIngre);
        const data = await searchRecipe(tmp);
        setSearchData(data);
      })();
    }
  };
  const getSearchData = () => {
    return searchData;
  };
  const deleteIngre = (data: number) => {
    const newValue = selectIngre.filter((id) => id !== data);
    setSelectIngre(newValue);
    if (newValue.length > 0) {
      (async () => {
        const tmp = ingre(selectIngre);
        const data = await searchRecipe(tmp);
        setSearchData(data);
      })();
    } else {
      setSearchData([]);
    }
  };

  useEffect(() => {
    (async () => {
      const data = await getRefrigerator();
      setIngredient(data);
    })();
  }, [selectIngre, searchData]);

  return (
    <>
      <h2 className={classes.header}>내 냉장고</h2>
      <div className={classes.wrapper}>
        <div className={classes.refrigerator}>
          <RefrigeratorBox item={ingredient} addIngredient={addIngredient} />
        </div>
        <div className={classes.ingredientlist}>
          <h2>Refrigerator</h2>
          <Refrigerator
            item={ingredient}
            searchIngre={searchIngre}
            deleteIngre={deleteIngre}
          />
        </div>
        <div className={classes.foodlist}>
          <h2>선택한 재료로 만들 수 있는 음식</h2>
          <CarouselSimilar
            searchData={searchData}
            getSearchData={getSearchData}
          />
        </div>
      </div>
    </>
  );
}

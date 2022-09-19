// react core

// API
import { searchIngredient } from '../../api/search';
// external component

// custom component

// css
import { ChangeEvent } from 'react';
import classes from './FoodAllerge.module.scss';

export default function FoodAllerge(props: {}) {
  const keywordInputHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    // api 통신
    const foodList = await searchIngredient(event.target.value);
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.header}>
          <div>못 먹는 음식 관리</div>
        </div>
        <div className={classes.main}>
          <div>
            식품 검색 및 추가를 통해서, 요리 검색 및 추천 서비스에서 해당 식품이
            들어간 레시피들을 제외할 수 있습니다.
          </div>
          <input
            type="text"
            placeholder="식품 이름을 검색하세요"
            onChange={keywordInputHandler}
          />
          <div className={classes.fetched}>보내진 리스트</div>
          <div className={classes.enrolled}>지금 현재 가지고 있는 리스트</div>
        </div>
        <div className={classes.footer}></div>
      </div>
    </>
  );
}

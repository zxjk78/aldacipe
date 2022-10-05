import React, { useEffect, useState } from 'react';
// custom component
import CarouselRefrigerator from '../components/mainpage/CarouselRefrigerator';
import CarouselPopular from '../components/mainpage/CarouselPopular';
import CarouselSimilar from '../components/mainpage/CarouselSimilar';
import Banner from '../components/mainpage/Banner';
import { refrigeratorRecipe, userLikeRecipe, popularRecipe } from '../api/main';

import ContentLoader from 'react-content-loader'
// css
import classes from './MainPage.module.scss';
import { classicNameResolver } from 'typescript';
import { divide } from 'lodash';

const MyLoader = () => (
  <ContentLoader viewBox="0 0 1360 220" height={220} width={1360}>
    <rect x="100" y="20" rx="8" ry="8" width="200" height="200" />
    <rect x="320" y="20" rx="8" ry="8" width="200" height="200" />
    <rect x="540" y="20" rx="8" ry="8" width="200" height="200" />
    <rect x="760" y="20" rx="8" ry="8" width="200" height="200" />
    <rect x="980" y="20" rx="8" ry="8" width="200" height="200" />
  </ContentLoader> 
);

const MainPage: React.FC<{}> = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [refrige, setRefrige] = useState([])
  const [userLike, setUserLike] = useState([])
  const [popular, setPopular] = useState([])

  useEffect(() => {
    (async () => {
      const data = await userLikeRecipe();
      // console.log(data);
      setUserLike(data);
    })();
    (async () => {
      const data = await popularRecipe();
      // console.log(data);
      setPopular(data);
    })();
    (async () => {
      const data = await refrigeratorRecipe();
      // console.log(data);
      setRefrige(data);
    })();
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.container_box}>
        <Banner />
        <h2 className={classes.text}>냉장고 재료로 만들 수 있는 요리</h2>
        {isLoading ? <MyLoader />: <CarouselRefrigerator list={refrige}/>}
        <h2 className={classes.text}>회원님과 입맛이 비슷한 유저가 추천하는 요리</h2>
        {isLoading ? <MyLoader />: <CarouselRefrigerator list={userLike}/>}
        <h2 className={classes.text}>가장 인기있는 요리</h2>
        {isLoading ? <MyLoader />: <CarouselRefrigerator list={popular}/>}
      </div>
    </div>
  );
};

export default MainPage;

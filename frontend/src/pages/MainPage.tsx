// custom component
import CarouselRefrigerator from '../components/mainpage/CarouselRefrigerator';
import CarouselPopular from '../components/mainpage/CarouselPopular';
import CarouselSimilar from '../components/mainpage/CarouselSimilar'
import Banner from '../components/mainpage/Banner';
// css
import classes from './MainPage.module.scss';
import { classicNameResolver } from 'typescript';
const MainPage: React.FC<{}> = () => {
  return (
    <div className={classes.container}>
      <div className={classes.container_box}>
        <Banner />
        <h2 className={classes.text}>냉장고 재료로 만들 수 있는 요리</h2>
        <CarouselRefrigerator />
        <h2 className={classes.text}>가장 인기있는 요리</h2>
        <CarouselPopular />
        <h2 className={classes.text}>회원님과 입맛이 비슷한 유저가 추천하는 요리</h2>
        <CarouselSimilar />
      </div>
    </div>
  );
};

export default MainPage;

// custom component
import Carousel from '../components/mainpage/Carousel';
import Banner from '../components/mainpage/Banner';
// css
import classes from './MainPage.module.scss';
import { classicNameResolver } from 'typescript';
const MainPage: React.FC<{}> = () => {
  return (
    <div className={classes.container}>
      <div className={classes.container_box}>
        <Banner />
        <h2 className={classes.h2}>냉장고 재료로 만들 수 있는 요리</h2>
        <Carousel />
      </div>
    </div>
  );
};

export default MainPage;

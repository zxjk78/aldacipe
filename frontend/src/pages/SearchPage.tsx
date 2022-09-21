// custom component
import CarouselRefrigerator from '../components/mainpage/CarouselRefrigerator';
// css
import classes from './SearchPage.module.scss';
import { classicNameResolver } from 'typescript';
const SearchPage: React.FC<{}> = () => {
  return (
    <div className={classes.container}>
      <h1>검색결과</h1>
      <h3>요리</h3>
      <CarouselRefrigerator />
      <h3>재료로 하는 요리</h3>
      <CarouselRefrigerator />
    </div>
  );
};

export default SearchPage;

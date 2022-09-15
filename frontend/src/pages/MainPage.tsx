// custom component
import Carousel from '../components/mainpage/Carousel';

// css
import classes from './MainPage.module.scss';
const MainPage: React.FC<{}> = () => {
  return (
    <>
      <div className={classes.back}>
        <Carousel/>
      </div>
    </>
  );
};

export default MainPage;

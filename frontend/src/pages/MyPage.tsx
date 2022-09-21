// custom component
import MyInfo from '../components/mypage/MyInfo';
import FoodAllerge from '../components/mypage/FoodAllerge';
// css
import classes from './MyPage.module.scss';

export default function MyPage() {
  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <MyInfo />
          <FoodAllerge />
        </div>
      </div>
    </>
  );
}

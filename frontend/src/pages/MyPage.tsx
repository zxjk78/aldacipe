// custom component
import MyInfo from '../components/mypage/MyInfo';
import FoodBlackList from '../components/mypage/FoodBlackList';
// css
import classes from './MyPage.module.scss';

export default function MyPage() {
  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <MyInfo />
          <FoodBlackList />
        </div>
      </div>
    </>
  );
}

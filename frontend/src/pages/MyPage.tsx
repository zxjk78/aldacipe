// custom component
import MyInfo from '../components/mypage/MyInfo';

// css
import classes from './MyPage.module.scss';

export default function MyPage() {
  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <MyInfo />
        </div>
      </div>
    </>
  );
}

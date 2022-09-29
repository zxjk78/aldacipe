// custom component
import Refrigerator from '../components/refrigerator/Refrigerator';
import RefrigeratorBox from '../components/refrigerator/RefrigeratorBox';
// css
import classes from './MyRefrigerator.module.scss';

export default function MyRefrigerator() {
  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.refrigerator}>
          <RefrigeratorBox />
        </div>
        <div className={classes.ingredientlist}> 
          <h2>Refrigerator</h2>
          <Refrigerator />
        </div>
        <div className={classes.foodlist}>
          <h2>선택한 재료로 만들 수 있는 음식</h2>
        </div>
      </div>
    </>
  );
}

// custom component
import Refrigerator from '../components/refrigerator/Refrigerator';
// css
import classes from './MyRefrigerator.module.scss';

export default function MyRefrigerator() {
  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.refrigerator}>
          냉장고 박스
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

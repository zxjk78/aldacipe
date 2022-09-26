// custom component

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
          음식재료 리스트
        </div>
        <div className={classes.foodlist}>
          음식 리스트
        </div>
      </div>
    </>
  );
}

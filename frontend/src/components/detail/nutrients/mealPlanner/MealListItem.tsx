// react core

// API

// external module

// external component

// custom component

// css, interface(type)
import classes from './MealListItem.module.scss';

export default function MealListItem(props: {}) {
  const modifyHandler = () => {};
  return (
    <>
      <div className={classes.container}>
        <div className={classes.left}>
          <div>
            <img src="" alt="그림" />
          </div>
          <div>
            <div>아침</div>
            <div>라면</div>
          </div>
        </div>
        <div className={classes.right}>
          <div onClick={modifyHandler}>수정</div>
          <div>{9999}Kcal</div>
        </div>
      </div>
    </>
  );
}

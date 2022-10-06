// react core

// API

// external module

// external component

// custom component

// css, interface(type)
import classes from './MyRefrigerator2.module.scss';

const MyRefrigerator2 = (props: {}) => {
  return (
    <>
      <div className={classes.header}>내 냉장고</div>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.main}>
            <div className={classes.item1}>냉장고</div>
            <div className={classes.item2}>선택 재료</div>
            <div className={classes.item3}>선택 재료로 만들 수 있는 음식</div>
          </div>
          <div className={classes.footer}></div>
        </div>
      </div>
    </>
  );
};
export default MyRefrigerator2;

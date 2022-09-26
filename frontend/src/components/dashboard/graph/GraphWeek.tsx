// react core

// API

// external module

// external component

// custom component

// css, interface(type)
import classes from './GraphWeek.module.scss';

export default function GraphWeek(props: {}) {
  return (
    <>
      <div className={classes.container}>
        <div className={classes.header}>
          <div>지난 7일 동안 음식으로 섭취한 영양소</div>
          <div>총 {14000}Kcal</div>
        </div>
        <div className={classes.main}></div>
      </div>
    </>
  );
}

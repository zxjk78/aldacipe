// react core

// API

// external module

// external component

// custom component

// css, interface(type)
import classes from './UpperDetail.module.scss';

export default function UpperDetail(props: {}) {
  return (
    <>
      <div className={classes.container}>
        <div className={classes.header}>{`열량`}</div>
        <div className={classes.main}>
          <div>{14000}</div>
          <div>Kcal</div>
        </div>
        <div className={classes.footer}>{`평균보다 12% 낮습니다.`}</div>
      </div>
    </>
  );
}

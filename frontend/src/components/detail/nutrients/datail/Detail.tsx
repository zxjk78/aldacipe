// react core

// API

// external module

// external component

// custom component

// css, interface(type)
import classes from './Detail.module.scss';

export default function Detail(props: {}) {
  return (
    <>
      <div className={classes.title}>
        상세 <span>개인의 기록을 상세히 표시합니다.</span>
      </div>
      <div className={classes.container}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
        <div>7</div>
        <div>8</div>
      </div>
    </>
  );
}

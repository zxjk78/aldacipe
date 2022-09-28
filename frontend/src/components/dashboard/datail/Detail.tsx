// react core

// API

// external module

// external component

// custom component

// css, interface(type)
import classes from './Detail.module.scss';
import UpperDetail from './UpperDetail';
import VitaMineral from './VitaMineral';
export default function Detail(props: {}) {
  return (
    <>
      <div className={classes.title}>
        상세 <span>개인의 기록을 상세히 표시합니다.</span>
      </div>
      <div className={classes.container}>
        <div>
          <UpperDetail />
        </div>
        <div>
          <UpperDetail />
        </div>
        <div>
          <UpperDetail />
        </div>
        <div>
          <UpperDetail />
        </div>
        <div>
          <VitaMineral />
        </div>
        <div>
          <VitaMineral />
        </div>
        <div>7</div>
        <div>8</div>
      </div>
    </>
  );
}

// react core

// API

// external module

// external component

// custom component

// css, interface(type)
import classes from './UpperDetail.module.scss';
import { nutritionDictionary } from '../../../util/data';
export default function UpperDetail(props: {
  nutName: string;
  nutValue: number;
}) {
  const result = nutritionDictionary[props.nutName];

  return (
    <>
      <div className={classes.container}>
        <div className={classes.header}>{result.name}</div>
        <div className={classes.main}>
          <div>{props.nutValue.toFixed(1)}</div>
          <div>{result.scale}</div>
        </div>
        {/* <div className={classes.footer}>{`평균보다 12% 낮습니다.`}</div> */}
      </div>
    </>
  );
}

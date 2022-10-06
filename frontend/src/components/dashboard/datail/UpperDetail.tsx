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
  nutValueReco: number;
}) {
  const result = nutritionDictionary[props.nutName];
  const ratio = (props.nutValue / props.nutValueReco) * 100;
  const isLower = ratio <= 100;
  const amount = isLower ? 100 - ratio : ratio - 100;
  return (
    <>
      <div className={classes.container}>
        <div className={classes.header}>{result.name}</div>
        <div className={classes.main}>
          <div>{props.nutValue.toFixed(1)}</div>
          <div className={result.scale === 'g' ? classes.gram : classes.kcal}>
            {result.scale}
          </div>
        </div>
        <div
          className={
            result.scale === 'g'
              ? `${classes.footer} ${classes.gramFooter}`
              : classes.footer
          }
        >
          평균보다{' '}
          <span
            className={
              amount > 15
                ? classes.red
                : amount > 10
                ? classes.orange
                : classes.green
            }
          >
            {amount.toFixed(1)}%
          </span>{' '}
          <span>{isLower ? '낮습니다' : '높습니다'}</span>
        </div>
      </div>
    </>
  );
}

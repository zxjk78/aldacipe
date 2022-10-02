// react core

// API
import { fetchUserNutrientByPeriod } from '../../../api/dashboard';
// external module

// external component

// custom component

// css, interface(type)
import { useEffect, useState } from 'react';
import classes from './RadarChart.module.scss';

const RadarChart = (props: {}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState<any>(true);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const data = await fetchUserNutrientByPeriod('day');
      setChartData(data);
    })();

    setIsLoading(false);
  }, []);

  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.header}></div>
          <div className={classes.main}></div>
          <div className={classes.footer}></div>
        </div>
      </div>
    </>
  );
};
export default RadarChart;

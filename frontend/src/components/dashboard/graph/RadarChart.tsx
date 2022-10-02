// react core
import React, { useEffect, useState } from 'react';

// API
import { fetchUserNutrientByPeriod } from '../../../api/dashboard';
// external module
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
// external component

// custom component

// css, interface(type)
import classes from './RadarChart.module.scss';
import { RadarChartData } from '../../../util/interface';
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarChart = (props: { period: string }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState<RadarChartData | null>(null);
  const graphName: { [index: string]: string } = {
    day: '오늘 ',
    week: '7일 동안 ',
    month: '한달 동안 ',
  };
  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const data = await fetchUserNutrientByPeriod(props.period);
      const radarChartData = {
        labels: ['칼로리', '탄수화물', '단백질', '지방', '나트륨'],

        datasets: [
          {
            label: `${graphName[props.period]}섭취한 영양소`,
            data: Object.values(data) as number[],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2,
          },
        ],
      };

      setChartData(radarChartData);

      // radarChartData.datasets[0].data = Object.values(data) as number[];
    })();

    setIsLoading(false);
  }, [props.period]);

  return (
    <>
      {!isLoading && chartData && (
        <div className={classes.wrapper}>
          <div className={classes.container}>
            <div className={classes.header}>
              {/* {graphName[props.period]}섭취한 영양소 */}
            </div>
            <div className={classes.main}>
              <Radar
                data={chartData!}
                options={{
                  scales: {
                    r: {
                      display: true,
                      ticks: {
                        display: false,
                      },

                      angleLines: { display: false },
                    },
                  },
                }}
              />
            </div>
            <div className={classes.footer}></div>
          </div>
        </div>
      )}
    </>
  );
};
export default RadarChart;

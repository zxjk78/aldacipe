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
      const numArr = Object.values(data) as number[];
      const newArr = numArr.map((item) => item * 100);
      const radarChartData = {
        labels: ['칼로리', '탄수화물', '단백질', '지방', '나트륨'],

        datasets: [
          {
            label: `${graphName[props.period]}섭취한 영양소`,
            data: newArr,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2,
          },
          {
            label: `권장 섭취 영양소`,
            data: [100, 100, 100, 100, 100],
            backgroundColor: 'rgba(115, 60, 245, 0.2)',
            borderColor: '#1c5abc',
            borderWidth: 2,
          },
        ],
      };

      if (Object.values(data).join('-') === '0-0-0-0-0') {
        setChartData(null);
      } else {
        setChartData(radarChartData);
      }

      // radarChartData.datasets[0].data = Object.values(data) as number[];
    })();

    setIsLoading(false);
  }, [props.period]);

  return (
    <>
      {!isLoading && chartData ? (
        <div className={classes.wrapper}>
          <div className={classes.container}>
            <div className={classes.header}>
              {/* {graphName[props.period]}섭취한 영양소 */}
            </div>
            <div className={classes.main}>
              <Radar
                data={chartData!}
                options={{
                  plugins: {
                    tooltip: {
                      callbacks: {
                        label: function (context) {
                          const idx = context.dataIndex;
                          return context.dataset.data[idx]?.toFixed(2) + '%';
                        },
                      },
                    },
                  },
                  scales: {
                    r: {
                      display: true,
                      ticks: {
                        display: false,

                        callback: function (value, index, ticks) {
                          return value + '%';
                        },
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
      ) : !isLoading && !chartData ? (
        <div>섭취 기록을 추가해 주세요</div>
      ) : (
        <></>
      )}
    </>
  );
};
export default RadarChart;

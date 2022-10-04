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
import moment from 'moment';
import { Radar } from 'react-chartjs-2';
// external component
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
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

// 부모: dashboardPage

const RadarChart = (props: { period: string; isUpdated: boolean }) => {
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
            backgroundColor: 'rgba(47, 188, 160,0.3)',
            borderColor: '#058181',
            borderWidth: 2,
          },
          {
            label: `권장 섭취 영양소`,
            data: [100, 100, 100, 100, 100],
            backgroundColor: 'rgba(255, 235, 53, 0.334)',
            borderColor: '#bcaf1c',
            borderWidth: 2,
          },
        ],
      };

      if (Object.values(data).join('-') === '0-0-0-0-0') {
        setChartData(null);
      } else {
        setChartData(radarChartData);
      }
    })();

    setIsLoading(false);
  }, [props.period, props.isUpdated]);

  return (
    <>
      {!isLoading && chartData ? (
        <div className={classes.wrapper}>
          <div className={classes.container}>
            <div className={classes.header}>
              <CalendarMonthIcon />
              {props.period === 'day'
                ? moment(new Date()).format('YYYY-MM-DD')
                : props.period === 'week'
                ? `${moment(new Date())
                    .subtract(1, 'week')
                    .format('YYYY-MM-DD')} ~ ${moment(new Date()).format(
                    'YYYY-MM-DD'
                  )}`
                : `${moment(new Date())
                    .subtract(1, 'month')
                    .format('YYYY-MM-DD')} ~ ${moment(new Date()).format(
                    'YYYY-MM-DD'
                  )}`}
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

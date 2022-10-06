import React from 'react';

// external module
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// etc
import { Nutrient } from '../../../util/interface';
import { nutritionDictionary } from '../../../util/data';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,

  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
      text: '영양소',
    },
  },
};

// import classes from './BarChart.module.scss';

const BarChart = (props: {
  nutrient: Nutrient;
  nutrientReco: Nutrient;
  vitamin?: boolean;
}) => {
  const labels = props.vitamin
    ? [
        'vitaminB6',
        'vitaminB12',
        'vitaminC',
        'vitaminD',
        'vitaminE',
        'vitaminK',
      ]
    : ['calcium', 'iron', 'magnesium', 'sodium', 'zinc', 'selenium'];

  const data = {
    labels: labels.map((item) => nutritionDictionary[item].name),
    datasets: [
      {
        label: '내 섭취량',
        data: labels.map((item, index) => {
          let tmp = props.nutrient[labels[index]] as number;
          return tmp.toFixed(1);
        }),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: '권장 섭취량',
        data: labels.map((item, index) => props.nutrientReco[labels[index]]),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <>
      <Bar options={options} data={data} />
    </>
  );
};
export default BarChart;

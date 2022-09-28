import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['주의', '결핍', '충분'],
  datasets: [
    {
      label: '# of Votes',
      data: [3, 5, 3],
      backgroundColor: [
        'rgba(255, 206, 86, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
      ],
      borderColor: [
        'rgba(255, 206, 86, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
      ],
      borderWidth: 1,
    },
  ],
};
const options = {
  responsive: false,
};

const PieChart = () => {
  return (
    <>
      <Doughnut
        data={data}
        options={options}
        style={{ width: '200px', height: '200px' }}
      />
    </>
  );
};

export default PieChart;

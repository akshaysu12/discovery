import * as React from 'react';
import { Scatter } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

export const Visualization = (props) => {
  ChartDataLabels;

  const data = {
    labels: ['Scatter'],
    datasets: [
      {
        label: 'Top Tracks',
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 2,
        pointHitRadius: 10,
        data: props.data.dimensions,
      },
    ],
  };

  const options = {
    plugins: {
      datalabels: {
        display: true,
        align: 90,
        formatter: (value, context) => props.data.titles[context.dataIndex],
      },
    },
  };

  return(
    <Scatter data={data} options={options}/>
  );
};

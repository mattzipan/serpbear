import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Title, Tooltip, Legend);

type ChartProps = {
   labels: string[],
   sreies: number[]
}

const ChartSlim = ({ labels, sreies }: ChartProps) => {
   // Calculate the maximum & min value from the sreies array
   const maxYValue = Math.max(...sreies);
   const minYValue = Math.min(...sreies);

   // Check if the delta of the series is 0 (all values are the same) and all numbers are less than 10
   const isDeltaZero = new Set(sreies).size === 1;
   const allLessThanTen = sreies.every((value) => value < 10);

   const finalMaxYValue = isDeltaZero && allLessThanTen ? 10 : maxYValue;

   const options = {
      responsive: true,
      maintainAspectRatio: false,
      animation: false as const,
      scales: {
         y: {
            display: false,
            reverse: true,
            min: ((minYValue - 1) < 1) ? 1 : minYValue - 1, // - 1 to make it look more eye-pleasing
            max: finalMaxYValue + 1, // Set the max value dynamically based on sreies, +1 to make it look more eye-pleasing
         },
         x: {
            display: false,
         },
      },
      plugins: {
         tooltip: {
            enabled: false,
         },
         legend: {
            display: false,
         },
      },
   };

   return <div className='w-[100px] h-[30px] rounded border border-gray-200'>
      <Line
         datasetIdKey='XXX'
         options={options}
         data={{
            labels,
            datasets: [
               {
                  fill: 'start',
                  showLine: false,
                  data: sreies,
                  pointRadius: 0,
                  borderColor: 'rgb(31, 205, 176)',
                  backgroundColor: 'rgba(31, 205, 176, 0.5)',
               },
            ],
         }}
      />
   </div>;
};

export default ChartSlim;

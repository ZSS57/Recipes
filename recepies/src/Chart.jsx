import React from 'react';
import { Bar } from 'react-chartjs-2';

const Chart = ({ recipes }) => {
  const data = {
    labels: ['Calories', 'Protein', 'Fat', 'Carbs'],
    datasets: [
      {
        label: 'Average Nutrients',
        data: [
          recipes.reduce((acc, r) => acc + (r.calories || 0), 0) / recipes.length || 0,
          recipes.reduce((acc, r) => acc + parseInt(r.protein || 0), 0) / recipes.length || 0,
          recipes.reduce((acc, r) => acc + parseInt(r.fat || 0), 0) / recipes.length || 0,
          recipes.reduce((acc, r) => acc + parseInt(r.carbs || 0), 0) / recipes.length || 0,
        ],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)', 'rgba(255, 159, 64, 0.6)', 'rgba(255, 99, 132, 0.6)'],
      },
    ],
  };

  return (
    <div>
      <h2>Nutritional Information Chart</h2>
      <Bar data={data} />
    </div>
  );
};

export default Chart;

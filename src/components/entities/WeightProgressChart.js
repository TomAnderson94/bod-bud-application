import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';

// ** Chart Template has been referenced and adapted from the following online source:
// ** Raj, A. (2024) Using React Chart To Create Interactive Graphs, Zipy. Available at: https://www.zipy.ai/blog/using-react-chart-js

function WeightProgressChart({ userExercises, exercises }) {

  // State -------------------------------------------------
  const [chart, setChart] = useState(null);


  // Methods -----------------------------------------------
  useEffect(() => {
    if (userExercises.length > 0) {
      const canvas = document.getElementById('weightChart');
      console.log('user exercises are : ', userExercises);
      console.log('exercises are : ', exercises);

      const filteredExercises = exercises.filter(exercise => exercise.ExerciseTypeID === 3);
      console.log('filtered exercises are : ', filteredExercises);


      const exerciseNames = filteredExercises.reduce((acc, exercise) => {
        acc[exercise.ExerciseID] = exercise.ExerciseName;
        return acc;
      }, {});
      console.log('exerciseNames are : ', exerciseNames);

      // Group user exercises by exercise name
      const groupedExercises = userExercises.reduce((acc, exercise) => {
        const exerciseName = exerciseNames[exercise.ExerciseID] || 'Exercise not found';
        if (!acc[exerciseName]) {
          acc[exerciseName] = [];
        }
        acc[exerciseName].push({ x: exercise.Date, y: exercise.Weight });
        return acc;
      }, {});      

      const datasets = Object.keys(groupedExercises).map(exerciseName => {

        return {
          label: exerciseName,
          data: groupedExercises[exerciseName],
          borderColor: '#' + Math.floor(Math.random() * 16777215).toString(16), // Random colour each time
          fill: false
        };
      });

    // Destroy existing chart if it exists
    if (chart) {
        chart.destroy();
        }

      const weightChart = new Chart(canvas, {
        type: 'line',
        data: {
          datasets: datasets
        },
        options: {
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'day'
              },
              title: {
                display: true,
                text: 'Date'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Weight (kg)'
              }
            }
          }
        }
      });

      setChart(weightChart);
    }
  }, [userExercises]);

  return <canvas id='weightChart' />;
}

export default WeightProgressChart;

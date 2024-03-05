import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';

function WeightProgressChart({ userExercises, exercises }) {
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (userExercises.length > 0) {
      const ctx = document.getElementById('weightChart');
      console.log("user exercises are : ", userExercises);
      console.log("exercises are : ", exercises);

      const filteredExercises = exercises.filter(exercise => exercise.ExerciseTypeTypeID === 3);
      console.log("filtered exercises are : ", filteredExercises);


      const exerciseNames = filteredExercises.reduce((acc, exercise) => {
        acc[exercise.ExerciseID] = exercise.ExerciseName;
        return acc;
      }, {});
      console.log("exerciseNames are : ", exerciseNames);

      // Group user exercises by exercise name
      const groupedExercises = userExercises.reduce((acc, exercise) => {
        const exerciseName = exerciseNames[exercise.ExerciseExerciseID] || 'Exercise not found';
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

      const weightChart = new Chart(ctx, {
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

  return <canvas id="weightChart" />;
}

export default WeightProgressChart;

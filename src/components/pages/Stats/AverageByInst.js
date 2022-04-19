import React, { useEffect, useState } from "react";
import '../Stats/Stats.css'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend,RadialLinearScale,PointElement,LineElement,Filler} from 'chart.js';


ChartJS.register(ArcElement, Tooltip, Legend,RadialLinearScale,PointElement,LineElement,Filler);

const AverageByInst = (props) => {

    const avg = [];
    const batchName = []

    let i=0;
    props.inst && props.inst.forEach(ele => {
      batchName[i] = ele.batch_name;
         avg[i]= ele.Avg_marks;
         i++;
         
     });

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Batch Average Scores',
                font: {
                    size: 16,
                    padding: 5

                }

            },
        },
        scales: {
            x: {
              grid: {
                display: false
              }
            },
            y: {
              grid: {
                display: false
              }
            }
          },
    };

    const labels = batchName
    const data = {
        labels,
        datasets: [
            {
              label: "Avg score",
              data: avg,
              fill: true,
              backgroundColor: "rgba(75,192,192,0.2)",
              borderColor: "rgba(75,192,192,1)",
              tension: 0.2
            }
          ]
    }
    return (
        <>
                        <Line 
                        options={options}
                        data={data} />
        </>
    );
}

export default AverageByInst;
import React, { useEffect, useState } from "react";
import '../Stats/Stats.css'
import { PolarArea } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend,RadialLinearScale } from 'chart.js';
import { getDesignationBybatchId } from "../../../services/api";

ChartJS.register(ArcElement, Tooltip, Legend,RadialLinearScale);

const DesignationByBatch = (props) => {
console.log('p',props)
    // State to store Attendance Data

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                
            },
            title: {
                display: true,
                color:"#978d8d",
                text: 'Designation Record',
                font: {
                    size: 14,

                }

            },
        },
        scale: {
            display: false
          }
        
    };

    const labels = props.designationLabel
    const data = {
        labels,
        datasets: [
            {
                label: 'Designations',
                data: props.num,
                backgroundColor: [

                    'rgba(2, 181, 30, 0.5)',
                    'rgba(255, 99, 132,0.5)',
      'rgba(54, 162, 235,0.5)',
      'rgba(255, 205, 86,0.5)'
                ],

                borderWidth: 2,
                display: false
            },
        ],
        
    }
    return (
        <>
        
            <PolarArea
                className="Bar"
                options={options}
                data={data}
            />
        </>
    );
}

export default DesignationByBatch;
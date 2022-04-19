import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const PassFailByInst = (props) => {
    const assesmentName = []
    const pass = []
    const fail = []
    const retest = []

let i=0;
    props.inst && props.inst.forEach(element => {
        assesmentName[i] = element.batch_name;
        pass[i]= element.passed
        fail[i] = element.failed
        retest[i] = element.retest
        i++;
        
    });
console.log('pass',retest)
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                color:"#978d8d",
                text: 'Pass/Fail Statistics',
                font: {
                    size: 14,
                }
            },
        },
    };
    const labels = assesmentName
    const data = {
        labels,
        datasets: [
            {
                label: 'passed',
                data: pass,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Retest',
                data: retest,
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'Fail',
                data: fail,
                backgroundColor: 'rgb(201, 203, 207)',
            },
        ],
    }
  return (
    <div>
  <Bar
                className="Bar"
                options={options}
                data={data}
                
            />
    </div>
  )
}

export default PassFailByInst
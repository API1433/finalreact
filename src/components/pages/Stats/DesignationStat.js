import React, { useEffect, useState } from "react";
import '../Stats/Stats.css'
import { PolarArea } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend,RadialLinearScale } from 'chart.js';
import { getStatDesignation } from "../../../services/api";

ChartJS.register(ArcElement, Tooltip, Legend,RadialLinearScale);

const DesignationStat = () => {

    // State to store Attendance Data
    const [designation, setDesignation] = useState();

    useEffect(() => {
        getDesignationData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getDesignationData = async () => {
        await getStatDesignation().then((res) => {
            setDesignation(res.data);
            console.log('des',res.data)
        }).catch((err) => {
            console.log("error", err);
        })
    }

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

    const labels =designation && Object.keys(designation[0])
    const data = {
        labels,
        datasets: [
            {
                label: 'Designations',
                data: designation && Object.values(designation[0]),
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

export default DesignationStat;
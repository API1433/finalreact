import React, { useEffect, useState } from "react";
import '../Stats/Stats.css'
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
import { getStatParticipants } from "../../../services/api";


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

const ParticipantStat = () => {

    // State to store Attendance Data
    const [participants, setParticipants] = useState();
    const batchName =[];
    const count = [];
    
    useEffect(() => {
        getParticipantsData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getParticipantsData = async () => {
        await getStatParticipants().then((res) => {
            setParticipants(res.data);

            console.log('part',res.data)
        }).catch((err) => {
            console.log("error", err);
        })
        
    }

    let i=0;
   participants && participants.forEach(ele => {
        
        batchName[i] = ele.batch_name;
        count[i]= ele.count;
        i++;
        
    });

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                
            },
            title: {
                display: true,
                text: 'Participants Statistics',
                color:"#978d8d",
                font: {
                    size: 14,
                    

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
          }
    };

    const labels = batchName
    const data = {
        labels,
        datasets: [
            {
                label: 'Participants',
                data: count,
                backgroundColor: [

                    'rgba(25, 170, 222, 0.3)'
              
                ],

                borderWidth: 2,
                barThickness:20,
                

            },
        ]
    }


    return (
        <>
        
            <Bar
                className="Bar"
                options={options}
                data={data}
            />
        </>
    );
}

export default ParticipantStat;
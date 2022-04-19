import React, { useEffect, useState } from "react";
import '../Stats/Stats.css'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend,RadialLinearScale,PointElement,LineElement,Filler} from 'chart.js';
import { getStatParticipants } from "../../../services/api";

ChartJS.register(ArcElement, Tooltip, Legend,RadialLinearScale,PointElement,LineElement,Filler);

const AverageScoreStat = () => {

    // State to store Attendance Data
    const [marks,setMarks] = useState();
    const batchName =[];
    const avg = [];
    const atn =[];

    useEffect(() => {
        getScoresData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getScoresData = async () => {
        await getStatParticipants().then((res) => {
            setMarks(res.data);
            console.log('marks',res.data)
        }).catch((err) => {
            console.log("error", err);
        })
    }

    let i=0;
    marks && marks.forEach(ele => {
         
         batchName[i] = ele.batch_name;
         avg[i]= ele.avg_marks;
         atn[i] = ele.avg_atn;
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
                text: 'Batch Details',
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
          },
          bezierCurve: false
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
            },
            {
              label: "Attendance",
              data: atn,
              fill: false,
              borderColor: "#742774",
              tension: 0.2

            }
          ]
    }
    return (
        <>
        <div>
                        <Line 
                        options={options}
                        data={data} />
                        </div>
        </>
    );
}

export default AverageScoreStat;
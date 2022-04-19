import React, { useEffect, useState } from "react";
import '../Stats/Stats.css'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { getAttendanceJson } from "../../../services/api";
import { Tabs } from 'antd';

ChartJS.register(ArcElement, Tooltip, Legend);


const Attendancestats = () => {

  // State to store Attendance Data
  const [attendance, setAttendance] = useState();

  useEffect(() => {
    getAttendanceJsonData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getAttendanceJsonData = async () => {
    await getAttendanceJson().then((res) => {
      setAttendance(res.data);
      console.log('att', res.data)
    }).catch((err) => {
      console.log("error", err);
    })
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        title: {
          color: "red"
        }
      },
      title: {
        display: true,
        text: 'Attendance Recordd',
        color: "blue",
        font: {
          size: 16,

        }

      },

    },
    scales: {
      x: {
        barPercentage: 0.1,
        grid: {
          display: false,


        },
        ticks: {
          color: "red"
        }
      },
      y: {
        grid: {
          display: false
        }
      }
    },
    xAxes: [{

    }]
  };

  const labels = attendance && Object.keys(attendance[0])
  const data = {
    labels,
    datasets: [
      {
        label: 'P',
        data: [20, 30],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        barThickness: 6,
      },
      {
        label: 'A',
        data: [10, 5],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
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

export default Attendancestats;
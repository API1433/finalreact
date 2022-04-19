import '../Stats/Stats.css'
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);


const StatusByInst = (props) => {
  

    const options = {

        responsive: true,
        // cutout: 80,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                color:"#978d8d",
                text: 'Participants Type',
                font: {
                    size: 14,

                },

            },
           
        },
        centerText: {
            display: true,
            text: "280"
        }
     
    };


    const labels = ['Active', 'Completed']
    const data = {
        labels,
        datasets: [
            {
                label: 'Participants',
                data: [
                    props.active,
                    props.complete
                    
                ],
                backgroundColor: [

                    'rgb(219, 247, 80)',
                    'rgb(54, 162, 235)',
                    // 'rgb(219, 247, 80)',
                    // '#6f42c1',
                ],

                borderWidth: 2,
            },
        ]
    }
    return (
        <>       
          <Doughnut
                className="Bar"
                options={options}
                data={data}
            />      
        </>
    );
}

export default StatusByInst;
import '../Stats/Stats.css'
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);


const FreshLatStats = (props) => {


    const options = {
        responsive: true,
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

                }

            },
        },
    };


    const labels = ['Freshers', 'Laterals']
    const data = {
        labels,
        datasets: [
            {
                label: 'Participants',
                data: [
                    props.Fresher,
                    props.Lateral
                    
                ],
                backgroundColor: [

                    'rgb(219, 247, 80)',
      'rgb(54, 162, 235)',
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

export default FreshLatStats;
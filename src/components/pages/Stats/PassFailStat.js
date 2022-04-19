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
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
const PassFailStat = (props) => {
   
    const assesmentName = []
    const pass = []
    const fail = []
    const retest = []
let i = 0;
    props.Assesment && props.Assesment.forEach(element => {
        assesmentName[i] = element.assesment_name;
        pass[i]= element.pass
        fail[i] = element.fail
        retest[i] = element.retest
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
                color:"#978d8d",
                text: 'Pass/Fail Statistics',
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
    const labels = assesmentName
    const data = {
        labels,
        datasets: [
            {
                label: 'First attempt',
                data: pass,
                backgroundColor: 'rgb(60,179,113)',
                barThickness:40, 
                borderWidth: 2,
                borderColor:'white'
            },
            {
                label: 'Retest',
                data: retest,
                backgroundColor: 'rgb(95,158,160)',
                barThickness:40,
                borderWidth: 2,
                borderColor:'white'
            },
            {
                label: 'Fail',
                data: fail,
                backgroundColor: 'rgb(240,128,128)',
                barThickness:40,
                borderWidth: 2,
                borderColor:'white'
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
export default PassFailStat;
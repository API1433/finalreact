import React, { useEffect, useState } from "react";
import '../Stats/Stats.css'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend,RadialLinearScale } from 'chart.js';
import { getCertified } from "../../../services/api";
import { Progress } from 'antd';

ChartJS.register(ArcElement, Tooltip, Legend,RadialLinearScale);

const CertifiedStat = () => {

    // State to store Attendance Data
    const [cert, setCert] = useState();

    useEffect(() => {
        getCertData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getCertData = async () => {
        await getCertified().then((res) => {
            setCert(res.data);
            console.log('cert',res.data)
        }).catch((err) => {
            console.log("error", err);
        })
    }

   

    // const labels = cert && Object.keys(cert[0])
    // const data = {
    //     labels,
    //     datasets: [
    //         {
    //             label: 'Certifications',
    //             data: cert && Object.values(cert[0]),
    //             backgroundColor: [

    //                 'rgba(2, 181, 30, 0.8)',
    //                 'rgb(255, 99, 132)',
    //   'rgb(54, 162, 235)',
    //   'rgb(255, 205, 86)'
    //             ],

    //             borderWidth: 2,
    //         },
    //     ]
    // }
    return (
        <>
        
            {/* <Bar
                classNameName="Bar"
                options={options}
                data={data}
            /> */}
<div style={{textAlign:"center",overflow:"auto"}}>
  <div className="card-header text-muted large align-middle text-center" style={{borderRadius:"12px 12px 0px 0px", background:"white"}}>Certifications Statistics</div>
  {/* <div className="card-body"> */}
<table className="table table-hover">
 
  <thead style={{background:"cadetblue",color:"white"}}>
    <tr className="text-capitalize align-middle text-left" style={{borderColor: "#a7abb5"}}>
      <th style={{fontWeight:"600"}}>Certification Name</th>
     
      <th style={{fontWeight:"600"}}>Organization</th>
     
      <th style={{fontWeight:"600"}}>No of Certifications</th>
    </tr>
  </thead>
  <tbody style={{borderTop:"none"}}>
      {cert && cert.map(ele =>(
          <tr>
          <td className="align-middle text-left">{ele.certName}
            {/* <div className="d-flex align-items-center">
              <div className="ms-3">
                <p className="fw-bold mb-1">{ele.certName}</p>
              
              </div>
            </div> */}
          </td>
          <td className="align-middle text-left">{ele.certName}
          {/* <p className="fw-normal mb-1">{ele.certCompany}</p> */}
          </td>
         
          <td>
<div style={{display:"inline-block",width:"85%"}}>
          <Progress percent={ele.certCount} showInfo={true} />
          </div>
            {/* <p className="fw-normal mb-1" style={{display:"inline-block"}}>{ele.certCount}</p> */}
            
          </td>
          
         
          
        </tr>
      )

      )}
    
    
  </tbody>
</table>
</div>

        </>
    );
}

export default CertifiedStat;
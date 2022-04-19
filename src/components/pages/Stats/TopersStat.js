import React from "react";
import '../Stats/Stats.css'
import { Progress } from 'antd';

const TopersStat = (props) => {

    
console.log('topProps',props)
    
    return (
        <>
        <div style={{textAlign:"center",overflow:"auto"}}>
  <div className="card-header text-muted large align-middle text-center" style={{borderRadius:"12px 12px 0px 0px"}}>Top Performers</div>
  {/* <div className="card-body"> */}
<table className="table table-hover px-2">
 
  <thead style={{background:"cadetblue",color:"white"}}>
    <tr className="text-capitalize align-middle text-left" style={{borderColor: "#a7abb5"}}>
      <th className="text-center">Emp Id</th>
      <th className="text-center">Emp Name</th>
     
      <th className="text-center">Cgpa</th>
 
    </tr>
  </thead >
  <tbody style={{borderTop:"none"}}>
      {props.topers && props.topers.map(ele =>(

          <tr key={ele.empid}> 
              <td className="align-middle text-center">{ele.empid}</td>
          <td className="align-middle text-center">{ele.name}
         
          </td>
       
        <td><Progress type="circle" percent={(ele.cgpa)*10} width={30}   /></td>  
          
          
        </tr>
      )

      )}
    
    
  </tbody>
</table>
</div>

        </>
    );
}

export default TopersStat;
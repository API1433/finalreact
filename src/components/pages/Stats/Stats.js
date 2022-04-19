import React, { useEffect, useState } from "react";
import '../Stats/Stats.css'
import Batchstats from "./Batchstats";
import Attendancestats from "./Attendancestats";
import { FaUsers, FaChalkboardTeacher, FaPeopleCarry } from 'react-icons/fa';
import { RiAdminFill } from 'react-icons/ri';
import { getUserCount, getTotalPart } from "../../../services/api";
import { Row, Col } from 'antd';
import FreshLatStats from "./FreshersLaterals";
import ParticipantStat from "./ParticipantsStat";
import DesignationStat from "./DesignationStat";
import StatusStat from "./StatusStat";
import CertifiedStat from "./CertifiedStat";
import InstructorStat from "./InstructorStat";
import AverageScoreStat from "./AverageScoreStat";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


const Stats = () => {

    // State to store Users Data
    const [userData, setUserData] = useState();

    // State to store total students
    const [totalStu, setTotalStu] = useState();

    useEffect(() => {
        getUserData()
        getTotalStudents()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getUserData = async () => {
        await getUserCount().then((res) => {
            console.log("Result", res.data[0])
            setUserData(res.data[0]);
        })
    }

    const getTotalStudents = async () => {
        await getTotalPart().then((res) => {
            console.log("Totl Students", res.data[0]);
            setTotalStu(res.data[0]);
        })
    }

    return (
        <>
        <Row style={{padding:"30px 0px 0px 0px"}}>
            <Col md={6} sm={24} xs={24} >
                <div className="page-top" style={{padding:"15px"}}>
                    <Row>
                        <Col md={18} sm={18} xs={18}>
                        <div className="insidetext">No. Of Users</div>
                        <div>
                        <h4>{userData?.totalUsers}</h4>
                        </div>
                        </Col>
                        <Col md={6} sm={6} xs={6} style={{padding:"5px 0px 0px 0px"}}>
                            <div className="insidecard1">
                        <FaUsers size={20} /> 
                        </div>
                        </Col>
                    </Row>
                </div>
            </Col>
            <Col md={6} sm={24} xs={24} >
                <div className="page-top" style={{padding:"15px"}}>
                    <Row>
                        <Col md={18} sm={18} xs={18}>
                        <div className="insidetext">No. Of Employee</div>
                        <div>
                        <h4>{totalStu?.totalParticipants}</h4>
                        </div>
                        </Col>
                        <Col md={6} sm={6} xs={6} style={{padding:"5px 0px 0px 0px"}}>
                            <div className="insidecard1">
                            <RiAdminFill size={20} />
                        </div>
                        </Col>
                    </Row>
                </div>
            </Col>
            <Col md={6} sm={24} xs={24}  >
                <div className="page-top" style={{padding:"15px"}}>
                    <Row>
                        <Col md={18} sm={18} xs={18}>
                        <div className="insidetext">No. Of Coordinators</div>
                        <div>
                        <h4>{userData?.coordinators}</h4>
                        </div>
                        </Col>
                        <Col md={6} sm={6} xs={6} style={{padding:"5px 0px 0px 0px"}}>
                            <div className="insidecard1">
                            <FaPeopleCarry size={20} />
                        </div>
                        </Col>
                    </Row>
                </div>
            </Col>
            <Col md={6} sm={24} xs={24}  >
                <div className="page-top" style={{padding:"15px"}}>
                    <Row>
                        <Col md={18} sm={18} xs={18}>
                        <div className="insidetext">No. Of Instructors</div>
                        <div>
                        <h4>{userData?.instructors}</h4>
                        </div>
                        </Col>
                        <Col md={6} sm={6} xs={6} style={{padding:"5px 0px 0px 0px"}}>
                            <div className="insidecard1">
                            <FaChalkboardTeacher size={20} />
                        </div>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
        <Row style={{margin:"20px 0px"}}>
                <Col md={9} xs={24} sm={24} >
                    <div className="page-bottom" style={{height:"100%",textAlign:"center"}}>
                    <StatusStat/>
                </div>
               </Col>
               <Col md={15} xs={24} sm={24} >
               <div className="page-bottom" style={{height:"100%"}}>
               <AverageScoreStat/>
                    </div>
                    
               </Col>
            </Row>
        <Row style={{margin:"20px 0px"}}>
                <Col md={15} xs={24} sm={24} >
                    <div className="page-bottom" style={{height:"100%"}}>
                <ParticipantStat/>   
                </div>
               </Col>
               <Col md={9} xs={24} sm={24} >
               <div className="page-bottom" style={{height:"100%"}}>
               <DesignationStat/>
                    </div>
                    
               </Col>
            </Row>
            <Row >
                <Col md={8} xs={24} sm={24}  >
                    <div className="page-bottom" style={{height:"100%", textAlign:"center"}}>
                   <Calendar  markedDates={{
    '2012-05-16': {selected: true, marked: true, selectedColor: 'blue'}
  }}/>
                </div>
               </Col>
               <Col md={16} xs={24} sm={24} >
              <div className="page-bottom" style={{height:"100%", padding:"0px"}}>
                  <CertifiedStat/>
                  </div>
                    
               </Col>
            </Row>
            <Row style={{margin:"20px 0px"}}>
                <Col md={24} xs={24} sm={24}  >
                    
                    <Batchstats />
                    
               </Col>
               {/* <Col md={8} xs={24} sm={24} >

               </Col>
               <Col md={8} xs={24} sm={24} >
              
             
                    <Attendancestats/>
                    
               </Col> */}
            </Row>
            
           
           

            <Row >
                <Col md={24} xs={24} sm={24} >
                  
                <InstructorStat />
                    
               </Col>
               
            </Row>
        </>
    );
}

export default Stats;
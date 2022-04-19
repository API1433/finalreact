import React, { useEffect, useState } from "react";
import '../Stats/Stats.css'
import { Select } from 'antd'
import { Row, Col,Steps } from 'antd';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, RadialLinearScale } from 'chart.js';
import { InstructorStatById, InstructorById, getStatByInstructor } from "../../../services/api";
import PassFailByInst from "./PassFailByInst";
import StatusByInst from "./StatusByInst";
import AverageByInst from "./AverageByInst";
ChartJS.register(ArcElement, Tooltip, Legend, RadialLinearScale);

const {Step} = Steps;
const InstructorStat = () => {
    // State to store Instructor Data


    const [instructor, setInstructor] = useState();
    const [selectedId, setSelectedId] = useState(1);
    const [instStat, setInstStat] = useState([]);
    const [active, setActive] = useState();
    const [complete, setComplete] = useState();

    useEffect(() => {
        getInstructorData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const getInstructorData = async () => {
        await InstructorById().then((res) => {
            setInstructor(res.data);
            setSelectedId(res.data[0].id)
            setActive(res.data[0].active);
            setComplete(res.data[0].completed);
            console.log('instructor', selectedId)
        }).catch((err) => {
            console.log("error", err);
        })
    }
    

    useEffect(() => {
        const getInstructorStat = async () => {
            await InstructorStatById(selectedId).then((res) => {
                setInstStat(res.data)
    
                console.log('Istat', instStat)
    
            })
        }
        getInstructorStat();
    }, [selectedId])
    // get Batches 
    // const getBatches = async () => {

    //     // Get Batches that Co-ordinator is part of
    //     if (personal.role === "'co-ordinator'") {
    //         await getAllBatchesCor(personal.userId).then((res) => {
    //             setBatch(res.data.batches);
    //         })
    //     }

    //     // Get Batches that Instructor is part of
    //     else if (personal.role === "instructor") {
    //         await getAllBatchesIns(personal.userId).then((res) => {
    //             setBatch(res.data.batches);
    //         })
    //     }

    //     // Get all Batches
    //     else {
    //         await getAllBatches().then((res) => {
    //             setBatch(res.data.batches);
    //         })
    //     }

    // }
    const handleOnchangeB = value => {
        console.log("test", value)
        setSelectedId(value);

        instructor.forEach(element => {
            if (element.id === value) {
                setActive(element.active);
                setComplete(element.completed)
                // setFresher(element.freshers)
                // setLateral(element.laterals)
                //    getInstructorData();
                

            }

        });

    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Instructor Statistics Record',
                font: {
                    size: 16,
                }
            },
        },
    };
    const labels = ['a', 'b']
    const data = {
        labels,
        datasets: [
            {
                label: 'Instructor',
                data: [80, 70],
                backgroundColor: [
                    'rgba(2, 181, 30, 0.8)',
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                ],
                borderWidth: 2,
            },
        ]
    }
    return (
        <>
            <div className="page-bottom">
               
                <Row>
                    <Col md={12} sm={8} xs={8}>
                    <span className="insidetext">Statistics By Instructor</span>
                    </Col>

                    <Col md={12} sm={16} xs={16} >
                        <div>
                            <span className="insidetext">Filter by Instructor : </span>
                            <Select
                                className="myselect"
                                name="batch"
                                id="testselect"
                                value={{ value: selectedId }}
                                onChange={handleOnchangeB}
                                placeholder="Select a Batch"
                                style={{ width: "70%", padding: "0px 5px 0px 0px" }}>


                                {instructor && instructor.map(ele => (

                                    <options value={ele.id} key={ele.id}>{ele.instructor_name}</options>
                                )
                                )}
                            </Select>
                        </div>
                    </Col>
                </Row>
                <Row>
              <Col md={24}>
                  <div className="page-bottom progressStyle">
              <Steps current={1}>
    <Step title="Completed" description={"No of batches: "+ complete } />
    <Step title="In Progress" description={"No of batches: "+ active } />
    <Step title="Yet To Start" description="No of batches: 0" />
  </Steps></div>
          </Col>
          </Row>
                <Row>

                    <Col md={12} sm={24} xs={24}>
                        <div className="page-bottom" style={{ height: "95%" }}>
                            <PassFailByInst inst={instStat} />
                        </div>

                    </Col>


                    <Col md={12} sm={24} xs={24}>
                        <div className="page-bottom" style={{ height: "95%" }}>
                        <AverageByInst inst={instStat} />
                            {/* <StatusByInst active={active} complete={complete} /> */}
                        </div>

                    </Col>
                </Row>
                {/* <Row>
                    <Col md={24} sm={24} xs={24}>
                        <div className="page-bottom" style={{ height: "95%", width: "80%" }}>
                            <AverageByInst inst={instStat} />
                        </div>
                    </Col>
                </Row> */}
            </div>
        </>
    );
}
export default InstructorStat;
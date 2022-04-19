import React, { useEffect, useState } from "react";
import { Select } from 'antd'
import '../Stats/Stats.css'
import { getStatFL, getAssByBatch, getDesignationBybatchId,TopersByBatch } from "../../../services/api";
import FresherLaterals from "./FreshersLaterals";
import PassFailStat from "./PassFailStat";
import { Row, Col } from 'antd';
import DesignationByBatch from "./DesignationByBatch";
import TopersStat from "./TopersStat";

const Batchstats = () => {

    // State to store Attendance Data
    const [stat, setStats] = useState();

    //State to store batch id and name
    const [selectedBatchId, setSelectedBatchId] = useState();
    const [selecedBatchName, setSelecedBatchName] = useState();

    const [assesment, setAssesment] = useState();

    // State to store topers Data
    const [topers,setTopers] = useState();

    //State for fresher count
    const [fresher, setFresher] = useState();
    //State for lateral count
    const [lateral, setLateral] = useState();
    const [designation, setDesignation] = useState();

    useEffect(() => {
        getStatData();
    }, [])

    const getStatData = async () => {
        await getStatFL().then((res) => {
            console.log('stat', res.data)
            setStats(res.data)
            setSelecedBatchName(res.data[0].batchName)
            setSelectedBatchId(res.data[0].batchId)
            setFresher(res.data[0].freshers)
            setLateral(res.data[0].laterals)

        }).catch((err) => {
            console.log("error", err);
        })
    }    
    useEffect(() => {
        const getAssesmentByBatch = async () => {
            await getAssByBatch(selectedBatchId).then((res) => {
                console.log("asses", res.data)
                setAssesment(res.data)
    
            })
        }
        getAssesmentByBatch();
    }, [selectedBatchId])
    
    useEffect(() => {
        const getDesignationData = async () => {
            await getDesignationBybatchId(selectedBatchId).then((res) => {
                setDesignation(res.data);
                console.log('desbyid', res.data)
            }).catch((err) => {
                console.log("error", err);
            })
        }
        getDesignationData();
    }, [selectedBatchId])

    var num = [];
    var label = [];
    let i = 0;
    designation && designation.forEach(key => {
        num[i] = key.count;
        label[i] = key.designation;
        i++;
    })

    useEffect(() => {
        const getTopersData = async () => {
            await TopersByBatch(selectedBatchId).then((res) => {
                setTopers(res.data);
                console.log('top',res.data)
            }).catch((err) => {
                console.log("error", err);
            })
        }
        getTopersData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedBatchId])
    const handleOnchangeB = value => {
        console.log("test", value)
        setSelectedBatchId(value);
       
        stat.forEach(element => {
            if (element.batchId === value) {
                setFresher(element.freshers)
                setLateral(element.laterals)
                

            }

        });

    }
    return (
        <>
            <div className="page-bottom">
                <Row>
                    <Col md={12} sm={8} xs={8}>
                    <span className="insidetext">Statistics By Batch</span>
                    </Col>

                    <Col md={12} sm={16} xs={16} >
                        <div>
                            <span className="insidetext">Filter by batch : </span>
                            <Select
                                className="myselect"
                                name="batch"
                                id="testselect"
                                value={{ value: selectedBatchId }}
                                onChange={handleOnchangeB}
                                placeholder="Select a Batch"
                                style={{ width: "70%", padding: "0px 5px 0px 0px" }}>


                                {stat && stat.map(ele => (

                                    <options value={ele.batchId} key={ele.batchId}>{ele.batchName}</options>
                                )
                                )}
                            </Select>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={8} sm={24} xs={24}>
                        <div className="page-bottom" style={{ height:"95%", padding:"0px" }}>
                            <TopersStat topers={topers}/>
                        </div>
                    </Col>
                    <Col md={8} sm={24} xs={24}>
                        <div className="page-bottom" style={{ height: "95%",border:"solid 1px #fafafa" }}>
                            <FresherLaterals Fresher={fresher} Lateral={lateral} /></div>

                    </Col>
                    <Col md={8} sm={24} xs={24}>
                        <div className="page-bottom" style={{ height: "95%",border:"solid 1px #fafafa" }}>
                            <DesignationByBatch designationLabel={label} num={num} />
                        </div>
                    </Col>

                    <Col md={24} sm={24} xs={24}>
                        <div className="page-bottom" style={{ height: "95%" }}>
                            <PassFailStat Assesment={assesment} />
                        </div>
                    </Col>






                    {/* <Tabs type="card">

        {stat && stat.map(ele =>(

 <TabPane tab={Object.keys(ele)[0]} key={Object.keys(ele)[0]}>

 <FreshLatStats stat={ele} batchName={Object.keys(ele)[0]}/>
      </TabPane>
        )
)}
    </Tabs> */}
                </Row>
            </div>
        </>
    );
}

export default Batchstats;
import React, { useEffect, useState } from "react";
import { getAllBatches, getAllMarks, getAllBatchesIns, getAllAssesments, getAllBatchesCor, getBatchById, addMarks } from '../../../services/api';
import { Row, Col, Form, Table, Input, notification, Select, DatePicker } from 'antd';
import './Assesments.css';
import ButtonReuse from "../../../atoms/Button";
import { ImportExcel } from '../../index';
import { useNavigate, useParams } from "react-router-dom";

const Assesments = () => {

    let navigate = useNavigate();

    let params = useParams()

    // Date Format
    const dateFormat = 'YYYY-MM-DD';

    // State to store batch details
    const [batch, setBatch] = useState([])

    // State to store Assesment List
    const [assesmentList, setAssesmentList] = useState([]);

    //state for selected batch id from dropdown 1
    const [batchId, setBatchId] = useState();

    //state for selected value from dropdown 2
    const [assesmentId, setAssesmentId] = useState()

    // State to store Assesment Name
    const [assesmentName, setAssesmentName] = useState("")

    // State to store Batch Name
    const [batchName, setBatchName] = useState("");

    // State to store Assesment date
    const [assesmentDate, setAssesmentDate] = useState("")

    // State to store existing marks
    const [marks, setMarks] = useState([])

    // State to send new Marks
    const [newMarks, setNewMarks] = useState([]);

    // State for Submit Button
    const [disabled, setDisabled] = useState(true);

    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);

    let personal = JSON.parse(localStorage.getItem("personal"));

    //Import from excel
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        setAssesmentId(assesmentId);

    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };



    useEffect(() => {
        getBatches();
        getAssesments();
        getBatchData();
        setBatchId(localStorage.getItem("batch_id"))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Marks body
    let body = {
        "batch_id": batchId,
        "test_name": assesmentName,
        "test_date": assesmentDate
    }


    const getBatchData = () => {
        let batchData = JSON.parse(localStorage.getItem("testInfo"));
        let batchNameDef = localStorage.getItem("BatchName");
        setBatchId(batchData?.batch_id);
        // let newAssesDate = new Date(batchData?.exam_date);
        setAssesmentName(batchData?.test_name);
        setBatchName(batchNameDef);
    }

    // get Batches 
    const getBatches = async () => {

        // Get Batches that Co-ordinator is part of
        if (personal.role === "'co-ordinator'") {
            await getAllBatchesCor(personal.userId).then((res) => {
                setBatch(res.data.batches);
            })
        }

        // Get Batches that Instructor is part of
        else if (personal.role === "instructor") {
            await getAllBatchesIns(personal.userId).then((res) => {
                setBatch(res.data.batches);
            })
        }

        // Get all Batches
        else {
            await getAllBatches().then((res) => {
                setBatch(res.data.batches);
            })
        }

    }

    // get All Assesments
    const getAssesments = async () => {
        await getAllAssesments().then((res) => {
            setAssesmentList(res.data.tests);
        })
    }

    const handleOnchangeB = value => {
        setBatchId(value);

    }
    const handleOnchangeA = value => {
        // setAssesmentName(value);
        let sendingData = newMarks.map((prev) => ({
            ...prev, test_name: value
        }))
        setNewMarks(sendingData);
    }

    useEffect(() => {
        getBatchById(params.Batch_id).then((res) => {
            let newData =
                res.data.data.rows[0].map((part) => ({
                    EmpId: part.EmployeeId,
                    Name: part.Name,
                    ExamDate: assesmentDate,
                    Marks: 0,
                    Comments: ""
                }))
            setMarks(newData);
            let sendingData =
                res.data.data.rows[0].map((part) => ({
                    batch_id: params.Batch_id,
                    employee_id: part.EmployeeId,
                    test_name: assesmentName,
                    exam_date: assesmentDate,
                    marks: 0,
                    comments: ""
                }))
            setNewMarks(sendingData)
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    const setNewDataMarks = (data) => {
        for (let i in newMarks) {
            if (newMarks[i].employee_id === data.id) {
                newMarks[i].marks = data.marks
            }
        }
    }

    const setNewDataComments = (data) => {
        for (let i in newMarks) {
            if (newMarks[i].employee_id === data.id) {
                newMarks[i].comments = data.comments
            }
        }

    }

    // Function to insert scores
    const submitScores = () => {
        getMarksTable()
    }

    const notify = (type) => {
        notification[type]({
            description: "Scores Added Successfully"
        })
    }

    // get table data
    const getMarksTable = async () => {
        await getAllMarks(body).then((res) => {
            if (res.data.data.row.length === 0) {
                addMarks(newMarks).then(() => {
                    notify("success");
                    // navigate(`/assesment/${batchId}`)
                    navigate(`/batches/${params.Batch_id}`)
                })
            } else {

                const notify = (type) => {
                    notification[type]({
                        message: 'Scores already present',
                        description: "Please select a different batch, test or date"
                    })
                }

                notify("error")
            }

        })
    }

    // columns of the table
    const columns = [

        {
            title: "Emp ID",
            dataIndex: "EmpId",
            key: "EmpId",
            width: "10%",
        },
        {
            title: "Name",
            dataIndex: "Name",
            key: "Name",
            width: "20%",
            sorter: (a, b) => a.Name.localeCompare(b.Name),
        },

        {
            title: "Assesment Date",
            dataIndex: "ExamDate",
            key: "ExamDate",
            editable: true,
            width: "20%",
            sorter: (a, b) => a.ExamDate.localeCompare(b.ExamDate),
            render: (text, record) =>
                <div>
                    <span >
                        {record.ExamDate}
                    </span>

                </div>


        },
        {
            title: "Score",
            dataIndex: "Marks",
            key: ["Marks", "EmpId"],
            width: "10%",
            sorter: (a, b) => a.Marks.localeCompare(b.Marks),
            render: (text, record) =>
                <>
                    <Input type="text" name="input" onChange={(e) => {
                        setNewDataMarks({
                            marks: Number(e.target.value),
                            id: record["EmpId"]
                        })
                    }} placeholder="Enter marks" defaultValue={record["Marks"]}

                    />

                </>

        },
        {
            title: "Comments",
            dataIndex: "Comments",
            key: ["Comments", "EmpId"],
            editable: true,
            width: "30%",
            render: (text, record) =>
                <>
                    <Input type="text" name="input" placeholder="Enter Comments"
                        onChange={(e) => {
                            setNewDataComments({
                                comments: e.target.value,
                                id: record["EmpId"]
                            })
                        }
                        }
                        defaultValue={record["Comments"]} />
                </>

        },
    ];

    return (
        <>
            <div className="page-top"><span>Add Assesment Scores</span> </div>
            <div className="page-bottom">
                <Row>
                    <Col md={4}>
                        <span style={{ paddingLeft: "15px" }}>Choose Batch:</span>
                        <Select
                            className="myselect"
                            name="batch"
                            id="testselect"
                            value={{ label: batchName, value: batchId }}
                            onChange={handleOnchangeB}
                            placeholder="Select a Batch"
                            style={{ width: "120px" }}
                        >
                            {
                                batch?.map((ele) => (
                                    <option key={ele.BatchId} value={ele.BatchId}>{ele.BatchName} </option>
                                ))
                            }
                        </Select>
                    </Col>
                    <Col md={4}>

                        <span style={{ paddingLeft: "15px" }}>Choose Assesment:</span>
                        <Select
                            onChange={handleOnchangeA}
                            className="myselect"
                            // value={{ label: assesmentName, value: assesmentName }}
                            name="assesment"
                            id="asselect"
                            placeholder="Select a Test"
                            style={{ width: "120px" }}

                        >
                            {
                                assesmentList.map((element) => (
                                    <option key={element.testId} value={element.testName}>{element.testName}</option>
                                ))
                            }
                        </Select>
                    </Col>
                    <Col md={4}>
                        <span style={{ marginLeft: "5%" }}>Choose Date:</span>
                        <div className="bd_button">
                            <DatePicker name="start_date"
                                // defaultValue={moment('2015/01/01', dateFormat)}
                                format={dateFormat}
                                onChange={(dateString) => {
                                    setAssesmentDate(dateString.format("YYYY-MM-DD"));
                                    setDisabled(false)
                                    let displayData = marks.map((prev) => ({
                                        ...prev, ExamDate: dateString.format("YYYY-MM-DD")
                                    }))
                                    setMarks(displayData);
                                    let sendingData = newMarks.map((prev) => ({
                                        ...prev, exam_date: dateString.format("YYYY-MM-DD")
                                    }))
                                    setNewMarks(sendingData);
                                    console.log("Marks", marks);
                                }}
                            />
                        </div>
                    </Col>
                    <Col md={6} style={{ textAlign: "end" }}>
                        <div className="bd_button">
                            { }
                            <ButtonReuse
                                type="primary"
                                className="btn btn-warning"
                                htmlType="primary"
                                value="Submit"
                                disabled={disabled}
                                onClick={submitScores}
                            >
                            </ButtonReuse>
                        </div>
                        {disabled && <p>Please select date before submitting</p>}
                    </Col>
                    <Col md={6} style={{ textAlign: "end" }}>
                        <div className="bd_button">
                            <ButtonReuse
                                type="primary"
                                className="btn btn-primary"
                                htmlType="primary"
                                value="Import from Excel"
                                onClick={showModal}

                            ></ButtonReuse>
                            <ImportExcel handleOk={handleOk}
                                handleCancel={handleCancel}
                                isModalVisible={isModalVisible} batch_id={batchId} assesment_id={assesmentId} />
                        </div>
                    </Col>

                </Row>
                <Row style={{ marginTop: "30px" }}>
                    <Col md={24}>


                        <Form form={form} component={false}>

                            <Table
                                columns={columns}
                                dataSource={marks}
                                bordered
                                rowClassName="editable-row"
                                pagination={{
                                    defaultPageSize: 10,
                                    showSizeChanger: true,
                                    pageSizeOptions: ["10", "20", "30", "40", "50"],
                                }}

                            />
                        </Form>
                    </Col>
                    <Row>
                    </Row>
                </Row>


            </div>
        </>
    );
}

export default Assesments;
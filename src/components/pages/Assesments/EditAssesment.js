import React, { useEffect, useState } from "react";
import { getAllBatches, getAllMarks, getAllBatchesIns, getAllAssesments, getAllBatchesCor, getBatchById, updateMarks } from '../../../services/api';
import { downloadColumns } from './downloadColumns'
import { Row, Col, Form, Table, Input, Popconfirm, notification, Select, DatePicker } from 'antd';
import './Assesments.css';
import ButtonReuse from "../../../atoms/Button";
import { Excel } from 'antd-table-saveas-excel';
import { EditOutlined, SaveOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from "react-router-dom";

const EditAssesments = () => {

    let params = useParams();
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

    // State to check whether marks exists
    const [existing, setExisting] = useState(true);

    // State to send new Marks
    const [newMarks, setNewMarks] = useState([]);

    // State to store editable cell
    const [editable, setEditable] = useState('');

    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newDataForUpdate, setNewDataForUpdate] = useState([]);

    let personal = JSON.parse(localStorage.getItem("personal"));
    // let Batch_id = localStorage.getItem("batch_id")

    //const [editingKey, setEditingKey] = useState(false);



    useEffect(() => {
        getBatches();
        getAssesments();
        getBatchData();
        setBatchId(localStorage.getItem("batch_id"));
        let data = JSON.parse(localStorage.getItem("testInfo"));

        // Marks body
        let body = {
            "batch_id": Number(params.Batch_id),
            "test_name": data.test_name,
            "test_date": data.exam_date
        }
        getMarksTable(body);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


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
            await getAllBatchesCor(personal.userid).then((res) => {
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
        setAssesmentName(value);
    }


    // get table data
    const getMarksTable = async (body) => {
        await getAllMarks(body).then((res) => {
            setMarks(res.data.data.row);
            let sendingData =
                res.data.data.row.map((part) => ({
                    employee_id: part.EmpId,
                    test_name: part.ExamName,
                    date: part.ExamDate,
                    marks: part.Marks,
                    comments: part.Comments,
                    id: part.Id
                }))
            setNewMarks(sendingData)
        })
    }

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


    // Function to update scores
    const updateScores = () => {
        updateMarks(newDataForUpdate).then(() => {
            notify("success")
        })

        const notify = (type) => {
            notification[type]({
                description: "Scores Updated Successfully"
            })
        }
        let data = JSON.parse(localStorage.getItem("testInfo"));

        // Marks body
        let body = {
            "batch_id": Number(params.Batch_id),
            "test_name": data.test_name,
            "test_date": data.exam_date
        }
        setEditable('')
        getMarksTable(body)
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
            render: (text, record) => {
                return (editable === record.EmpId) ? (

                    <>
                        <Input type="date" name="input" onChange={(e) => {
                            setNewDataForUpdate({
                                comments: newDataForUpdate.comments,
                                date: e.target.value,
                                marks: newDataForUpdate.marks,
                                id: newDataForUpdate.id,
                                test_name: newDataForUpdate.test_name,
                                batch_id: Number(params.Batch_id)
                            })
                        }} defaultValue={record["ExamDate"]}

                        />

                    </>
                ) : (
                    <div>
                        <span >
                            {record.ExamDate}
                        </span>

                    </div>

                );
            }
        },
        {
            title: "Score",
            dataIndex: "Marks",
            key: ["Marks", "EmpId"],
            width: "10%",
            sorter: (a, b) => a.Marks.localeCompare(b.Marks),
            render: (text, record) => {
                return (editable === record.EmpId) ? (
                    <>
                        <Input type="number" name="input" onChange={(e) => {
                            setNewDataForUpdate({
                                comments: newDataForUpdate.comments,
                                date: newDataForUpdate.date,
                                marks: Number(e.target.value),
                                id: newDataForUpdate.id,
                                test_name: newDataForUpdate.test_name,
                                batch_id: Number(params.Batch_id)
                            })
                        }} placeholder="Enter marks" defaultValue={record["Marks"]}

                        />

                    </>
                ) : (
                    <div>
                        {existing ? <>
                            {record["Marks"]} </> :

                            <>
                                <Input type="text" name="input" onChange={(e) => {
                                    setNewDataMarks({
                                        marks: Number(e.target.value),
                                        id: record["EmpId"]
                                    })
                                }} placeholder="Enter marks" defaultValue={record["Marks"]}

                                />

                            </>}


                    </div>

                );
            }

        },
        {
            title: "Comments",
            dataIndex: "Comments",
            key: ["Comments", "EmpId"],
            editable: true,
            width: "30%",
            render: (text, record) => {
                return (editable === record.EmpId) ? (
                    <>
                        <Input type="text" name="input" placeholder="Enter Comments"
                            onChange={(e) => {
                                setNewDataForUpdate({
                                    comments: e.target.value,
                                    date: newDataForUpdate.date,
                                    marks: newDataForUpdate.marks,
                                    id: newDataForUpdate.id,
                                    test_name: newDataForUpdate.test_name,
                                    batch_id: Number(params.Batch_id)
                                })
                            }
                            }
                            defaultValue={record["Comments"]} />
                    </>
                ) : (
                    <div>
                        {existing ? <>
                            {record["Comments"]}
                        </> :
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


                        }




                    </div>

                );
            }


        },
        {
            title: "Action",
            dataIndex: "Id",
            key: "Id",
            render: (text, record) => {
                return (editable === record.EmpId) ? (
                    <div>
                        <span>
                            <SaveOutlined onClick={() => updateScores()}
                                style={{ cursor: "pointer", color: "green", padding: 5, fontSize: 15 }} />
                        </span>
                        <span>
                            <Popconfirm title="Sure to cancel?" className="ant-typography" onConfirm={() => {
                                setEditable('')
                            }}>
                                <CloseCircleOutlined style={{ cursor: "pointer", color: "red", padding: 5, fontSize: 15 }} />
                            </Popconfirm>
                        </span>
                    </div>
                ) : (
                    <div>
                        <span >
                            <EditOutlined
                                onClick={() => {
                                    setNewDataForUpdate({
                                        comments: record.Comments,
                                        date: record.ExamDate,
                                        marks: record.Marks,
                                        id: record.EmpId,
                                        test_name: assesmentName,
                                        batch_id: batchId
                                    })
                                    setEditable(record.EmpId)
                                }}
                                style={{ cursor: "pointer", color: "blue", paddingRight: "20px" }} />
                        </span>

                    </div>

                );

            },
        }
    ];


    return (
        <>
            <div className="page-top"><span>Dashboard</span> </div>
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
                            value={{ label: assesmentName, value: assesmentName }}
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
                                onChange={(dateString) => { setAssesmentDate(dateString.format("YYYY-MM-DD")) }}
                            />
                        </div>
                    </Col>
                    {/* <Col md={4} style={{ textAlign: "end" }}>
                        <div className="bd_button">
                            <ButtonReuse
                                type="primary"
                                className="btn btn-warning"
                                htmlType="primary"
                                value="Add/Edit Scores"
                                onClick={getMarksTable}
                            >
                            </ButtonReuse>
                        </div>
                    </Col> */}
                    {/* <Col md={4} style={{ textAlign: "end" }}>
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
                    </Col> */}
                    <Col md={12} style={{ textAlign: "end" }}>
                        <div className="bd_button">
                            <ButtonReuse
                                type="primary"
                                className="btn btn-warning"
                                htmlType="primary"
                                value="Download Scores"
                                onClick={() => {
                                    const excel = new Excel();
                                    excel
                                        .addSheet('test1')

                                        // .addColumns((assesmentId===54321)? downloadAllcolumns: downloadColumns)
                                        .addColumns(downloadColumns)
                                        .addDataSource(marks)
                                        .saveAs('Marks.xlsx');
                                }}
                            >
                            </ButtonReuse>
                        </div>
                    </Col>
                </Row>
                <Row style={{ marginTop: "30px" }}>
                    <Col md={24}>


                        <Form form={form} component={false}>

                            <Table
                                // columns={columns}
                                columns={
                                    existing
                                        ? columns
                                        : columns.filter(col => col.title !== "Action")
                                }
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
                    {/* <Row>
                        {!existing &&
                            <ButtonReuse
                                type="primary"
                                className="primary-btn"
                                value="Submit"
                                onClick={submitScores}
                            ></ButtonReuse>}

                    </Row> */}
                </Row>


            </div>
        </>
    );
}

export default EditAssesments;
import React, { useEffect, useState } from "react";
import { Row, Col, Table } from 'antd';
import { useParams } from 'react-router-dom';
import { getTraineesById } from "../../../services/api";

const TraineeInfo = () => {

    const { Tr_id } = useParams();

    const [basicInfo, setbasicInfo] = useState();

    const [batchTable, setBatchTable] = useState([]);


    useEffect(() => {
        getTraineesInfo();
    }, []);

    const getTraineesInfo = async () => {
        await getTraineesById(Tr_id).then((res) => {
            console.log("The result", res.data);
            setbasicInfo(res.data);
            setBatchTable(res.data.batch);
        })
    }

    // Students Table Columns
    const columns = [
        {
            title: "Batch Id",
            dataIndex: "batch_id",
            key: "batch_id",
            sorter: (a, b) => a.batch_id.localeCompare(b.batch_id),
        },
        {
            title: "Batch Name",
            dataIndex: "batch_name",
            key: "batch_name",
            sorter: (a, b) => a.batch_name.localeCompare(b.batch_name),
        },
        {
            title: "Batch start date",
            dataIndex: "batch_start_date",
            key: "batch_start_date",
            sorter: (a, b) => a.batch_start_date.localeCompare(b.batch_start_date),
        },
        {
            title: "Batch end date",
            dataIndex: "batch_end_date",
            key: "batch_end_date",
            sorter: (a, b) => a.batch_end_date.localeCompare(b.batch_end_date),
        },
        {
            title: "Average Score",
            dataIndex: "average_score",
            key: "average_score",
            sorter: (a, b) => a.average_score.localeCompare(b.average_score),
        },
        {
            title: "CGPA",
            dataIndex: "cgpa",
            key: "cgpa",
            sorter: (a, b) => a.cgpa.localeCompare(b.cgpa),
        },
        {
            title: "Attendance %",
            dataIndex: "attendance",
            key: "attendance",
            sorter: (a, b) => a.attendance.localeCompare(b.attendance),
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            sorter: (a, b) => a.status.localeCompare(b.status),
        },

    ]

    return (
        <>
            <div className="page-top">
                <span>Trainee Info</span>
            </div>

            <Row>
                <Col md={8} xs={24}>
                    <div className="page-top">
                        <p>Basic Info</p>
                        <Row>
                            <Col span={12}>Emp Id:</Col>
                            <Col span={12}>{basicInfo?.emp_id}</Col>
                        </Row>
                        <Row>
                            <Col span={12}>Name:</Col>
                            <Col span={12}>{basicInfo?.name}</Col>
                        </Row>
                        <Row>
                            <Col span={12}>Email:</Col>
                            <Col span={12}>{basicInfo?.email}</Col>
                        </Row>
                        <Row>
                            <Col span={12}>Designation:</Col>
                            <Col span={12}>{basicInfo?.designation}</Col>
                        </Row>
                        <Row>
                            <Col span={12}>Phone:</Col>
                            <Col span={12}>{basicInfo?.phone_number}</Col>
                        </Row>
                        <Row>
                            <Col span={12}>Work Location:</Col>
                            <Col span={12}>{basicInfo?.work_location}</Col>
                        </Row>
                        <Row>
                            <Col span={12}>Joining Date:</Col>
                            <Col span={12}>{basicInfo?.joining_date}</Col>
                        </Row>
                        <Row>
                            <Col span={12}>Total Experience:</Col>
                            <Col span={12}>{basicInfo?.experience}</Col>
                        </Row>
                    </div>
                </Col>
                <Col md={16} xs={24}>
                    <div className="page-top">
                        <p style={{ marginBottom: "10px" }}>Training Details</p>
                        <Table
                            columns={columns}
                            dataSource={batchTable}
                            bordered
                            className="batchTable"
                            scroll={{ x: 1000 }}
                            pagination={{
                                defaultPageSize: 5,
                                showSizeChanger: true,
                                pageSizeOptions: ["10", "20", "30", "40", "50"],
                            }}
                        />
                    </div>

                </Col>
            </Row>

        </>
    );
}

export default TraineeInfo;

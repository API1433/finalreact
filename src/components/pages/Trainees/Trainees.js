import React, { useEffect, useState } from "react";
import { getTrainees } from "../../../services/api";
import { Table, Row, Col, Input } from "antd";
import {
    EyeOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom'

const Trainees = () => {

    const [trainee, setTrainee] = useState([]);

    const [filterData, setFilterData] = useState([]);

    const [nameSearch, setNameSearch] = useState("");

    useEffect(() => {
        getTraineesList()
    }, []);

    // Students Table Columns
    const columns = [
        {
            title: "Emp Id",
            dataIndex: "emp_id",
            key: "emp_id",
            sorter: (a, b) => a.emp_id.localeCompare(b.emp_id),
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            sorter: (a, b) => a.email.localeCompare(b.email),
        },

        {
            title: "Designation",
            dataIndex: "designation",
            key: "designation",
            sorter: (a, b) => a.designation.localeCompare(b.designation),
        },
        {
            title: "Action",
            dataIndex: "id",
            key: "id",
            render: (text, record) =>
                <>
                    <div>
                        <Link to={`/trainees/${record.id}`}>
                            <EyeOutlined
                                onClick={() => { console.log(record.id) }}
                                style={{ cursor: "pointer", color: "blue", paddingRight: "20px" }} />
                        </Link>
                    </div>

                </>

        },

    ];

    const getTraineesList = async () => {
        await getTrainees().then((res) => {
            // console.log("Student List", res.data);
            setTrainee(res.data);
            setFilterData(res.data);
        })
    }

    // Function to search the Table
    useEffect(() => {
        if (trainee) {
            const results = trainee.filter(
                (item) =>
                    item.emp_id.toLowerCase().includes(nameSearch.toLowerCase()) ||
                    item.name.toLowerCase().includes(nameSearch.toLowerCase()) ||
                    item.email.toLowerCase().includes(nameSearch.toLowerCase())
            );
            setFilterData(results);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nameSearch])

    // Function to set nameSearch
    const handleOnChange = (event) => {
        setNameSearch(event.target.value);
    };

    return (
        <>
            <div className="page-top">

                <Row>
                    <Col md={10} sm={10} xs={10}>
                        <span>Trainees List</span>
                    </Col>
                    <Col md={14} sm={14} xs={14} style={{ textAlign: "end" }}>
                        <div className="searchForm">
                            <form>
                                <Input.Search
                                    allowClear
                                    onChange={handleOnChange}
                                    placeholder="Search by name / empId / email"
                                />
                            </form>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="page-top">
                <Table
                    columns={columns}
                    dataSource={filterData}
                    bordered
                    className="usersTable"
                    pagination={{
                        defaultPageSize: 5,
                        showSizeChanger: true,
                        pageSizeOptions: ["10", "20", "30", "40", "50"],
                    }}
                />
            </div>
        </>
    );
}

export default Trainees;
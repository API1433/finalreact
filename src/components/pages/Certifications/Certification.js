import React from 'react'
import { useState, useEffect } from 'react';
import ButtonReuse from "../../../atoms/Button";
import { Row, Col,Table, Modal,notification } from 'antd';
import { getCertification,deleteCertification } from '../../../services/api'
import AddCertificate from "./AddCertificate";

import {
    EyeOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons';

function Certification() {
    // State for Add User Drawer
    const [visible, setVisible] = useState(false);
    const [certificate, setCertificate] = useState();
    const [viewCert, setViewCert] = useState();
    const personal = {
        "emp_id" : localStorage.getItem("userId"),
        "role" : localStorage.getItem("role")
    }
    

    const { confirm } = Modal;

    console.log("Details",personal);
    const MAINURL = process.env.REACT_APP_BASE_URL
    // State for Edit User Drawer
    const [editVisible, setEditVisible] = useState(false);
    const closeHandler = () => {
        setVisible(false);
        setEditVisible(false);
    };

    // Visible function for Add certificate
    const visibleHandler = () => {
        setVisible(true);
    };

    // Get the list of all certificates
    useEffect(() => {
        getCertificate()
    }, [])

    const getCertificate = async () => {
        let users = await getCertification(personal);
        console.log("Users Data", users.data);
        setCertificate(users.data);
    }
   
     

    // Modal to delete the certificate
    const showConfirm = (id) => {
        confirm({
            title: 'Do you Want to delete this certificate?',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                deleteCertification(id).then(() => {
                    const notify = () => {
                        notification.open({
                            message: "Certificate Deleted",
                        });
                    };
                    notify();
                    getCertificate();
                })
            },
            onCancel() {
                console.log('Cancel', id);
            },
        });
    }

    
     // Certificate Table Columns
     const columns = [
        {
            title: "Sl No.",
            dataIndex: "slno",
            key: "slno",
            
        },
        {
            title: "Certification Name",
            dataIndex: "certificateName",
            key: "certificateName",
            sorter: (a, b) => a.certificateName.localeCompare(b.certificateName),
        },
        {
            title: "Expiry Date",
            dataIndex: "expiryDate",
            key: "expiryDate",
            sorter: (a, b) => a.expiryDate.localeCompare(b.expiryDate),
        },
        {
            title: "File Name",
            dataIndex: "filename",
            key: "filename",
            sorter: (a, b) => a.filename.localeCompare(b.filename),
        },
        {
            title: "Action",
            dataIndex: "id",
            key: "id",
            render: (text, record) =>
                <>
                    <div>
                        <a href={MAINURL+'viewCertificateWrtStudent/' + record.filename}><EyeOutlined 
                            // onClick={() => { visibleHandlerEdit(record.filename) }}
                            style={{ cursor: "pointer", color: "blue", paddingRight: "20px" }} />
                            </a>
                        <DeleteOutlined
                           onClick={() => { showConfirm(record.id) }}
                            style={{ cursor: "pointer", color: "red" }} />
                    </div>

                </>

        },
    ];

    return (
        <>
            <div className="page-top">
                <Row>
                    <Col md={14} sm={10} xs={10}>
                        <span>Certification</span>
                    </Col>
                    <Col md={10} sm={14} xs={14} style={{ textAlign: "end" }}>
                        <div className="searchForm">
                            <ButtonReuse
                                type="primary"
                                className="primary-btn"
                                htmlType="primary"
                                value="Upload Certificate"
                                onClick={visibleHandler}
                            ></ButtonReuse>
                        </div>
                        <AddCertificate
                            visible={visible}
                            onClose={closeHandler}
                            onCancelButton={closeHandler}
                            getCertificate={getCertificate}
                        />
                    </Col>
                </Row>
            </div>
            <div className='page-bottom'>
            <Table
                    columns={columns}
                    dataSource={certificate}
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
    )
}

export default Certification
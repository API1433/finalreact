import React, { useEffect, useState } from "react";
import { Table, Row, Col, Modal, notification, Input, Tabs } from "antd";
import { getOpenTickets,getClosedTickets } from "../../../services/api";
import ButtonReuse from "../../../atoms/Button";
import NewTicket from "./NewTicket";

const HelpTickets = () =>{
    const { TabPane } = Tabs;
    const [openT, setOpen] = useState([]);
    const [closeT, setClose] = useState([]);
    const [editVisible, setEditVisible] = useState(false);

    const closeHandler = () => {
        setEditVisible(false);
    };
    useEffect(() => {
        getOpenTicket()
        getClosedTicket()
    }, [true])
   
    const getOpenTicket = async () => {
        let opentickets = await getOpenTickets();
        setOpen(opentickets.data);
        console.log("Users Data", opentickets.data);
        console.log(openT)
        
    }
    const getClosedTicket = async () => {
        let closedtickets = await getClosedTickets();
        setClose(closedtickets.data);
        console.log("Users Data", closedtickets.data);
        console.log(closeT)
        
    }
    const columns = [
        {
            title: "Ticket Id",
            dataIndex: "sts_id",
            key: "sts_id",
            // sorter: (a, b) => a.BatchId.localeCompare(b.BatchId),
        },
        {
            title: "Assigned To",
            dataIndex: "sts_to_whom_sp_role",
            key: "sts_to_whom_sp_role",
           // sorter: (a, b) => a.BatchName.localeCompare(b.BatchName),
        },
        {
            title: "Description",
            dataIndex: "sts_comments_from_student",
            key: "sts_comments_from_student",
            //sorter: (a, b) => a.StartDate.localeCompare(b.StartDate),
        }
        ,
        {
            title: "Date of Raised",
            dataIndex: "sts_raised_date",
            key: "sts_raised_date",
            //sorter: (a, b) => a.EndDate.localeCompare(b.EndDate),
        },
        {
            title: "Status",
            dataIndex: "sts_status",
            key: "sts_status",
            //sorter: (a, b) => a.EndDate.localeCompare(b.EndDate),
        }];

        const columnsClosed = [
            {
                title: "Ticket Id",
                dataIndex: "sts_id",
                key: "sts_id",
                // sorter: (a, b) => a.BatchId.localeCompare(b.BatchId),
            },
            {
                title: "Assigned To",
                dataIndex: "sts_to_whom_sp_role",
                key: "sts_to_whom_sp_role",
               // sorter: (a, b) => a.BatchName.localeCompare(b.BatchName),
            },
            {
                title: "Description of the Ticket",
                dataIndex: "sts_comments_from_student",
                key: "sts_comments_from_student",
                //sorter: (a, b) => a.StartDate.localeCompare(b.StartDate),
            }
            ,
            {
                title: "Comments from Resolver",
                dataIndex: "sts_comments_from_resolver",
                key: "sts_comments_from_resolver",
                //sorter: (a, b) => a.StartDate.localeCompare(b.StartDate),
            }
            ,
            {
                title: "Date of Raised",
                dataIndex: "sts_raised_date",
                key: "sts_raised_date",
                //sorter: (a, b) => a.EndDate.localeCompare(b.EndDate),
            },
            {
                title: "Date of Resolved",
                dataIndex: "sts_solved_on_date",
                key: "sts_solved_on_date",
                //sorter: (a, b) => a.EndDate.localeCompare(b.EndDate),
            },
            {
                title: "Status",
                dataIndex: "sts_status",
                key: "sts_status",
                //sorter: (a, b) => a.EndDate.localeCompare(b.EndDate),
            }];
    return (

        <div>
             <div className="page-top">
                <Row>
                    <Col md={14} sm={10} xs={10}>
                        <span>Your Tickets</span>
                    </Col>
                    <Col md={10} sm={14} xs={14} style={{ textAlign: "end" }}>
                        
                        <div className="saveButton">
                                            <ButtonReuse
                                                type="primary"
                                                className="primary-btn cancel--btn"
                                                value="Raise new Ticket"
                                                onClick={(e) => {
                                                    setEditVisible(true);
                                                }}
                                            ></ButtonReuse>
                        </div>
                        
                    </Col>
                </Row>
            </div>
       
        <div className="page-bottom">
     
        
        {
              <NewTicket
              visible={editVisible}
              onClose={closeHandler}
              onCancelButton={closeHandler}
             // newData={getNewData}
              //userId={userId}
          />
        }
        <Tabs defaultActiveKey="1" >
            <TabPane tab="Active Tickets" key="1">
                <Table
                    columns={columns}
                    dataSource={openT}
                    bordered
                    className="usersTable"
                    scroll={{ x: 1400 }}
                    pagination={{
                        defaultPageSize: 5,
                        showSizeChanger: true,
                        pageSizeOptions: ["10", "20", "30", "40", "50"],
                    }}
                />
            </TabPane>
            <TabPane tab="Closed Tickets" key="2">
                <Table
                    columns={columnsClosed}
                    dataSource={closeT}
                    bordered
                    className="usersTable"
                    scroll={{ x: 1400 }}
                    pagination={{
                        defaultPageSize: 5,
                        showSizeChanger: true,
                        pageSizeOptions: ["10", "20", "30", "40", "50"],
                    }}
                />
            </TabPane>
        </Tabs>
    </div>
    </div>
    );
}

export default HelpTickets;
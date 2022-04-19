import React from "react";
import { Row, Col, Avatar, Image, Space, Progress } from "antd";

function InstructorCard(props) {


  console.log("The Ins props", props);

  const date1 = new Date(props.info[0]?.BatchStartDate);
  const date2 = new Date(props.info[0]?.BatchEndDate);
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  console.log("The props", props);

  let currentDate = new Date();
  let diffTimeTwo = Math.abs(currentDate - date1)
  let diffDaysTwo = Math.ceil(diffTimeTwo / (1000 * 60 * 60 * 24))



  if (diffDaysTwo > diffDays) {
    diffDaysTwo = diffDays
  }

  let progress = ((diffDaysTwo) * 100) / diffDays;

  return (
    <>
      <div className="page-top"><span>Batch Details</span></div>
      <Row justify="space-around" align="middle">
        <Col md={12} sm={24} xs={24} style={{ paddingRight: "5px" }}>
          <div className="page-top">
             <h6 style={{padding:"0px 0px 0px 10px"}}>Training Status</h6>
         
            <Row>
              <Col md={8} sm={24} xs={24} style={{ padding: "10px",textAlign:"center" }}>
                <Progress type="circle" percent={Math.round(progress)} width={90}/>
                <h6 style={{ marginTop: "20px" }}>Remaining Days: {diffDays - diffDaysTwo}</h6>

              </Col>

              <Col md={16} sm={24} xs={24} style={{ paddingRight: "5px" }}>
                <div className="mycard">
                  <Row>
                    <Col span={10}>
                      <h6>Name:</h6>
                    </Col>
                    <Col span={14}>
                      <h6>{props.info[0]?.BatchName}</h6>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={10}>
                      <h6>Course:</h6>
                    </Col>
                    <Col span={14}>
                      <h6>{props.info[0]?.Course}</h6>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={10}>
                      <h6>Start Date:</h6>
                    </Col>
                    <Col span={14}>
                      <h6>{props.info[0]?.BatchStartDate}</h6>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={10}>
                      <h6>End Date:</h6>
                    </Col>
                    <Col span={14}>
                      <h6>{props.info[0]?.BatchEndDate}</h6>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={10}>
                      <h6>Duration:</h6>
                    </Col>
                    <Col span={14}>
                      <h6>{diffDays}</h6>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        <Col md={6} sm={24} xs={24}>
          <div className="page-top" style={{textAlign:"center"}}>

            <h6>Instructor Details</h6>
            <div>
              <Space align="center">
                <Avatar
                  size={90}
                  src={
                    <Image
                      src="https://ca.slack-edge.com/T596V2PB7-U01EPQV7RB8-f24b6bf8a10e-512"
                      style={{
                        width: 90,
                      }}
                    />
                  }
                />
              </Space>
              <div className="mynamecard">
              <h6>Name: {props.info[0]?.InstructorName}</h6>
                    <h6>Email: {props.info[0]?.InsEmail}</h6>
                    </div>
            </div>

          </div>
        </Col>
        <Col md={6} sm={24} xs={24}>
          <div className="page-top" style={{textAlign:"center"}}>

            <h6>Co-ordinator Details</h6>
            <div>
              <Space align="center">
                <Avatar
                  size={90}
                  src={
                    <Image
                      src="https://ca.slack-edge.com/T596V2PB7-U028855V0JV-7d612bdbda55-512"
                      style={{
                        width: 90,
                      }}
                    />
                  }
                />
                
              </Space>
              <div className="mynamecard">
                <h6>Name: {props.info[0]?.CoordinatorName}</h6>
                    <h6>Email: {props.info[0]?.CorEmail}</h6>
                </div>
            </div>

          </div>
        </Col>
      </Row>
    </>

  );
}

export default InstructorCard;

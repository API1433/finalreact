import React, { useEffect, useState } from "react";
import '../Stats/Stats.css'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, RadialLinearScale } from 'chart.js';
import { getStatStatus } from "../../../services/api";
import { Statistic, Card, Row, Col } from 'antd';
import { ArrowUpOutlined, CheckCircleOutlined } from '@ant-design/icons';
ChartJS.register(ArcElement, Tooltip, Legend, RadialLinearScale);
const StatusStat = () => {
    // State to store Attendance Data
    const [status, setStatus] = useState();
    useEffect(() => {
        getStatusData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const getStatusData = async () => {
        await getStatStatus().then((res) => {
            setStatus(res.data);
            console.log('status', res.data[0].Active)
        }).catch((err) => {
            console.log("error", err);
        })
    }
    
    return (
        <>
            <h6 style={{ padding: "3% 0% 3% 0%", color: "#978d8d", }}>Active/Completed Batches</h6>
            <Row gutter={16}>
                <Col span={12}>
                    <Card className="page-top">
                        <Statistic
                            title="Active"
                            value={status && status[0].Active}
                            valueStyle={{ color: '#3F8600' }}
                            prefix={<ArrowUpOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={12} >
                    <Card className="page-top">
                        <Statistic
                            title="Completed"
                            value={status && status[0].Completed}
                            valueStyle={{ color: '#CB9730' }}
                            prefix={<CheckCircleOutlined />}
                        />
                    </Card>
                </Col>
            </Row>
            <h6 style={{ padding: "3% 0% 3% 0%", color: "#978d8d", }}>In Training/Released Participants</h6>
            <Row gutter={16}>
                <Col span={12}>
                    <Card className="page-top">
                        <Statistic
                            title="In Training"
                            value={status && status[0].InTraining}
                            valueStyle={{ color: '#3F8600' }}
                            prefix={<ArrowUpOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={12} >
                    <Card className="page-top">
                        <Statistic
                            title="Released"
                            value={status && status[0].Released}
                            valueStyle={{ color: '#CB9730' }}
                            prefix={<CheckCircleOutlined />}
                        />
                    </Card>
                </Col>
            </Row>


        </>
    );
}
export default StatusStat;
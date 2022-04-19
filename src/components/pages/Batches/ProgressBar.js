import React, { useEffect, useState } from "react";
import { Table, Row, Col } from "antd";
import { getMarksbyBatch, getAllMarks, getRole } from "../../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import {
  EditOutlined, DownloadOutlined
} from '@ant-design/icons';
import exportFromJSON from 'export-from-json';
import ButtonReuse from "../../../atoms/Button";

const ProgressBar = (props) => {

  let { Batch_id } = useParams();
  let navigate = useNavigate();

  let role = getRole();

  console.log("Progress Batch Id", Batch_id);


  // State to store Assesment details
  const [scoreDet, setScoreDet] = useState([]);

  useEffect(() => {
    getAllScores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllScores = async () => {
    await getMarksbyBatch(Batch_id).then((res) => {
      console.log("The result", res.data.data.row);
      setScoreDet(res.data.data.row);
    })
  }

  // Edit Test Page
  const gotoTestPage = async (body) => {
    console.log("The body", body);
    localStorage.setItem("testInfo", JSON.stringify(body));
    // navigate(`/editassesment/${Number(Batch_id)}`);
    navigate(`/editassesment/${Number(Batch_id)}`);
  }

  // Add Test Page
  const gotoAddTest = async () => {
    localStorage.setItem("batch_id", Number(Batch_id));
    navigate(`/assesment/${Number(Batch_id)}`);
  }

  const downloadMarks = async (body) => {
    console.log("Test Data", body);
    await getAllMarks(body).then((res) => {
      console.log("Res", res.data);
      const data = res.data.data.row
      const fileName = 'Assesment'
      const exportType = 'xls'
      exportFromJSON({ data, fileName, exportType })

    })
  }

  // Assesments Table Columns
  const columns = [
    {
      title: "Test Id",
      dataIndex: "sm_stt_test_id",
      key: "sm_stt_test_id",
      sorter: (a, b) => a.sm_stt_test_id.localeCompare(b.sm_stt_test_id),
    },
    {
      title: "Test Name",
      dataIndex: "stt_test_name",
      key: "stt_test_name",
      sorter: (a, b) => a.stt_test_name.localeCompare(b.stt_test_name),
    },
    {
      title: "Test Date",
      dataIndex: "ExamDate",
      key: "ExamDate",
      sorter: (a, b) => a.ExamDate.localeCompare(b.ExamDate),
    },
    {
      title: "Action",
      dataIndex: ["id", "stt_test_name", "ExamDate"],
      key: "id",
      render: (text, record) =>
        <>
          <div>
            {role === "instructor" &&
              <EditOutlined
                onClick={() => {
                  gotoTestPage({
                    test_name: record["stt_test_name"],
                    exam_date: record["ExamDate"],
                    batch_id: Number(Batch_id)
                  })
                }}
                style={{ cursor: "pointer", color: "blue", paddingRight: "20px" }} />
            }
            {(role === "Co-ordinator" || role === "admin") && <DownloadOutlined
              onClick={() => {
                downloadMarks({
                  test_name: record["stt_test_name"],
                  test_date: record["ExamDate"],
                  batch_id: Number(Batch_id)
                })
              }}
              style={{ cursor: "pointer", color: "blue" }} />}

          </div>

        </>

    },
  ];


  return (
    <div>
      <Row>
        <Col span={24}>
          <Row>
            <Col span={12}>
              <span>Test Details</span>
            </Col>
            <Col span={12} style={{ textAlign: "end" }}>
              {role === "instructor" &&
                <ButtonReuse
                  type="primary"
                  className="btn btn-warning"
                  htmlType="submit"
                  value="Add Test Scores"
                  onClick={gotoAddTest}
                ></ButtonReuse>
              }
            </Col>
          </Row>
          <Table
            columns={columns}
            dataSource={scoreDet}
            bordered
            className="usersTable"
            pagination={{
              defaultPageSize: 2,
              showSizeChanger: true,
            }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ProgressBar;

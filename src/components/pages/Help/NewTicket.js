import React, { useEffect, useState } from "react";
import { Drawer } from "antd";
import { Formik } from "formik";
// import * as yup from "yup";
import InputField from "../../../atoms/InputField";
import ButtonReuse from "../../../atoms/Button";
import { notification, Select, Input } from "antd";
import { getBatchById, updateBatch, getAllCor, getAllIns } from "../../../services/api";


const NewTicket = (props) => {
    const { TextArea } = Input;

    const { Option } = Select;
    // Edit User form validation
    // const validationSchema = yup.object({
    //     batch_name: yup.string().required("Please enter the Batch Name"),
    //     start_date: yup.string().required("Please select the Start Date"),
    //     end_date: yup.string().required("Please select the End Date"),
    //     coordinator_name: yup.string().required("Please select a Co-ordinator"),
    //     instructor_name: yup.string().required("Please select an Instructor"),
    //     course: yup.string().required("Please add a course"),
    //     total_weeks: yup.string().required("Please select duration")
    // });

    // Function to show toaster after update success
    const openNotification = () => {
        notification.open({
            message: "Batch Updated Successfully",
        });
    };

    let id = localStorage.getItem("batchId");
    const initialValues = {

        start_date: "",
        end_date: "",
        instructor_username: "",
        coordinator_username: "",
        course: "",
        duration: "",
        batch_id: id,
    }

    // State to store Batch details
    const [batchData, setbatchData] = useState(initialValues);

    // State to store list of Instructors
    const [instructors, setInstructors] = useState();

    // State to store list of Co-ordinators
    const [coordinators, setCoordinators] = useState();

    // Get the User by Id



    // Set the data to empty when cancel is clicked
    const onCancelHandler = () => {
        props.onCancelButton();
        props.onClose();
        setbatchData("")
        localStorage.removeItem("batchId");
    };

    return (
        <>
            <Drawer
                title="New Ticket"
                width={500}
                onClose={onCancelHandler}
                visible={props.visible}
                className="edit_user"
                closable={false}
                maskClosable={false}
            >
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        start_date: batchData[0]?.BatchStartDate,
                        end_date: batchData[0]?.BatchEndDate,
                        instructor_username: batchData[0]?.InstructorName,
                        coordinator_username: batchData[0]?.CoordinatorName,
                        course: batchData[0]?.Course,
                        duration: batchData[0]?.Duration,
                        batch_id: Number(id)
                    }}
                    // validationSchema={validationSchema}
                    onSubmit={(values) => {
                        console.log("values", values);
                        // updateBatch(values)
                        //     .then((response) => {
                        //         console.log(response.data);
                        //         openNotification();
                        //         props.onClose();
                        //         props.newData();
                        //     })
                        //     .catch(function (error) {
                        //         console.log(error.response.data);
                        //         const notify = () => {
                        //             notification.open({
                        //                 message: error.response.data.status.message,
                        //             });
                        //         };

                        //         notify();

                        //     });
                    }}
                >

                    {({ handleSubmit, handleChange, errors, values, setFieldValue }) => (
                        <form onSubmit={handleSubmit} className="add_project_form">
                            <label>Employee ID</label>
                            <InputField
                                type="text"
                                placeholder="Enter the Email Id"
                                name="BatchName"
                                onChange={handleChange}
                                //value={batchData[0]?.BatchName}
                                className="input--field"
                            ></InputField>
                            <br /><br />
                            <label>Assigne To</label><br />
                            <Select
                                className="input--field"
                                style={{ width: 200 }}
                                placeholder="Search to Select"

                            >
                                <Option value="1">Trainner</Option>
                                <Option value="2">Co-ordinator</Option>
                                <Option value="3">Instructor</Option>
                            </Select>

                            <p className="display_error">{errors.start_date}</p>

                            <label>Discription</label>
                            <TextArea
                                type="text"
                                placeholder="Enter the Email Id"
                                name="end_date"
                                onChange={handleChange}
                                // value={values.end_date}
                                className="input--field"
                            ></TextArea>
                            <p className="display_error">{errors.end_date}</p>



                            {" "}
                            <div className="button-container" style={{ marginTop: "20px" }}>
                                <ButtonReuse
                                    type="primary"
                                    className="primary-btn"
                                    htmlType="submit"
                                    value="Send"
                                ></ButtonReuse> {"  "}
                                <ButtonReuse
                                    type="primary"
                                    className="primary-btn cancel--btn"
                                    value="Cancel"
                                    onClick={onCancelHandler}
                                ></ButtonReuse>
                            </div>
                        </form>
                    )}
                </Formik>
            </Drawer>
        </>
    );
}

export default NewTicket;
import React from 'react'
import { Drawer } from "antd";
import { Formik } from "formik";
import { useState } from 'react';
import * as yup from "yup";
import InputField from "../../../atoms/InputField";
import ButtonReuse from "../../../atoms/Button";
import { notification } from "antd";
import { addCertification } from "../../../services/api"
function AddCertificate(props) {
    const [files, setFiles] = useState([]);
    const onInputChange = (e) => {
        setFiles(e.target.files[0])
    };

    const validationSchema = yup.object({
        name: yup.string().required("Please provide a certification name"),
    });

    const onCancelHandler = () => {
        props.onCancelButton();
    };

    const openNotification = () => {
        notification.open({
            message: "Certificate Added Successfully",
        });
    };
    return (
        <>
            <Drawer
                title="Add Certificate"
                width={500}
                onClose={props.onClose}
                visible={props.visible}
                bodyStyle={{ paddingBottom: 80 }}
                className="add_user" >
                <Formik
                    initialValues={{
                        emp_id: "",
                        name: "",
                        expirydate: ""
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        const data = new FormData();
                        data.append("file", files);
                        data.append("name", values.name);
                        data.append("expirydate", values.expirydate);
                        data.append("emp_id", values.emp_id);
                        console.log("data", data);


                        addCertification(data)
                            .then((response) => {
                                openNotification();
                                props.onClose();
                                props.getCertificate();

                            })
                            .catch(function (error) {
                                console.log(error.response.data);
                                const notify = () => {
                                    notification.open({
                                        message: error.response.data.status.message,
                                    });
                                };

                                notify();

                            });
                    }}>

                    {({ handleSubmit, handleChange, errors, values, setFieldValue }) => (
                        <form onSubmit={handleSubmit} className="add_project_form">
                            <label>Employee ID</label>
                            <InputField
                                placeholder="Enter your employee id"
                                name="emp_id"
                                onChange={handleChange}
                                value={values.emp_id}
                                className="input--field"
                            ></InputField>
                            <p className="display_error">{errors.emp_id}</p>
                            <label>Certificate Name</label>
                            <InputField
                                placeholder="Enter the certificate name"
                                name="name"
                                onChange={handleChange}
                                value={values.name}
                                className="input--field"
                            ></InputField>
                            <p className="display_error">{errors.name}</p>
                            <label>Expiry Date</label>
                            <InputField
                                type="date"
                                placeholder="Enter the certificate expiry date"
                                name="expirydate"
                                onChange={handleChange}
                                value={values.expirydate}
                                className="input--field"
                            ></InputField>
                            <p className="display_error">{errors.expirydate}</p>


                            <div>Upload Certificate</div>
                            <div style={{border:"1px solid #d2d2d2 ",padding:"5px", margin:"0px 0px 5px 0px"}}>
                            <input
                                type="file"
                                placeholder="choose file"
                                name="filename"
                                onChange={onInputChange}
                                className="input--field"
                                accept=".pdf, .jpg, .png, .jpeg"
                            /></div>
                           

                            <div className="button-container">
                                <ButtonReuse
                                    type="primary"
                                    className="primary-btn"
                                    htmlType="submit"
                                    value="Add"
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
    )
}

export default AddCertificate
import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { FormGroup, Button, Row, Col } from "reactstrap";
import axios from "axios";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



export const RegistrarUsuario = () => {
    const [fecha, setFecha] = useState(new Date());

    const formSchema = Yup.object().shape({
        Email: Yup.string()
            .required("Campo Requerido")
            .email("Correo Electronico Invalido")
            .max(40, `Máximo 40 caracteres`),
        UserName: Yup.string()
            .min(5, `Mínimo 5 caracteres`)
            .max(30, `Máximo 25 caracteres`)
            .required("Campo Requerido"),
        /* FechaNacimiento: Yup.string()
            .min(1, 'Formato requerido'), */
        Genero: Yup.string().required("Campo Requerido").min(1),
    });

    return (
        <>
            <Formik
                initialValues={{
                    Email: "",
                    UserName: "",
                    FechaNacimiento: "",
                    Genero: "",
                    Hobbies: "",
                }}
                validationSchema={formSchema}
                onSubmit={(values, { resetForm }) => {                
                    axios.post("http://localhost:8080/api/usuarios", {
                            correo: values.Email,
                            nombre: values.UserName,
                            fechaNacimiento: fecha,
                            genero: values.Genero,
                            hobbies: values.Hobbies,
                        })
                        .then((res) => {
                            console.log("Res", res);
                            alert('Datos guardados exitosamente!!')
                        })
                        .catch((err) => {
                            console.log("Error", err);
                            alert('Servicio no disponible intente más tarde.', err)
                        });

                    resetForm({ values: '' });
                }}
            >
                <Form>
                    <FormGroup>
                        <label htmlFor="UserName">Nombre Usuario: </label>
                        <Field
                            className="form-control"
                            name="UserName"
                            placeholder=""
                            type="text"
                        />
                        <ErrorMessage
                            name="UserName"
                            component="div"
                            className="field-error text-danger"
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="Email">Correo Electronico: </label>
                        <Field
                            className="form-control"
                            name="Email"
                            placeholder=""
                            type="email"
                        />
                        <ErrorMessage
                            name="Email"
                            component="div"
                            className="field-error text-danger"
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="FechaNacimiento">Fecha de Nacimiento: </label>
                        <DatePicker
                            name="FechaNacimiento"
                            dateFormat='dd-MM-yyyy'
                            selected={fecha}
                            onChange={date => setFecha(date)}
                            maxDate={new Date()}
                            showYearDropdown
                            scrollableMonthYearDropdown
                            calendarClassName="rasta-stripes"
                        />
                        <ErrorMessage
                            name="FechaNacimiento"
                            component="div"
                            className="field-error text-danger"
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="Genero">Género: </label>
                        <Field
                            className="form-control"
                            name="Genero"
                            placeholder=""
                            type="text"
                        />
                        <ErrorMessage
                            name="Genero"
                            component="div"
                            className="field-error text-danger"
                        />
                    </FormGroup>

                    <FormGroup>
                        <label htmlFor="Hobbies">Hobbies: </label>
                        <Field className="form-control" name="Hobbies" type="text" />
                    </FormGroup>

                    <Row>
                        <Col lg={12} md={12}>
                            <Button
                                color="primary"
                                className="mr-1 mb-1 btn-block"
                                type="submit"
                            >
                                Guardar
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Formik>
        </>
    );
};

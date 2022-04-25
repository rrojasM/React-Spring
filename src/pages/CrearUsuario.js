import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";

export const CrearUsuario = () => {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        obtenerDatos();
    }, []);

    const obtenerDatos = () => {
        axios.get("http://localhost:8080/api/usuarios")
            .then((res) => {
                /* console.log(res.data); */
                setUsuarios(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <div>
                <h1>Registros</h1>
                <Table className="striped bordered hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Fecha de Nacimiento</th>
                            <th>Correo</th>
                            <th>Genero</th>
                            <th>Hobbies</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.length > 0 ? (
                            usuarios.map((usuario, index) => (
                                <tr key={index}>
                                    <td>{usuario.id}</td>
                                    <td>{usuario.nombre}</td>
                                    <td>{usuario.fechaNacimiento}</td>
                                    <td>{usuario.correo}</td>
                                    <td>{usuario.genero}</td>
                                    <td>{usuario.hobbies}</td>
                                </tr>
                            ))

                        ) : (
                            <tr>
                                <td colSpan="3">Sin datos</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </>
    );
}
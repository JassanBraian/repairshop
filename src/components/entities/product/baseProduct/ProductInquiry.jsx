import React from 'react';
import { Table } from 'react-bootstrap';

const ProductInquiry = (props) => {
    return (
        <>
            <div className="row">
                <div className="col">
                    Productos
                </div>
                <div className="col">
                    Agregar
                </div>
            </div>
            <div className="row mx-1">
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Descrip</th>
                            <th>Client</th>
                            <th>Date</th>
                            <th>Deleted</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.products
                            .map((product, index) => (
                                <tr key="{index}">
                                    <td>{index + 1}</td>
                                    <td>{product.descrip}</td>
                                    <td>{product.fkclient}</td>
                                    <td>{product.date}</td>
                                    <td>{product.deleted ? 'Yes' : 'No'}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
        </>
    );
};

export default ProductInquiry;
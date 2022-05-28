import { useContext, useEffect, useState } from 'react';
import { Table, Modal } from 'react-bootstrap';
import ProductFormCrud from './ProductFormCrud';
import ProductFuncFC from './ProductFuncFC';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ProductContext from '../../../../context/product/ProductContext';

const ProductInquiry = (props) => {
    const { products, getProducts } = useContext(ProductContext);

    const [modCre, setModCre] = useState(false);
    const hideModalCre = () => setModCre(false);
    const showModalCre = () => setModCre(true);

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <>
            <div className="row">
                <div className="col mx-1">
                    <h3>Products</h3>
                </div>
                <div className="col d-flex align-items-center justify-content-end">
                    <button
                        className="btnAa mx-1"
                        onClick={showModalCre}
                    >
                        <FontAwesomeIcon icon={faPlus} className="mx-2" />
                    </button>
                </div>
            </div>
            <div className="row mx-1">
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Description</th>
                            <th>Client</th>
                            <th>Date</th>
                            <th>Deleted</th>
                            <th className='text-center'>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products
                            .map((product, index) => (
                                <tr key={index.toString()}>
                                    <td>{index + 1}</td>
                                    <td>{product.descrip}</td>
                                    <td>{product.fkclient}</td>
                                    <td>{product.date}</td>
                                    <td>{product.deleted ? 'Yes' : 'No'}</td>
                                    <td>
                                        <section className='d-flex justify-content-center'>
                                            <ProductFuncFC
                                                productId={product.id}
                                                clients={props.clients}
                                            />
                                        </section>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>

            <Modal
                show={modCre}
                onHide={hideModalCre}
                backdrop="static"
                keyboard={false}
                size="lg"
                centered
            >
                <Modal.Header className="mb-3" closeButton>
                    Create
                </Modal.Header>
                <ProductFormCrud
                    opeCrud={"create"}
                    hideModal={hideModalCre}
                    clients={props.clients}
                    products={props.products}
                    getProducts={props.getProducts}
                />
            </Modal>
        </>
    );
};

export default ProductInquiry;
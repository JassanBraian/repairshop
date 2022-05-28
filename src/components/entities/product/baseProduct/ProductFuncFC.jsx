import { useState, useContext } from 'react';
import { Modal, ModalBody } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faCheck, faPen, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import ProductFormCrud from './ProductFormCrud';

const ProductFuncFC = (props) => {

    const [modRead, setModRead] = useState(false);
    const hideModalRead = () => setModRead(false);
    const showModalRead = () => setModRead(true);

    const [modUpdate, setModUpdate] = useState(false);
    const hideModalUpd = () => setModUpdate(false);
    const showModalUpd = () => setModUpdate(true);

    const [modDelete, setModDelete] = useState(false);
    const hideModalDel = () => setModDelete(false);
    const showModalDel = () => setModDelete(true);

    const aprobar = () => { }

    return (
        <>
            <button className='mx-1 btnRead' onClick={showModalRead}>
                <FontAwesomeIcon icon={faEye} className="mx-2" />
            </button>
            <button className="mx-1 btnUpd" onClick={showModalUpd}>
                <FontAwesomeIcon icon={faPen} className="mx-2" />
            </button>
            <button className="mx-1 btnDel" onClick={showModalDel}>
                <FontAwesomeIcon icon={faTrashAlt} className="mx-2" />
            </button>

            <Modal
                show={modRead}
                onHide={hideModalRead}
                backdrop='static'
                keyboard={false}
                size='lg'
                centered
            >
                <Modal.Header closeButton>
                    Detalle
                </Modal.Header>
                <ModalBody>
                    <ProductFormCrud
                        productId={props.productId}
                        opeCrud={'read'}
                        hideModal={hideModalRead}
                        clients={props.clients}
                    />
                </ModalBody>
            </Modal>

            <Modal
                show={modUpdate}
                onHide={hideModalUpd}
                backdrop='static'
                keyboard={false}
                size='lg'
                centered
            >
                <Modal.Header closeButton>
                    Edit
                </Modal.Header>
                <ModalBody>
                    <ProductFormCrud
                        productId={props.productId}
                        opeCrud={'update'}
                        hideModal={hideModalUpd}
                        clients={props.clients}
                    />
                </ModalBody>
            </Modal>

            <Modal
                show={modDelete}
                onHide={hideModalDel}
                backdrop='static'
                keyboard={false}
                size='lg'
                centered
            >
                <Modal.Header closeButton>
                    Delete
                </Modal.Header>
                <ModalBody>
                    <ProductFormCrud
                        productId={props.productId}
                        opeCrud={'delete'}
                        hideModal={hideModalDel}
                        clients={props.clients}
                    />
                </ModalBody>
            </Modal>
        </>
    );
};

export default ProductFuncFC;
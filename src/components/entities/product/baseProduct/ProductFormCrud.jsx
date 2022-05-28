import React, { useEffect, useRef, useState } from 'react';
import { Form, FloatingLabel, } from 'react-bootstrap';
import {
    validateStr, existDescrip,
    capitalizeFirstLetter, validateDate, validateInt
} from '../../../../services/CrudBase/CrudValidationServices';
import { createObj, updateObj, deleteObj, getButtonLabel }
    from '../../../../services/CrudBase/CrudServices';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2';

const ProductFormCrud = (props) => {

    const URLReUpDe = props.productId ?
        process.env.REACT_APP_API_URL + 'product/' + props.productId : '';
    const URLCreate = process.env.REACT_APP_API_URL + 'product';

    const [frmProd, setFrmProd] = useState({
        descrip: '',
        fkclient: 0,
        date: '',
        deleted: ''
    });

    // const {descrip, fkclient, date, deleted} = frmProd;

    const descripRef = useRef('');
    const fkclientRef = useRef(0);
    const dateRef = useRef('');

    const [frmProdVal, setFrmProdVal] = useState({
        descripVal: false,
        descripInv: false,
        fkclientVal: false,
        fkclientInv: false,
        dateVal: false,
        dateInv: false
    });

    const handleChangeFrmProd = e => {
        setFrmProd({
            ...frmProd,
            [e.target.name]: e.target.value
        });
    };

    const setFrmProdValWithObj = (objNewsValues) => {
        setFrmProdVal({
            ...frmProdVal,
            ...objNewsValues
        });
    }

    useEffect(() => {
        props.productId && getProduct();
    }, []);

    const getProduct = async () => {
        try {
            const res = await fetch(URLReUpDe);
            if (res.status === 200) {
                const objJson = await res.json();

                setFrmProd({
                    descrip: objJson.descrip,
                    fkclient: objJson.fkclient,
                    date: objJson.date,
                    deleted: objJson.deleted
                });
            }
        } catch (error) {
            throw error;
        }
    }

    const valDescrip = () => {

        if (props.opeCrud === 'create' &&
            validateStr(frmProd.descrip, '', props.opeCrud, true,
                existDescrip(frmProd.descrip, props.opeCrud, props.productId, props.products)
            )
        ) {
            setFrmProdValWithObj({ 'descripVal': true, 'descripInv': false });
            return true;

        } else if (props.opeCrud !== 'create'
            && validateStr('', descripRef.current.value, props.opeCrud, true,
                existDescrip(descripRef.current.value, props.opeCrud, props.productId, props.products)
            )
        ) {
            setFrmProdValWithObj({ 'descripVal': true, 'descripInv': false });
            return true;
        } else {
            setFrmProdValWithObj({ 'descripVal': false, 'descripInv': true });
            return false;
        }
    }

    const valFkclient = () => {

        // if ((props.opeCrud === 'create' && validateInt(fkclient, '', props.opeCrud, false, ''))
        if ((props.opeCrud === 'create')
            || (props.opeCrud !== 'create')
            //|| (props.opeCrud !== 'create' && validateInt('', fkclientRef.current.value, props.opeCrud, false, ''))
        ) {
            setFrmProdValWithObj({ 'fkclientVal': true, 'fkclientInv': false });
            return true;
        } else {
            setFrmProdValWithObj({ 'fkclientVal': false, 'fkclientInv': true });
            return false;
        }
    };

    const valDate = () => {
        setFrmProdValWithObj(frmProdVal.dateVal, false);
        setFrmProdValWithObj(frmProdVal.dateInv, false);
        if ((props.opeCrud === 'create' && validateDate(frmProd.date, '', props.opeCrud, false, ''))
            || (props.opeCrud !== 'create' && validateDate('', dateRef.current.value, props.opeCrud, false, ''))
        ) {
            setFrmProdValWithObj({ 'dateVal': true, 'dateInv': false });
            return true;
        } else {
            setFrmProdValWithObj({ 'dateVal': false, 'dateInv': true });
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let datosOk = false;
        if (valDescrip() && valFkclient() && valDate()) {
            datosOk = true;
        }

        if (!datosOk) {
            Swal.fire(
                "Required fields error",
                "Please fill all required fields",
                "warning"
            );
            return false;
        }

        if (props.opeCrud === 'create') {
            //Create           
            const objCre = {
                descrip: capitalizeFirstLetter(frmProd.descrip),
                fkclient: frmProd.fkclient,
                date: frmProd.date,
                deleted: false,
            };

            if (await createObj(objCre, URLCreate)) {
                props.getProducts();
                props.hideModal();
            }

        } else if (props.productId && props.opeCrud === 'update') {
            //Update
            const objUpd = {
                descrip: capitalizeFirstLetter(descripRef.current.value),
                fkclient: frmProd.fkclient,
                date: dateRef.current.value,
                deleted: frmProd.deleted,
            };

            if (await updateObj(objUpd, URLReUpDe)) {
                props.getProducts();
                props.hideModal();
            }

        } else if (props.productId && props.opeCrud === 'delete') {
            //Delete
            const objDel = {
                descrip: descripRef.current.value,
                fkclient: frmProd.fkclient,
                date: dateRef.current.value,
                deleted: true,
            };

            if (await deleteObj(objDel, URLReUpDe)) {
                props.getProducts();
                props.hideModal();
            }

        } else {
            //Crud general error
            Swal.fire(
                'An error occurred',
                'Sorry. An unexpected error occurred, try the operation later',
                'warning'
            );
        }
    }

    return (
        <>
            <Form onSubmit={handleSubmit} className="py-3 px-3">
                <FloatingLabel
                    label={
                        <label>
                            <FontAwesomeIcon
                                icon={faInfoCircle}
                                className="me-2 fieldIcon"
                            />
                            <b>Description</b>
                            <label className="text-danger">*</label>
                        </label>
                    }
                >
                    <Form.Control
                        name="descrip"
                        className="fieldInput"
                        size="sm"
                        type="text"
                        maxLength="20"
                        onChange={handleChangeFrmProd}
                        isValid={frmProdVal.descripVal}
                        isInvalid={frmProdVal.descripInv}
                        onBlur={valDescrip}
                        ref={descripRef}
                        defaultValue={frmProd.descrip}
                        disabled={
                            props.opeCrud !== "update" && props.opeCrud !== "create"
                        }
                    />
                    <Form.Control.Feedback type="invalid" className="mt-2">
                        Campo obligatorio
                    </Form.Control.Feedback>
                </FloatingLabel>

                <FloatingLabel
                    label={
                        <label>
                            <FontAwesomeIcon
                                icon={faInfoCircle}
                                className="me-2 fieldIcon"
                            />
                            <b>Client</b>
                            <label className="text-danger">*</label>
                        </label>
                    }
                >
                    <Form.Select
                        name="fkclient"
                        className="form-select borderFloatingInput"
                        onChange={handleChangeFrmProd}
                        value={frmProd.fkclient}
                        isValid={frmProdVal.fkclientVal}
                        isInvalid={frmProdVal.fkclientInv}
                        onBlur={valFkclient}
                        ref={fkclientRef}
                        disabled={
                            props.opeCrud !== "update" && props.opeCrud !== "create"
                        }
                    >
                        {props.opeCrud === 'create' && <option value="">Select a client</option>}
                        {props.clients.map((client, index) =>
                            <option
                                key={index}
                                value={client.id}
                            >
                                {`${client.name} ${client.surname} | ${client.idendoc}`}
                            </option>)
                        }
                    </Form.Select>
                    <Form.Control.Feedback type="invalid" className="mt-2">
                        Campo obligatorio
                    </Form.Control.Feedback>
                </FloatingLabel>

                <FloatingLabel
                    label={
                        <label>
                            <FontAwesomeIcon
                                icon={faCalendarAlt}
                                className="me-2 floatingInput"
                            />
                            <label>
                                <b>Date </b>
                                <label className="text-danger">*</label>
                            </label>
                        </label>
                    }
                >
                    <Form.Control
                        name="date"
                        className="borderFloatingInput"
                        size="sm"
                        type="datetime-local"
                        maxLength="0"
                        onChange={handleChangeFrmProd}
                        isValid={frmProdVal.dateVal}
                        isInvalid={frmProdVal.dateInv}
                        onBlur={valDate}
                        ref={dateRef}
                        defaultValue={frmProd.date}
                        disabled={
                            props.opeCrud !== "update" && props.opeCrud !== "create"
                        }
                    />
                    <Form.Control.Feedback type="invalid" className="mt-2">
                        Campo obligatorio.
                    </Form.Control.Feedback>
                </FloatingLabel>

                {props.opeCrud === "read" ? null : (
                    <div className="d-flex justify-content-center">
                        <button
                            variant="info"
                            type="submit"
                            className="w-25 py-1"
                        >
                            {getButtonLabel(props.opeCrud)}
                        </button>
                    </div>
                )}

            </Form>
        </>
    );
};

export default ProductFormCrud;
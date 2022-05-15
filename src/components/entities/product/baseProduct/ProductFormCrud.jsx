import React, { useEffect, useRef, useState } from 'react';
import { Form, FloatingLabel, } from 'react-bootstrap';
import {
    validateStr, existDescrip,
    capitalizeFirstLetter, validateDate, validateInt
} from '../../../../services/CrudBase/CrudValidationServices';
import { createObj, updateObj, deleteObj, getButtonLabel } from '../../../../services/CrudBase/CrudServices';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2';

const ProductFormCrud = (props) => {

    const URLReUpDe = props.productId ?
        process.env.REACT_APP_API_URL + 'product/' + props.productId : '';
    const URLCreate = process.env.REACT_APP_API_URL + 'product';

    const [descrip, setDescrip] = useState('');
    const [fkclient, setFkclient] = useState(0);
    const [date, setDate] = useState('');
    const [deleted, setDeleted] = useState('');

    const [descripVal, setDescripVal] = useState('');
    const [descripInv, setDescripInv] = useState('');
    const [fkclientVal, setFkclientVal] = useState('');
    const [fkclientInv, setFkclientInv] = useState('');
    const [dateVal, setDateVal] = useState('');
    const [dateInv, setDateInv] = useState('');

    const descripRef = useRef('');
    const fkclientRef = useRef(0);
    const dateRef = useRef('');

    useEffect(() => {
        props.productId && getProduct();
    }, []);

    const getProduct = async () => {
        try {
            const res = await fetch(URLReUpDe);
            if (res.status === 200) {
                const objJson = await res.json();
                setDescrip(objJson.descrip);
                setFkclient(objJson.fkclient);
                setDate(objJson.date);
                setDeleted(objJson.deleted);
            }
        } catch (error) {
            throw error;
        }
    }

    const valDescrip = () => {
        setDescripVal('');
        setDescripInv('');
        if (props.opeCrud === 'create' &&
            validateStr(descrip, '', props.opeCrud, true,
                existDescrip(descrip, props.opeCrud, props.productId, props.products)
            )
        ) {
            setDescripVal(true);
            return false;

        } else if (props.opeCrud !== 'create'
            && validateStr('', descripRef.current.value, props.opeCrud, true,
                existDescrip(descripRef.current.value, props.opeCrud, props.productId, props.products)
            )
        ) {
            setDescripVal(true);
            return false;
        } else {
            setDescripInv(true);
            return true;
        }
    }

    const valFkclient = () => {
        setFkclientVal('');
        setFkclientInv('');

        // if ((props.opeCrud === 'create' && validateInt(fkclient, '', props.opeCrud, false, ''))
        if ((props.opeCrud === 'create')
            || (props.opeCrud !== 'create')
            //|| (props.opeCrud !== 'create' && validateInt('', fkclientRef.current.value, props.opeCrud, false, ''))
        ) {
            setFkclientVal(true);
            return false;
        } else {
            setFkclientInv(true);
            return true;
        }
    };

    const valDate = () => {
        setFkclientVal('');
        setFkclientInv('');
        if ((props.opeCrud === 'create' && validateDate(date, '', props.opeCrud, false, ''))
            || (props.opeCrud !== 'create' && validateDate('', dateRef.current.value, props.opeCrud, false, ''))
        ) {
            setDateVal(true);
            return false;
        } else {
            setDateInv(true);
            return true;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let datosOk = false;
        if (!valDescrip() && !valFkclient() && !valDate()) {
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

        if (datosOk && props.opeCrud === 'create') {
            //Create
            const objCre = {
                descrip,
                fkclient,
                date: date,
                deleted: false,
            };

            if (await createObj(objCre, URLCreate)) {
                props.getProducts();
                props.hideModal();
            }

        } else if (datosOk && props.productId && props.opeCrud === 'update') {
            //Update
            const objUpd = {
                descrip: descripRef.current.value,
                fkclient,
                date: dateRef.current.value,
                deleted,
            };

            if (await updateObj(objUpd, URLReUpDe)) {
                props.getProducts();
                props.hideModal();
            }

        } else if (datosOk && props.productId && props.opeCrud === 'delete') {
            //Delete
            const objDel = {
                descrip: descripRef.current.value,
                fkclient,
                date: dateRef.current.value,
                deleted: true,
            };

            if (await deleteObj(objDel, URLReUpDe)) {
                props.getProducts();
                props.hideModal();
            }

        } else {
            //General crud error
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
                        className="fieldInput"
                        size="sm"
                        type="text"
                        maxLength="20"
                        onChange={e =>
                            setDescrip(capitalizeFirstLetter(e.target.value))
                        }
                        isValid={descripVal}
                        isInvalid={descripInv}
                        onBlur={valDescrip}
                        ref={descripRef}
                        defaultValue={capitalizeFirstLetter(descrip)}
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
                        className="form-select borderFloatingInput"
                        onChange={e => setFkclient(parseInt(e.target.value))}
                        value={fkclient}
                        isValid={fkclientVal}
                        isInvalid={fkclientInv}
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
                            // selected={client.id === fkclient}
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
                        className="borderFloatingInput"
                        size="sm"
                        type="datetime-local"
                        maxLength="0"
                        onChange={(e) => setDate(e.target.value)}
                        isValid={dateVal}
                        isInvalid={dateInv}
                        onBlur={valDate}
                        ref={dateRef}
                        defaultValue={date}
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
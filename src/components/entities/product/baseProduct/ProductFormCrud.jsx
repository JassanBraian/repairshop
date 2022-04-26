import React, { useEffect, useRef, useState } from 'react';
import { Form, FloatingLabel, } from 'react-bootstrap';
import { validateStr, existDescrip, capitalizeFirstLetter } from '../../../../services/CrudBase/CrudValidationServices';
import { getButtonLabel } from '../../../../services/CrudBase/CrudServices';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2';

const ProductFormCrud = (props) => {

    const URLReUpDe = props.productId ? process.env.REACT_APP_API_URL + 'product/' + props.productId : '';
    const URLCreate = process.env.REACT_APP_API_URL + 'product';

    const [descrip, setDescrip] = useState('');

    const [descripVal, setDescripVal] = useState('');
    const [descripInv, setDescripInv] = useState('');

    const descripRef = useRef('');

    useEffect(() => {
        props.productId && getProduct();
    }, []);

    const getProduct = async () => {
        try {
            const res = await fetch(URLReUpDe);
            if (res.status === 200) {
                const objJson = await res.json();
                setDescrip(objJson.descrip);
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        let datosOk = false;
        if (!valDescrip()) {
            datosOk = true;
        }

        if (datosOk && props.opeCrud === 'create') {
            //Create
            const objCre = {
                descrip
            };

            try {
                const config = {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(objCre),
                };

                const req = await fetch(URLCreate, config);

                if (req.status === 201) {
                    Swal.fire(
                        'Created object',
                        'The object was created successfully',
                        'success'
                    );

                    props.getProducts();
                    props.hideModal();
                }

            } catch (error) {
                Swal.fire(
                    'An error occurred',
                    'Sorry. An unexpected error occurred, try the operation later',
                    'warning'
                );
            }
        } else if (datosOk && props.productId && props.opeCrud === 'update') {
            //Update
            const objUpd = {
                descrip: descripRef.current.value
            };

            try {
                const config = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(objUpd),
                };

                const req = await fetch(URLReUpDe, config);

                if (req.status === 200) {
                    Swal.fire(
                        'Edited object',
                        'The object was edited successfully',
                        'success'
                    );

                    props.getProducts();
                    props.hideModal();
                }
            } catch (error) {
                Swal.fire(
                    'An error occurred',
                    'Sorry. An unexpected error occurred, try the operation later',
                    'warning'
                );
            }

        } else if (datosOk && props.productId && props.opeCrud === 'delete') {
            //Delete
            const objDel = {
                descrip: descripRef.current.value,
                eliminado: true,
            };

            try {
                const config = {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(objDel),
                };

                const req = await fetch(URLReUpDe, config);

                if (req.status === 200) {
                    Swal.fire(
                        'Deleted object',
                        'The object was deleted successfully',
                        'success'
                    );

                    props.getProducts();
                    props.hideModal();
                }

            } catch (error) {
                Swal.fire(
                    'An error occurred',
                    'Sorry. An unexpected error occurred, try the operation later',
                    'warning'
                );
            }
        } else if (!datosOk) {
            //Input required error
            Swal.fire(
                "Required fields error",
                "Please fill all required fields",
                "warning"
            );
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
                        onChange={(e) =>
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
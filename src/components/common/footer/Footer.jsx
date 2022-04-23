import React from 'react';
import { Container } from 'react-bootstrap';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer = () => {
    return (
        <>
            <Container className="bg-dark pt-3 pb-2 mb-0" fluid>
                <p className="text-center text-light my-0">
                    &copy; BJ Design - 2022 - todos los derechos reservados
                </p>
            </Container>
        </>
    );
};

export default Footer;
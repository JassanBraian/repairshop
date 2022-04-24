import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
    return (
        <>
            <Container className="bg-dark py-3 mb-0" fluid>
                <p className="text-center text-light my-0">
                    &copy; BJ Design - 2022 - All rights reserved
                </p>
            </Container>
        </>
    );
};

export default Footer;
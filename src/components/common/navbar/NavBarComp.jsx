import React from 'react';
import { useState } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import OffCanvasComp from '../offcanvas/OffCanvasComp';


const NavBarComp = () => {

    return (
        <>
            <Navbar bg="dark" variant="dark" >
                <OffCanvasComp />
                <Container fluid>
                    <Navbar.Brand href="">Repair Shop</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="products">Products</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default NavBarComp;
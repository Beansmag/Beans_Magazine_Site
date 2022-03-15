import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { useShopify } from "../hooks"

import Branding from '../Assets/Branding.svg'

import '../Styles/navbar.css'

const Navbar = (props) => {
    const {
        cartStatus,
		closeCart,
		openCart,
	} = useShopify()

    function handleOpen(e) {
		e.preventDefault()
		openCart()
	}

	function handleClose(e) {
		e.preventDefault()
		closeCart()
	}

    return (
        <Container fluid className="nav_master_container" >
           <img src={Branding} alt='Beans Logo' className="nav-logo" />
            <Row className="row-style">
                <Col lg={{ offset: 3, span: 6}} md={{ offset: 3, span: 6 }} className="d-xs-none d-none d-lg-block d-md-block">
                    <ul className="nav-container">
                        <li><Link className="nav_text" to="/">Home</Link></li>
                        <li><Link className="nav_text" to="/lookbook">Lookbook</Link></li>
                        <li><Link className="nav_text" to="/about">About</Link></li>
                    </ul>
                </Col>
                <Col lg={3} md={3}>
                    <h1 
                        onClick={(e) => { cartStatus ? handleClose(e) : handleOpen(e) }} 
                        className="nav_text-cart"
                    >
                        Cart
                    </h1>
                </Col>
            </Row>
        </Container>
    )
}

export default Navbar
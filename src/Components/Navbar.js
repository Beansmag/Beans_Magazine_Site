import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'

import Branding from '../Assets/Branding.svg'

import '../Styles/navbar.css'

const Navbar = () => {
    return (
        <Container fluid className="nav_master_container">
           <img src={Branding} alt='Beans Logo' style={{ height: "7vh", position: "fixed", left: '2%', paddingTop: '1%' }} />
            <Row>
                <Col
                    className='d-block d-md-none'
                    lg={3}
                    xs={3}
                >   
                    {/* <HamburgerMenu /> */}
                </Col>
                <Col lg={12} className="d-xs-none d-none d-lg-block d-md-block">
                    <ul className="nav-container">
                        <li><Link className="nav_text" to="/">Home</Link></li>
                        <li><Link className="nav_text" to="/lookbook">Lookbook</Link></li>
                        <li><Link className="nav_text" to="/about">About</Link></li>
                    </ul>
                </Col>
            </Row>
        </Container>
    )
}

export default Navbar
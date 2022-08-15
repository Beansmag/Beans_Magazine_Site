import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import Cart from '../../ComponentsShopify/Cart'
import HamburgerMenu from './HamburgerMenu.js'
import sanityClient from '../../client';

// import Branding from '../../Assets/Branding.svg'

import './navbar.css'

const Navbar = (props) => {
    const [brandingData, setBrandingData] = useState()

    useEffect(() => {
        sanityClient.fetch(`*[_type == "branding"]{
            logo{
                asset->{
                  _id,
                  url
                },
                alt
              },
        }`)
        .then((data) => setBrandingData(data))
        .catch(console.error)
    },[])

    return (
        <Container fluid className="nav_master_container" >
           <img src={brandingData && brandingData[0].logo.asset.url} alt='Beans Logo' className="nav-logo" />
            <Row className="row-style">
                <Col lg={{ offset: 3, span: 6}} md={{ offset: 3, span: 6 }} className="d-xs-none d-none d-lg-block d-md-block">
                    <ul className="nav-container">
                        <li ><Link className="nav_text" to="/">Home</Link></li>
                        <li><Link className="nav_text" to="/lookbook">Lookbook</Link></li>
                        <li><Link className="nav_text" to="/about">About</Link></li>
                    </ul>
                </Col>
                <Col
                    className='d-block d-md-none'
                    lg={3}
                    xs={3}
                >   
                    <HamburgerMenu />
                </Col>
                <Cart />
            </Row>
        </Container>
    )
}

export default Navbar
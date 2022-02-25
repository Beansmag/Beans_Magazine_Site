import React, { useState, useEffect } from "react"
import { Container, Row, Col } from "react-bootstrap"
import background from '../Assets/Wall-01min.png'

import Product from "./Product"
const Products = (props) => {
	const locale = 'en';
	const [today, setDate] = useState(new Date());
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
	const hour = today.getHours();
	const time = today.toLocaleTimeString(locale, { hour: 'numeric', hour12: true, minute: 'numeric' });
	console.log(props.history)

  return (
		<Container fluid style={{ backgroundImage: `url(${background})` }}>
			<div>
				<Row className="product-header">
					<Col lg={{ span: 4, offset: 2 }} >
						<h4 className="product-subheader" style={{ textAlign: "left" }}>{time}</h4>
					</Col>
					<Col lg={{ span: 4 }}>
						<h4 className="product-subheader" style={{ textAlign: "right" }}>{date}</h4>
					</Col>
				</Row>
				<Row>
					<Col lg={{ span: 8, offset: 2 }}>
						<h4 className="product-subheader" style={{ paddingTop: "5vh", textAlign: "left" }}>THE CITY OF NEW YORK DEPARTMENT OF CORRECTION</h4>
					</Col>
				</Row>
			</div>
			<Product history={props.history} />
		</Container>
	)
}

export default Products
import React, { useState, useEffect } from "react"
import { useShopify } from "../hooks"
import { Container, Col, Row } from 'react-bootstrap'

import ProductModal from "./ProductModal"

import Arrow from '../Assets/Arrow.svg'

export default (props) => {
	const { products } = useShopify()
	const [translate, setTranslate] = useState(0)
	const [index, setIndex] = useState(null)
	const [prodModal, setProdModal] = useState(false)
	const [rowWidth, setRowWidth] = useState()

	useEffect(() => {
		//Sets the initial value of index which is half the length of amount of products
		const indexStart = Math.trunc(products.length / 2) 
		const halfIndex = 100 / products.length
		if (products[1] !== undefined) {
			setIndex(indexStart)
			setRowWidth(halfIndex)
		}
	},[products])


	function clickLeft() {
		const inc = 100 / products.length
		if (index <= 0) {
			setTranslate(translate)
			setIndex(0)
		} else {
			setIndex(index - 1)
			setTranslate(translate + rowWidth)
		}
	}

	function clickRight() {
		const amount = products.length - 1
		if (index >= amount) {
			setTranslate(translate)
			setIndex(amount)
		} else {
			setIndex(index + 1)
			setTranslate(translate - rowWidth)
		}
	}

	return (
		<Container fluid>
			<div className="prod-button-left">
				<img 
					src={Arrow} 
					alt="Move clothing carousel left" 
					className="arrow"
					onClick={() => clickLeft()}
					/>
			</div>
			<div className="prod-button-right">
				<img 
					src={Arrow} 
					alt="Move clothing carousel right" 
					className="arrow"
					onClick={() => clickRight()}
					style={{ transform: "rotate(180deg)" }}
					/>
			</div>
			<Row>
				<Col lg={{ offset: 4, span: 8 }} className="prod-title">
					<h1 className="prod-title-text" >{products[index] !== undefined ? products[index].title : "...Loading"}</h1>
				</Col>
			</Row>
			
			{/* <div style={{ position: "fixed", zIndex: "9", marginTop: "60px" }}>
				<h1>{products[index] !== undefined ? products[index].variants[0].price : "...Loading"}</h1>
			</div> */}

			<div style={{ position: "fixed", zIndex: "9", marginTop: "200px", transform: `${prodModal ? "translateX(0vw)" : "translateX(100vw)"}` }}>
				<ProductModal index={index} />
			</div>
				<div className="Product-wrapper" style={{ transform: `translateX(${-16 + translate}%)`, width: "150vw",}} >
					{products &&
					products.map((product, i) => {
						const image = product.images[0]
						return (
							<div className='home-prod-row' key={i} style={{ width: `${rowWidth && rowWidth}%` }}>
									{image ? (
										<img src={image.src} alt={`${product.title} product shot`} className="home-prod-img"
											style={{ 
												// marginTop: `${ Math.floor(Math.random() * 20)}0px`, 
												cursor: "pointer",
												transform: `${i === index ? "scale(2)" : "scale(1.6)"}`,
												// background: "red",
												transition: "transform 1s",
												zIndex: "10"
											}}
											onClick={() => setProdModal(!prodModal)}
										/>
									) : null}
							</div>
						)
					})
					}
				</div>
		</Container>
	)
}
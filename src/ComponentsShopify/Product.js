import React, { useState, useEffect } from "react";
import { useShopify } from "../hooks";
import { Container, Col, Row } from 'react-bootstrap';
import { useSprings, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';

import ProductModal from "./ProductModal";

import Close from '../Assets/Close.svg'

import '../Styles/Home.css'
import Arrow from '../Assets/Arrow.svg';

export default (props) => {
	const { products } = useShopify()
	const [translate, setTranslate] = useState(0)
	const [index, setIndex] = useState(null)
	const [prodModal, setProdModal] = useState(false)
	const [rowWidth, setRowWidth] = useState()
	const [count, setCount] = useState(0)
	const window = document.documentElement.clientWidth 
	const prodLength = products && products.length

	useEffect(() => {
		const indexStart = Math.trunc(products.length / 2) 
		const halfIndex = 100 / products.length
		// const prodIndexLength = products.length
		if (products[1] !== undefined) {
			setIndex(indexStart)
			setRowWidth(halfIndex)
			setTranslate(0)
			// setProdLength(prodIndexLength)
		}
	},[products])

	const bind = useDrag(({movement: [mx], cancel, active }) => {
		if (active && mx > 100 && index > 0) {
			setCount(count + 1)
			cancel()
		}
		if (active && mx < -100 && index < products.length - 1) {
			setCount(count - 1)
			cancel()
		}
	  })

	useEffect(() => {
	const indexStart = Math.trunc(products.length / 2) 
		setIndex(indexStart - count)
		setTranslate(count * rowWidth)
	},[count])

	function clickLeft() {
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
		<Container style={{ position: "fixed", height: "100vh", width: "100vw"}}>
			{!prodModal ? 
				<div>
					<div className="prod-button-left" style={{ top: `${window > 600 ? "40vh" : "43vh"}` }}>
						<img 
							src={Arrow} 
							alt="Move clothing carousel left" 
							className="arrow"
							onClick={() => clickLeft()}
							/>
					</div>
					<div className="prod-button-right" style={{ top: `${window > 600 ? "40vh" : "43vh"}` }}>
						<img 
							src={Arrow} 
							alt="Move clothing carousel right" 
							className="arrow"
							onClick={() => clickRight()}
							style={{ transform: "rotate(180deg)" }}
							/>
					</div>
				</div>	
				:
				<span></span>
			}
			<Row style={{ opacity: `${prodModal ? "0" : "1"}` }}>
				<Col lg={{ offset: 4, span: 8 }} xs={12} className="prod-title" style={{ marginTop: `${window > 600 ? "23vh" : "28vh"}` }} >
					<h1 className="prod-title-text" >{products[index] !== undefined ? products[index].title : ""}</h1>
				</Col>
			</Row>
			<Row style={{ opacity: `${prodModal ? "0" : "1"}` }}>
				<Col lg={{ offset: 4, span: 1 }} xs={{ offset: 2, span: 3 }} className="prod-view" style={{ marginTop: `${window > 600 ? "72vh" : "55vh"}` }}>
					<img src={Arrow} onClick={() => setProdModal(true)} alt="click to view clothes" style={{ height: "90px", transform: "rotate(135deg)" }} />
					<h1 className="prod-view-text" onClick={() => setProdModal(true)} >View</h1>
				</Col>
				<Col lg={{ offset: 7, span: 3 }} xs={{ offset: 6, span: 3 }} className="prod-price" style={{ marginTop: `${window > 600 ? "72vh" : "60vh"}` }}>
					<h1 className="prod-price-text">{`$${products[index] !== undefined ? products[index].variants[0].price : ""}*`}</h1>
				</Col>
			</Row>
			{prodModal ? 
					<div style={{ width: "100vw", height: "100vh", position: "fixed", marginLeft: "-15px", zIndex: "25"}}>
						<img 
							src={Close} alt="close modal window" 
							className="close-product-modal"
							onClick={() => setProdModal(false)}
						/>
						<ProductModal index={index} />
					</div>
				:
				<span></span>
			} 
			<animated.div 
				className="Product-wrapper" 
				style={{ 
					transform: `translateX(${-26 + translate}%)`, 
					width: `${prodLength * 19}vw`,
					marginTop: `${window > 600 ? "30vh" : "40vh"}`,
					opacity: `${prodModal ? "0" : "1"}`
				}} 
				{...bind()} 
			>
				{products &&
				products.map((product, i) => {
					const image = product.images[0]
					return (
						<div className='home-prod-row' key={i} style={{ width: `${rowWidth && rowWidth}%` }} >
							{image ? (
								<img src={image.src} alt={`${product.title} product shot`} className="home-prod-img" draggable="false"
									style={{ 
										transform: `${i === index ? "scale(2)" : "scale(1.5)"}`,
										transition: "transform 0.5s",
										zIndex: `${i === index ? 20 : 5}`
									}}
									onClick={() => setProdModal(false)}
								/>
							) : null}
						</div>
					)
				})
				}
			</animated.div>
		</Container>
	)
}
import React, { useState, useEffect, useRef } from "react";
import { useShopify } from "../hooks";
import { Container, Col, Row } from 'react-bootstrap';
import { useSprings, animated } from '@react-spring/web';
// import clamp from 'lodash.clamp';

import { useDrag } from '@use-gesture/react';

import '../Styles/Home.css'

import ProductModal from "./ProductModal";
// import Arrow from '../Assets/Arrow.svg';

export default (props) => {
	const { products } = useShopify()
	const [translate, setTranslate] = useState(0)
	const [index, setIndex] = useState(null)
	const [prodModal, setProdModal] = useState(false)
	const [rowWidth, setRowWidth] = useState()
	const [count, setCount] = useState(0)
	const window = document.documentElement.clientWidth 
	const carStart = window > 600 ? -16 : -34

	console.log(carStart)

	useEffect(() => {
		const indexStart = Math.trunc(products.length / 2) 
		const halfIndex = 100 / products.length
		if (products[1] !== undefined) {
			setIndex(indexStart)
			setRowWidth(halfIndex)
		}


	},[products])

	const bind = useDrag(({movement: [mx], direction: [xDir], cancel, active }) => {
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

	return (
		<Container fluid style={{ position: "fixed", height: "100vh", width: "100vw"}}>
			{/* {prodModal ?
				<div 
					style={{ height: "100vh", width: "100vw", opacity: "0.5", backgroundColor: "red", position: "fixed" }}
					onClick={() => setProdModal(false)}
				>
				</div>
				:
				<span></span>
			} */}
			<Row style={{ opacity: `${prodModal ? "0" : "1"}` }}>
				<Col lg={{ offset: 4, span: 8 }} xs={{ offset: 2, span: 10 }} className="prod-title">
					<h1 className="prod-title-text" >{products[index] !== undefined ? products[index].title : ""}</h1>
				</Col>
			</Row>
			<Row style={{ opacity: `${prodModal ? "0" : "1"}` }}>
				<Col lg={{ offset: 4, span: 2 }} xs={{ offset: 7, span: 3 }} className="prod-view">
					<h1 className="prod-view-text" onClick={() => setProdModal(true)}>View</h1>
				</Col>
				<Col lg={{ offset: 7, span: 3 }} xs={{ offset: 7, span: 3 }} className="prod-price">
					<h1 className="prod-price-text">{`$${products[index] !== undefined ? products[index].variants[0].price : ""}*`}</h1>
				</Col>
			</Row>
			{prodModal ? 
					<ProductModal index={index} />
				:
				<span></span>
			} 
			{/* `${window > 600 ? -37 : -10}` */}
			<animated.div className="Product-wrapper" style={{ transform: `translateX(${carStart + translate}%)`, width: `${window > 600 ? "150vw" : "300vw"}`, opacity: `${prodModal ? "0" : "1"}`}} {...bind()} >
				{products &&
				products.map((product, i) => {
					const image = product.images[0]
					return (
						<div className='home-prod-row' key={i} style={{ width: `${rowWidth && rowWidth}%` }} >
							{image ? (
								<img src={image.src} alt={`${product.title} product shot`} className="home-prod-img" draggable="false"
									style={{ 
										cursor: "pointer",
										transform: `${i === index ? "scale(1.8)" : "scale(1.4)"}`,
										transition: "transform 0.5s",
										zIndex: "10"
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


{/* <div className="prod-button-left">
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
</div> */}

// function clickLeft() {
// 	if (index <= 0) {
// 		setTranslate(translate)
// 		setIndex(0)
// 	} else {
// 		setIndex(index - 1)
// 		setTranslate(translate + rowWidth)
// 	}
// }

// function clickRight() {
// 	const amount = products.length - 1
// 	if (index >= amount) {
// 		setTranslate(translate)
// 		setIndex(amount)
// 	} else {
// 		setIndex(index + 1)
// 		setTranslate(translate - rowWidth)
// 	}
// }


{/* <div className="prod-button-left">
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
</div> */}

			
			{/* <div style={{ position: "fixed", zIndex: "9", marginTop: "60px" }}>
				<h1>{products[index] !== undefined ? products[index].variants[0].price : "...Loading"}</h1>
			</div> */}


// function clickLeft() {
// 	if (index <= 0) {
// 		setTranslate(translate)
// 		setIndex(0)
// 	} else {
// 		setIndex(index - 1)
// 		setTranslate(translate + rowWidth)
// 	}
// }

// function clickRight() {
// 	const amount = products.length - 1
// 	if (index >= amount) {
// 		setTranslate(translate)
// 		setIndex(amount)
// 	} else {
// 		setIndex(index + 1)
// 		setTranslate(translate - rowWidth)
// 	}
// }

// const pages = [
// 	'https://images.pexels.com/photos/62689/pexels-photo-62689.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
// 	'https://images.pexels.com/photos/733853/pexels-photo-733853.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
// 	'https://images.pexels.com/photos/4016596/pexels-photo-4016596.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
// 	'https://images.pexels.com/photos/351265/pexels-photo-351265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
// 	'https://images.pexels.com/photos/924675/pexels-photo-924675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
// 	'https://images.pexels.com/photos/924675/pexels-photo-924675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
// 	'https://images.pexels.com/photos/924675/pexels-photo-924675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
//   ]

// export default () => {
// 		//index is probably the amount of images total is 7
// 		const index = useRef(0)
// 		//width is the size of window in width
// 		const width = window.innerWidth
	  
// 		//pages.length is 7 i is always 1 more than what it actuall is 
// 		// x is index * width       --->   1 x width       2 x width etc
// 		const [props, api] = useSprings(pages.length, i => ({
// 		  x: i * width,
// 		  scale: 1,
// 		  display: 'block',
// 		}))
	  
// 		let count = 0
// 		const bind = useDrag(({ canceled, first, last, active, movement: [mx], direction: [xDir], cancel }) => {
// 		  if (active && Math.abs(mx) > width / 2) {
// 			count++
// 			console.log(count)
// 			index.current = clamp(index.current + (xDir > 0 ? -1 : 1), 0, pages.length - 1)
// 			cancel()
// 		  }
// 		  api.start(i => {
// 			if (i < index.current - 1 || i > index.current + 1) return { display: 'none' }
// 			const x = (i - index.current) * width + (active ? mx : 0)
// 			const scale = active ? 1 - Math.abs(mx) / width / 2 : 1
// 			return { x, scale, display: 'block' }
// 		  })
// 		})

// 		return (
// 		  <div className="wrapper" style={{position: "fixed"}}>
// 			{props.map(({ x, display, scale }, i) => (
// 			  <animated.div className="page" {...bind()} key={i} style={{ display, x }}>
// 				<animated.div style={{ scale, backgroundImage: `url(${pages[i]})` }} />
// 			  </animated.div>
// 			))}
// 		  </div>
// 		)
// }
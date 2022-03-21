import React, { useState, useEffect } from "react";
import { useShopify } from "../hooks";
import { Container, Col, Row } from 'react-bootstrap';
import { animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import ReactGa from 'react-ga'
import sanityClient from '../client';

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
	const [videoData, setVideoData] = useState()

	useEffect(() => {
        sanityClient.fetch(`*[_type == "backgroundVideo"]{
			title,
			backgroundGif{
                asset->{
                  _id,
                  url
                },
                alt
              },
        }`)
        .then((data) => setVideoData(data))
        .catch(console.error)
      },[])

	useEffect(() => {
		const indexStart = Math.trunc(products.length / 2) 
		const halfIndex = 100 / products.length
		if (products[1] !== undefined) {
			setIndex(indexStart)
			setRowWidth(halfIndex)
			ReactGa.initialize('UA-211860604-30')
			ReactGa.pageview(`/home`)
		}
		setTranslate(0)
	},[products])

	useEffect(()=> {
		if(prodModal) {
			if(prodModal){
				ReactGa.initialize('UA-211860604-30')
				ReactGa.pageview(`/home/${products[index].title}`)
			}
		}
	},[prodModal])

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
		setTranslate(count === "null" ? 0 * rowWidth : count * rowWidth)
	},[count])

	function clickLeft() {
		if (index <= 0) {
			setTranslate(translate)
			setIndex(0)
		} else {
			setIndex(index - 1)
			setCount(count + 1)
		}
	}

	function clickRight() {
		const amount = products.length - 1
		if (index >= amount) {
			setTranslate(translate)
			setIndex(amount)
		} else {
			setIndex(index + 1)
			setCount(count - 1)
		}
	}

	return (
		<Container style={{ position: "fixed", height: "100vh", width: "100vw"}}>
			{!prodModal ? 
				<div>
					<div className="prod-button-left" style={{ top: `${window > 600 ? "70vh" : "51vh"}` }}>
						<img 
							src={Arrow} 
							alt="Move clothing carousel left" 
							className="arrow"
							onClick={() => clickLeft()}
							/>
					</div>
					<div className="prod-button-right" style={{ top: `${window > 600 ? "70vh" : "51vh"}` }}>
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
					transform: `translateX(${-34 + translate}%)`, 
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
			{prodModal && videoData[index + 1] !== undefined  ? 
				<div 
					alt="background Video" 
					className="home-bg-vid"
					style={{ backgroundImage: `url(${videoData[(index + 1)].backgroundGif !== null ? videoData[(index + 1)].backgroundGif.asset.url : videoData[0].backgroundGif.asset.url})` }}
				>
				</div>
				:
				<div 
					alt="background Video" 
					className="home-bg-vid"
					style={{ backgroundImage: `url(${videoData && videoData[0].backgroundGif.asset.url})` }}
				>
				</div>
			}
		</Container>
	)
}
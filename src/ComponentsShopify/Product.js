import React, { useState, useEffect, useRef } from "react";
import { useShopify } from "../hooks";
import { Container, Col, Row } from 'react-bootstrap';
import { animated, useSpring } from '@react-spring/web';
import ReactGa from 'react-ga'
import BlockContent from '@sanity/block-content-to-react';
import Helmet from 'react-helmet'

import sanityClient from '../client';

import ProductModal from "./ProductModal";
import Close from '../Assets/Close.svg'
import Arrow from '../Assets/Arrow.svg';

import '../Styles/Home.css'

export default () => {
	const { featured, tops, bottoms, magazines, accessories } = useShopify();
	const [translate, setTranslate] = useState(0);
	const [index, setIndex] = useState(null);
	const [prodModal, setProdModal] = useState(false);
	const [rowWidth, setRowWidth] = useState();
	const [count, setCount] = useState(0);
	const [videoData, setVideoData] = useState();
	const [videoDataMobile, setVideoDataMobile] = useState();
	const [modalIndex, setModalIndex] = useState();
	const [missionCartInfo, setMissionCartInfo] = useState();
	const [imageLoaded, setImageLoaded] = useState(false);
 	const [imageLoadedMobile, setImageLoadedMobile] = useState(false);
	const [category, setCategory] = useState(featured);
	const [rowPositionStart, setrowPositionStart] = useState()
	const image = useRef();
	const imageMobile = useRef();
	const window = document.documentElement.clientWidth;
	const mobileView = document.documentElement.clientWidth < 600

	useEffect(() => {
		setCategory(featured)
		setrowPositionStart(Math.round(featured.length / 2) * (-100 / featured.length) - ((-100 / featured.length) * 3.25))
	},[featured])

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
        sanityClient.fetch(`*[_type == "backgroundVideoMobile"]{
			title,
			backgroundGifMobile{
                asset->{
                  _id,
                  url
                },
                alt
              },
        }`)
        .then((data) => setVideoDataMobile(data))
        .catch(console.error)
      },[])

	  useEffect(() => {
		sanityClient.fetch(`*[_type == "missionCartInfo"]{
			missionHeader,
			missionStatementText
		}`)
		.then((data) => setMissionCartInfo(data))
		.catch(console.error)
	  },[])

	useEffect(() => {
		const indexStart = Math.round(category.length / 2) - 1
		const rowWidthPercent = 100 / category.length
		if (category[0] !== undefined) {
			setIndex(indexStart)
			setRowWidth(rowWidthPercent)
			ReactGa.initialize('UA-211860604-30')
			ReactGa.pageview(`/home`)
		}
		setTranslate(0)
	},[category])

	useEffect(()=> {
		if(prodModal) {
			if(prodModal){
				ReactGa.initialize('UA-211860604-30')
				ReactGa.pageview(`/home/${category[index].title}`)
			}
		}
	},[prodModal])

	// const bind = useDrag(({movement: [mx], cancel, active }) => {
	// 	if (active && mx > 100 && index > 0) {
	// 		setCount(count + 1)
	// 		cancel()
	// 	}
	// 	if (active && mx < -100 && index < products.length - 1) {
	// 		setCount(count - 1)
	// 		cancel()
	// 	}
	//   })

	// this translates the product images and changes the index
	useEffect(() => {
	const indexStart = Math.round(category.length / 2) - 1
		setIndex(indexStart - count)
		setTranslate(count === "null" ? 0 * rowWidth : count * rowWidth)
		// setTranslate(count === "null" ? 0 * "250px" : count * "250px")
	},[count])

	function clickLeft() {
		const amount = category.length - 1
		const indexStart = Math.round(category.length / 2)
		const newCount = indexStart - amount
		if (index <= 0) {
			// setTranslate(translate)
			// setIndex(0)
			setIndex(amount)
			setCount(newCount - 1)
		} else {
			setIndex(index - 1)
			setCount(count + 1)
		}
	}

	function clickRight() {
		const amount = category.length - 1
		const indexStart = Math.round(category.length / 2)
		if (index >= amount) {
			// setTranslate(translate)
			// setIndex(amount)
			setIndex(0)
			setCount(indexStart - 1)
		} else {
			setIndex(index + 1)
			setCount(count - 1)
		}
	}

	useEffect(() => {
        var bgImg = new Image();
		bgImg.src = videoData && videoData[(modalIndex + 1)] && videoData[(modalIndex + 1)].backgroundGif.asset.url
        if(image.current !== undefined){
            bgImg.onload = function(){
				setImageLoaded(true)
            }
        }
    },[modalIndex])

	useEffect(() => {
        var bgImg = new Image();
		bgImg.src = videoDataMobile && videoDataMobile[(modalIndex + 1)] && videoDataMobile[(modalIndex + 1)].backgroundGifMobile.asset.url
        if(imageMobile.current !== undefined){
            bgImg.onload = function(){
				setImageLoadedMobile(true)
            };
        }
    },[modalIndex])

	const styles = useSpring({ opacity: imageLoaded ? 0.8 : 0 })
	const stylesMobile = useSpring({ opacity: imageLoadedMobile ? 0.8 : 0 })

	return (
		<Container style={{ position: "fixed", height: "100vh", width: "100vw" }} >
			<Helmet>
				<title>Home</title>
				<meta
					name="Home Page"
					content="View all the products here on the home page. Browse categories and find your favourite items"
				/>
			</Helmet>
			<div className="d-xs-none d-md-none d-none d-lg-block d-md-block">
				{!prodModal ?
					<div>
						<div className="prod-button-left" style={{ top: `${window > 600 ? "70vh" : "53vh"}` }}>
							<img 
								src={Arrow} 
								alt="Move clothing carousel left" 
								className="arrow"
								onClick={() => clickLeft()}
								/>
						</div>
						<div className="prod-button-right" style={{ top: `${window > 600 ? "70vh" : "53vh"}` }}>
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
			</div>

			<Row style={{ opacity: `${prodModal ? "0" : "1"}` }} className="d-xs-none d-md-none d-none d-lg-block d-md-block" >
				<Col lg={{ offset: 4, span: 8 }} xs={{offset: 2, span: 10}} className="prod-title" style={{ marginTop: `${window > 600 ? "23vh" : "28vh"}` }} >
					<h1 className="prod-title-text" >{category[index] !== undefined ? category[index].title : ""}</h1>
				</Col>
			</Row>
			<Row style={{ opacity: `${prodModal ? "0" : "1"}` }} className="d-xs-none d-md-none d-none d-lg-block d-md-block">
				<Col lg={{ offset: 7, span: 3 }} xs={{ offset: 6, span: 3 }} className="prod-price" style={{ marginTop: `${window > 600 ? "72vh" : "60vh"}` }}>
					<h1 className="prod-price-text">{`$${category[index] !== undefined ? category[index].variants[0].price : ""}*`}</h1>
				</Col>
			</Row>

			{prodModal ?
					<div style={{ width: "100vw", height: "100vh", position: "fixed", marginLeft: "-15px", zIndex: "25" }}>
						<img 
							style={{ backgroundColor: "#DDDDDD" }}
							src={Close} alt="close modal window" 
							className="close-product-modal"
							onClick={e => {
								setProdModal(false)
								setImageLoaded(false)
								setImageLoadedMobile(false)
								setModalIndex()
							}}
						/>
						<ProductModal index={index} modalIndex={modalIndex} category={category} />
					</div>
				:
				<span></span>
			}

			{!prodModal ?
				<ul className='mainMenu-ul' style={{ marginTop: mobileView ? "10vh" : "15vh" }} >
					<li className='mainMenu-li'><h5 
						className={category === featured ? "product-category-text-selected" : "product-category-text" }
						onClick={e => {
							setCategory(featured)
							setrowPositionStart(featured.length === 1 ? 0 : Math.round(featured.length / 2) * (-100 / featured.length) - ((-100 / featured.length) * 3.25))}}>
								ALL
					</h5></li>
					<li className='mainMenu-li'><h5
						className={category === tops ? "product-category-text-selected" : "product-category-text" }
						onClick={e => {
							setCategory(tops)
							setrowPositionStart(tops.length === 1 ? 0 : Math.round(tops.length / 2) * (-100 / tops.length) - ((-100 / tops.length) * 3.25))}}>
								TOPS
					</h5></li>
					<li className='mainMenu-li'><h5
						className={category === bottoms ? "product-category-text-selected" : "product-category-text" }
						onClick={e => {
							setCategory(bottoms)
						 	setrowPositionStart(bottoms.length === 1 ? 0 : Math.round(bottoms.length / 2) * (-100 / bottoms.length) - ((-100 / bottoms.length) * 3.25))}}>
								BOTTOMS
					</h5></li>
					<li className='mainMenu-li'><h5
						className={category === magazines ? "product-category-text-selected" : "product-category-text" }
						onClick={e => {
							setCategory(magazines) 
						 	setrowPositionStart(magazines.length === 1 ? 0 : Math.round(magazines.length / 2) * (-100 / magazines.length) - ((-100 / magazines.length) * 3.25))}}>
								MAGAZINE
					</h5></li>
					<li className='mainMenu-li'><h5
						className={category === accessories ? "product-category-text-selected" : "product-category-text" }
						onClick={e => {
							setCategory(accessories)
							setrowPositionStart(accessories.length === 1 ? 0 : Math.round(accessories.length / 2) * (-100 / accessories.length) - ((-100 / accessories.length) * 3.25))}}>
								ACCESSORIES
					</h5></li>
				</ul> : null
			}

			{/* this is mobile */}
				<div style={{ height: "100%", overflow: "scroll", width: '100%' }} className='d-block d-md-none'>
					<div className="grid-wrapper" style={{ marginTop: "15vh", paddingBottom: "5vh" }}>
							{category && category !== null &&
								category.map((product, i) => {
									const image = product.images[0]
									return (
											<div
												key={i}
												style={{ width: "50%", display: "inline-flex", opacity: `${prodModal ? "0" : "1"}` }}
												onClick={e => {
													setProdModal(true)
													setModalIndex(i)
													}}
											>
												<img src={image.src} />
											</div>
									)
								})
							}
					</div>

				{prodModal ?
				<span></span>
				:
				<div style={{ textAlign: 'center' }} className='d-block d-md-none'>
					<h3 style={{ fontWeight: '800', fontSize: '30px' }} >{missionCartInfo && missionCartInfo[0].missionHeader}</h3>
					<h3 style={{ paddingBottom: '12vh', fontWeight: '800' }}>
						<BlockContent 
							blocks={missionCartInfo && missionCartInfo[0].missionStatementText} 
							projectId="m7j507qg"
							dataset="headless"
						/>
					</h3>
				</div>
			}
			</div>

			{category.length !== 0 ?
				<animated.div 
					className="Product-wrapper d-xs-none d-md-none d-none d-lg-block d-md-block" 
					style={{ 
						transform: `translateX(${rowPositionStart + translate}%)`, 
						width: `${18 * category.length}vw`,
						marginTop: `${window > 600 ? "30vh" : "40vh"}`,
						opacity: `${prodModal ? "0" : "1"}`,
					}}
				>
					{category &&
						category.map((product, i) => {
							const image = product.images[0]
							return (
									<div 
										className='home-prod-row' key={i} style={{ width: `${rowWidth && rowWidth}%` }} 
										// className='home-prod-row' key={i} style={{ width: "220px", background: "green" }} 
										onClick={e => {
											setProdModal(true)
											setModalIndex(i)
										}}
									>
										{image ? (
											<img src={image.src} alt={`${product.title} product shot`} className="home-prod-img" draggable="false"
												style={{
													transform: `${i === index ? "scale(1.8)" : "scale(1.3)"}`,
													transition: "transform 0.5s",
												}}
											/>
										) : null}
									</div>
							)
						})
					}
				</animated.div>
				:
				<div style={{ width: "100vw", top: "40vh", position: "fixed", marginLeft: "-15px" }}>
					<h4 style={{ fontWeight: "800", fontSize: "40pt", textAlign: "center" }}>
						Nothing to see here
					</h4>
				</div>
			}
			
			{prodModal && videoData[index + 1] !== undefined  && window > 600 ? 
				<animated.div style={styles} >
					<div
						alt="background Video" 
						className="home-bg-vid"
						ref={image}
						style={{ 
							backgroundImage: `url(${videoData[(modalIndex + 1)] !== null ? videoData[(modalIndex + 1)].backgroundGif.asset.url : videoData[0].backgroundGif.asset.url})`, 
						}}
					>
					</div>
				</animated.div>
				:
				<div 
					alt="background Video" 
					className="home-bg-vid"
					style={{ 
						backgroundImage: `url(${window > 600 ? videoData && videoData[0].backgroundGif.asset.url : ""})`, 
					}}
				>
				</div>
			}
			{prodModal && videoDataMobile[index + 1] !== undefined  && window < 600 ?
				<animated.div style={stylesMobile}>
					<div 
						alt="background Video" 
						className="home-bg-vid"
						ref={imageMobile}
						style={{ 
							backgroundImage: `url(${videoDataMobile[(modalIndex + 1)] !== null ? videoDataMobile[(modalIndex + 1)].backgroundGifMobile.asset.url : videoDataMobile[0].backgroundGifMobile.asset.url})`
						}}
					>
					</div>
				</animated.div>
				:
				<div 
					alt="background Video" 
					className="home-bg-vid"
					style={{ 
						backgroundImage: `url(${window < 600 ? videoDataMobile && videoDataMobile[0].backgroundGifMobile.asset.url : "" })`, 

					}}
				>
				</div>
			}
		</Container>
	)
}
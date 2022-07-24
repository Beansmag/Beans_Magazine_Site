import React, { useState, useEffect } from "react";
import { useShopify } from "../hooks";
import { Container, Col, Row } from 'react-bootstrap';
import { animated } from '@react-spring/web';
import ReactGa from 'react-ga'
import BlockContent from '@sanity/block-content-to-react';
import sanityClient from '../client';

import ProductModal from "./ProductModal";
import Close from '../Assets/Close.svg'
import Arrow from '../Assets/Arrow.svg';

import '../Styles/Home.css'

export default () => {
	const { featured } = useShopify()
	const [translate, setTranslate] = useState(0)
	const [index, setIndex] = useState(null)
	const [prodModal, setProdModal] = useState(false)
	const [rowWidth, setRowWidth] = useState()
	const [count, setCount] = useState(0)
	const window = document.documentElement.clientWidth 
	const prodLength = featured && featured.length
	const [videoData, setVideoData] = useState()
	const [videoDataMobile, setVideoDataMobile] = useState()
	const [modalIndex, setModalIndex] = useState()
	const [missionCartInfo, setMissionCartInfo] = useState()
	const isEven =  prodLength % 2 == 0 ? -38 : -34
	const [galleryImage, setGalleryImage] = useState()

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

		setGalleryImage()
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
		const indexStart = Math.trunc(featured.length / 2) 
		const halfIndex = 100 / featured.length
		if (featured[1] !== undefined) {
			setIndex(indexStart)
			setRowWidth(halfIndex)
			ReactGa.initialize('UA-211860604-30')
			ReactGa.pageview(`/home`)
		}
		setTranslate(0)
	},[featured])

	useEffect(()=> {
		if(prodModal) {
			if(prodModal){
				ReactGa.initialize('UA-211860604-30')
				ReactGa.pageview(`/home/${featured[index].title}`)
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

	useEffect(() => {
	const indexStart = Math.trunc(featured.length / 2) 
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
		const amount = featured.length - 1
		if (index >= amount) {
			setTranslate(translate)
			setIndex(amount)
		} else {
			setIndex(index + 1)
			setCount(count - 1)
		}
	}

	return (
		// overflowY: `${window.innerWidth < 700 ? "scroll" : "none" }`
		<Container style={{ position: "fixed", height: "100vh", width: "100vw" }}>
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
					<h1 className="prod-title-text" >{featured[index] !== undefined ? featured[index].title : ""}</h1>
				</Col>
			</Row>
			<Row style={{ opacity: `${prodModal ? "0" : "1"}` }} className="d-xs-none d-md-none d-none d-lg-block d-md-block">
				<Col lg={{ offset: 7, span: 3 }} xs={{ offset: 6, span: 3 }} className="prod-price" style={{ marginTop: `${window > 600 ? "72vh" : "60vh"}` }}>
					<h1 className="prod-price-text">{`$${featured[index] !== undefined ? featured[index].variants[0].price : ""}*`}</h1>
				</Col>
			</Row>
			{prodModal ?
					<div style={{ width: "100vw", height: "100vh", position: "fixed", marginLeft: "-15px", zIndex: "25" }}>
						<img 
							style={{ backgroundColor: "#DDDDDD" }}
							src={Close} alt="close modal window" 
							className="close-product-modal"
							onClick={() => setProdModal(false)}
						/>
						<ProductModal index={index} modalIndex={modalIndex} />
					</div>
				:
				<span></span>
			}
			<div style={{ height: "100%", overflow: "scroll", width: 'yarn sta' }} className='d-block d-md-none'>
				<div className="grid-wrapper" style={{ marginTop: "15vh", paddingBottom: "5vh" }}>
						{featured && 
							featured.map((product, i) => {
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
			<animated.div 
				className="Product-wrapper d-xs-none d-md-none d-none d-lg-block d-md-block" 
				style={{ 
					transform: `translateX(${isEven + translate}%)`, 
					width: `${18 * 19}vw`,
					marginTop: `${window > 600 ? "30vh" : "40vh"}`,
					opacity: `${prodModal ? "0" : "1"}`
				}}
			>
				{featured &&
					featured.map((product, i) => {
						const image = product.images[0]
						return (
							<div 
								className='home-prod-row' key={i} style={{ width: `${rowWidth && rowWidth}%` }} 
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
			{prodModal && videoData[index + 1] !== undefined  && window > 600 ? 
				<div 
					alt="background Video" 
					className="home-bg-vid"
					style={{ 
						backgroundImage: `url(${videoData[(modalIndex + 1)] !== null ? videoData[(modalIndex + 1)].backgroundGif.asset.url : videoData[0].backgroundGif.asset.url})`, 
						// overflow: "none",
						opacity: prodModal ? 0.8 : 0,
						// transition: "opacity 4s",
						// transitionDelay: "2s"
					 }}
				>
				</div>
				:
				<div 
					alt="background Video" 
					className="home-bg-vid"
					style={{ 
						backgroundImage: `url(${window > 600 ? videoData && videoData[0].backgroundGif.asset.url : ""})`, 
						// overflow: "none",
					}}
				>
				</div>
			}
			{prodModal && videoDataMobile[index + 1] !== undefined  && window < 600 ? 
				<div 
					alt="background Video" 
					className="home-bg-vid"
					style={{ 
						backgroundImage: `url(${videoDataMobile[(modalIndex + 1)] !== null ? videoDataMobile[(modalIndex + 1)].backgroundGifMobile.asset.url : videoDataMobile[0].backgroundGifMobile.asset.url})`, 
						// overflow: "none",
					}}
				>
				</div>
				:
				<div 
					alt="background Video" 
					className="home-bg-vid"
					style={{ 
						backgroundImage: `url(${window < 600 ? videoDataMobile && videoDataMobile[0].backgroundGifMobile.asset.url : "" })`, 
						// overflow: "none",

					}}
				>
				</div>
			}
		</Container>
	)
}
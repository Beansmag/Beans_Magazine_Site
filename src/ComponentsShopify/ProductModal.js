import React, { useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap'
import { useShopify } from "../hooks";
import ReactGA from 'react-ga';

import DropDownArrow from '../Assets/dropDownArrow.svg'

import "../Styles/productModal.css"
import clamp from 'lodash.clamp';

export default (props) => {
    const {
        // products,
		featured,
		fetchProduct,
		openCart,
		checkoutState,
		addVariant,
	} = useShopify()

	useEffect(() => {
		ReactGA.initialize('UA-211860604-30');
		setSoldOut(featured[props.modalIndex].variants[0].available)
	},[])

    const id = featured[props.modalIndex] !== undefined ? featured[props.modalIndex].id : "...Loading"
    const defaultSize = featured[props.modalIndex] !== undefined ? featured[props.modalIndex].variants[0].id.toString() : "...Loading"
    const [size, setSize] = useState("")
	const [quantity, setQuantity] = useState(1)
	const [imageIndex, setImageIndex ] = useState(0)
	const [soldOut, setSoldOut] = useState()
	const [dropDownMenu, setdropDownMenu] = useState(false);
	const [sizeTitle, setSizeTitle] = useState("");
	const [rotate, setRotate] = useState();
    const description = featured[props.modalIndex] !== undefined ? featured[props.modalIndex].description.split(".") : "...Loading"
	// const item = featured[props.modalIndex].availableForSale


	// console.log(featured[props.modalIndex])

    function changeSize(sizeId, quantity) {
		openCart()
		if (sizeId === "") {
			sizeId = defaultSize
			const lineItemsToAdd = [
				{ variantId: sizeId, quantity: parseInt(quantity, 10) },
			]
			const checkoutId = checkoutState.id
			addVariant(checkoutId, lineItemsToAdd)
		} else {
			const lineItemsToAdd = [
				{ variantId: sizeId, quantity: parseInt(quantity, 10) },
			]
			const checkoutId = checkoutState.id
			addVariant(checkoutId, lineItemsToAdd)
		}
	}

	useEffect(() => {
		if (id !== "...Loading"){
			fetchProduct(id)
		}
	}, [id])

	function GAEvent() {
		ReactGA.event({
			category: 'User',
			action: 'Add to Cart',
			label: `${featured[props.modalIndex].title} added to cart`
		  });
	}

	function clickFunction(item, i) {
		if (item.available) {
			setSize(item.id.toString());
			setSizeTitle(item.title);
			setRotate(!rotate);
			setdropDownMenu(!dropDownMenu);
		} else {
			return
		}
	} 

    return (
        <Container className="product-modal-background"  style={{ overflowY: "hidden"}}>
			<Row style={{ height: "100%" }} >
				<Col lg={6} style={{ borderBottom: `${document.documentElement.clientWidth < 600 ? "solid 1px black" : ""}`, minHeight: "250px" }} >
						<div 
							style={{ 
								height: `${featured[props.modalIndex].images.length > 1 ? "70%" : "100%"}`, 
								backgroundImage: `url(${featured[props.modalIndex].images[0] !== undefined ? featured[props.modalIndex].images[imageIndex].src : ""})`,
								backgroundPosition: "center",
								backgroundSize: "contain",
								backgroundRepeat: "no-repeat"
							}}
						>
						</div>
						{ featured[props.modalIndex].images.length > 1 ?
							<div style={{ height: "30%" }}>
							<div 
								style={{ 
									height: "100%", 
									width: `${100 /featured[props.modalIndex].images.length}%`, 
									float: "left",
									backgroundImage: `url(${featured[props.modalIndex].images[0] !== undefined ? featured[props.modalIndex].images[0].src : ""})`,
									backgroundPosition: "center",
									backgroundSize: "contain",
									backgroundRepeat: "no-repeat",
									zIndex: "20"
								}}
								onClick={() => setImageIndex(0)}
							> 
							</div>
							<div 
								style={{ 
									height: "100%", 
									width: `${100 /featured[props.modalIndex].images.length}%`, 
									float: "left",
									backgroundImage: `url(${featured[props.modalIndex].images[1] !== undefined ? featured[props.modalIndex].images[1].src : ""})`,
									backgroundPosition: "center",
									backgroundSize: "contain",
									backgroundRepeat: "no-repeat",
									zIndex: "20"
								}}
								onClick={() => setImageIndex(1)}
							>
							</div>
							<div 
								style={{ 
									height: "100%", 
									width: `${100 /featured[props.modalIndex].images.length}%`, 
									float: "left",
									backgroundImage: `url(${featured[props.modalIndex].images[2] !== undefined ? featured[props.modalIndex].images[2].src : ""})`,
									backgroundPosition: "center",
									backgroundSize: "contain",
									backgroundRepeat: "no-repeat",
									zIndex: "20" 
								}}
								onClick={() => setImageIndex(2)}
							>
							</div>
						</div>
						:
						<span></span>
						}
				</Col>
				<Col lg={6} style={{ borderLeft: `${document.documentElement.clientWidth > 600 ? "solid 1px black" : ""}`, height: `${document.documentElement.clientWidth > 600 ? "100%" : "40%"}` }} >
					<div style={{ height: "70%" }}>
						<h1 className="prod-modal-title" ><mark style={{ backgroundColor: "#DDDDDD" }}>{featured[props.modalIndex] !== undefined ? featured[props.modalIndex].title : "...Loading"}</mark></h1>
						<h1 className="prod-modal-price" ><mark style={{ backgroundColor: "#DDDDDD" }}>{`$${featured[props.modalIndex] !== undefined ? featured[props.modalIndex].variants[0].price : "...Loading"}`}</mark></h1>
						<h5 className="prod-modal-description" ><mark style={{ backgroundColor: "#DDDDDD" }}>{description}</mark></h5>
					</div>
					<div className="Product__info" style={{ padding: "10px" }}>
							<div style={{ width: "100%", position: "relative" }}>
									<div 
										className="style__dropdown" 
										id="prodOptions" 
										onClick={e => {
											setdropDownMenu(!dropDownMenu);
											setRotate(!rotate);
										}}>
										<h4 style={{ fontSize: "clamp(8pt, 3vw, 20pt)", fontWeight: "800" }} >{sizeTitle ? sizeTitle : "Pick a Size"}</h4>
										<img src={DropDownArrow} alt="drop down arrow" style={{ transform: !rotate ? `rotate(0deg)` : `rotate(180deg)` }} className="dropDownArrow"/>
									</div>
									{featured[props.modalIndex] === undefined ?
										"...Loading"
										:
										<div className="style__dropdownDiv" style={{ opacity: dropDownMenu ? 1 : 0, transform: dropDownMenu ? `translateY(-40px) scaleY(1)` : `translateY(-130%) scaleY(0)` }}>	
										{featured[props.modalIndex] &&
											featured[props.modalIndex].variants.map((item, i) => {
												return (
													<li
														onClick={e => {
															clickFunction(item, i)
															setSoldOut(item.available ? true : false)
														}}
														style={{ 
															color: `${item.available ? "black" : "grey" }`,
															cursor: `${item.available ? "pointer" : "not-allowed" }`
														}}												
														key={item.title + i}
													>{`${item.title}`}</li>	
												)
										})}
										</div>
									}
								</div>
						<div>
							<input
								className="quantity"
								type="number"
								min={1}
								value={quantity}
								onChange={(e) => {
									setQuantity(e.target.value)
								}}
							></input>
						</div>
						<div style={{ width: "100%", textAlign: "center"}}>

						{soldOut ?
							<button
								className="prodBuy button"
								onClick={e => {
									changeSize(size, quantity)
									GAEvent()
								}}
							>
								ADD TO CART
							</button>
							:
							<button
								className="prodBuy button"
								style={{ background: "grey", fontSize: "15px" }}
							>
								SIZE NOT AVAILABLE
							</button>
						}
						</div>
					</div>
				</Col>      
			</Row> 
        </Container>
    )
}
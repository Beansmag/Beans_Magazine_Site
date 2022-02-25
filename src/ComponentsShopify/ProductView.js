import React, { useEffect, useState } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { useShopify } from "../hooks";
import Navbar from '../Components/Navigation/Navbar'

import background from '../Assets/Wall-01min.png'
import Arrow from '../Assets/imgArrow.svg'

export default (props) => {
	const {
		product,
		fetchProduct,
		openCart,
		checkoutState,
		addVariant,
	} = useShopify()
	const id = props.match.params.productId
	const defaultSize = product.variants && product.variants[0].id.toString()
	const [size, setSize] = useState("")
	const [quantity, setQuantity] = useState(1)
	const [ imageIndex, setImageIndex ] = useState(0)

	const [sizeTitle, setSizeTitle] = useState("")
	const [sizeClicked, setSizeClicked] = useState(false)

	const description = product.description && product.description.split(".")
	const imgIndexLength = product.images && product.images.length - 1

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

	function clickFunction(item, i) {
		if (item.available) {
			setSize(item.id.toString());
			setSizeTitle(item.title);
			setSizeClicked(true)
		} else {
			return setSizeClicked(false)
		}
	}

	useEffect(() => {
		fetchProduct(id)
	}, [id])

	function handleClickRight() {
		if(imageIndex < imgIndexLength) {
			setImageIndex(imageIndex + 1)
		} else {
			setImageIndex(0)
		}
	}

	function handleClickLeft() {
		if(imageIndex !== 0){
			setImageIndex(imageIndex - 1)
		} else {
			setImageIndex(imgIndexLength)
		}
	}

	return (
		<div>
		<Navbar />
		<Container fluid id="individualProduct" style={{ backgroundImage: `url(${background})` }}>
			<Row>
				<Col 
					className="prod-image-container"
					lg={{ span: 5, offset: 1 }}
					md={{ span: 10, offset: 1 }}
				>
					<div 
						className="prod-img-div"
						style={{ 
							backgroundImage: `url(${product.images && product.images[imageIndex].src})`
						}}
						alt={`${product.title} product shot`}
					>
					</div>
						<div className="column">
							<img 
								onClick={() => handleClickRight()}
								src={Arrow} 
								alt="View previous image to the left"
								className="prod-arrow"
								style={{ width: "50%", transform: "rotate(180deg)" }}
							/>
						</div>
						<div className="column">
							<img 
								onClick={() => handleClickLeft()}
								src={Arrow} 
								style={{ width: "50%" }}
								alt="View previous image to the left"
								className="prod-arrow"
						/>	
						</div>
				</Col>
				<Col 
					className="prod-info-contianer" 
					lg={{ span: 5, offset: 0 }}
					md={{ span: 10, offset: 1 }}
				>
					<h2 className="Product__sectionHeader">{product.title}</h2>
					<h3 className="Product__price">
						${product.variants && product.variants[0].price}
					</h3>
					<div style={{ width: "50%", float: "left" }}>
						<h2 className="subhead_prod" >SIZE</h2>
							<div className="prodQuantity-container" >
								<ul className="prod-ul">
									{product.variants &&
										product.variants.map((item, i) => {
											return (
												<li
													className="prod-li"
													// style={{ width: `${item.length}` }}
													onClick={e => {
														clickFunction(item, i)
													}}
													key={item.title + i}
												>
													<a 
														style={{ 
															backgroundColor: `${i % 2 === 0 ? "" : "#FFE6E6"}`, 
															borderRadius: "8px",
															color: `${item.available ? "red" : "grey" }`,
															cursor: `${item.available ? "pointer" : "not-allowed" }`,
															WebkitTextStrokeWidth: `${item.title === sizeTitle ? "1px" : "0px" }`,
														}}
														className="prod-a"
													>
														{`${item.title}`}
													</a>
												</li>	
											)
									})}

								</ul>
							</div>
					</div>
					<div style={{ width: "50%", float: "right" }}>
						<h2 className="subhead_prod">QUANTITY</h2>
						<div>
							<div className="prodQuantity-container">
								{ quantity > 1 ?
										<button
											className="prodQuantity-update"
											onClick={() =>
												setQuantity(quantity - 1)
									}
										>
											-
										</button> :
										<button
											className="prodQuantity-update"
										>
											-
										</button>
									}
										<span className="prodQuantity">
											{quantity}
										</span>
										<button
											className="prodQuantity-update"
											onClick={() =>
												setQuantity(quantity + 1)
									}
										>
											+
										</button>
									</div>
							</div>
					</div>
					<div>
						{product.availableForSale ?
							<button
								className="prodBuyButton"
								onClick={(e) => changeSize(size, quantity)}
							>
								Add to Cart
							</button> :
							<button
								className="prodBuyButtonSold"
							>
								Sold Out
							</button>
						}
					</div>
					<div>
						<ul className="Product__description">
							{description &&
								description.map((each, i) => {
									return <li style={{ left: "-15px"}} key={`line-description +${i}`}>{each}</li>
								})}
						</ul>
					</div>
				</Col>
			</Row>
		</Container>
	</div>
	)
}
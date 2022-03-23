import React, { useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap'
import { useShopify } from "../hooks";
import ReactGA from 'react-ga';

import "../Styles/productModal.css"

export default (props) => {
    const {
        products,
		featured,
		fetchProduct,
		openCart,
		checkoutState,
		addVariant,
	} = useShopify()

	useEffect(() => {
		ReactGA.initialize('UA-211860604-30');
	},[])

    const id = featured[props.index] !== undefined ? featured[props.index].id : "...Loading"
    const defaultSize = featured[props.index] !== undefined ? featured[props.index].variants[0].id.toString() : "...Loading"
    const [size, setSize] = useState("")
	const [quantity, setQuantity] = useState(1)
	const [imageIndex, setImageIndex ] = useState(0)
    const description = featured[props.index] !== undefined ? featured[props.index].description.split(".") : "...Loading"

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
			label: `${featured[props.index].title} added to cart`
		  });
	}

    return (
        <Container className="product-modal-background" >
			<Row style={{ height: "100%" }} >
				<Col lg={6} style={{ borderBottom: `${document.documentElement.clientWidth < 600 ? "solid 1px black" : ""}` }}>
					<div style={{ display: 'table', content: "", position: "relative" }} >
						<img 
							src={featured[props.index].images[0] !== undefined ? featured[props.index].images[imageIndex].src : ""}
							alt={`${featured[props.index] !== undefined ? featured[props.index].images[imageIndex].src : "...Loading"}`}
							className="prod-modal-product-image"
							style={{ 
								width: `${document.documentElement.clientWidth > 600 ? "87%" : "55%"}`,
								marginBottom: `${featured[props.index].images.length === 1 ? "-40%" : ""}`,
								marginTop: `${featured[props.index].images.length === 1 ? "8%" : ""}`
							}}
						/> 
					{ featured[props.index].images.length > 1 ?
						<div  >
							<img 
									src={featured[props.index].images[0] !== undefined ? featured[props.index].images[0].src : ""}
									alt={`${featured[props.index].images[0] !== undefined ? featured[props.index].images[0].src : ""}`}
									className="prod-modal-product-image-below"
									onClick={() => setImageIndex(0)}
									style={{ width: `${document.documentElement.clientWidth > 600 ? "33.33%" : "20%"}` }}
								/> 
							<img 
									src={featured[props.index].images[1] !== undefined ? featured[props.index].images[1].src : ""}
									alt={`${featured[props.index].images[1] !== undefined ? featured[props.index].images[1].src : ""}`}
									className="prod-modal-product-image-below"
									onClick={() => setImageIndex(1)}
									style={{ width: `${document.documentElement.clientWidth > 600 ? "33.33%" : "20%"}` }}
								/> 
							<img 
									src={featured[props.index].images[2] !== undefined ? featured[props.index].images[2].src : ""}
									alt={`${featured[props.index].images[2] !== undefined ? featured[props.index].images[2].src : ""}`}
									className="prod-modal-product-image-below"
									onClick={() => setImageIndex(2)}
									style={{ width: `${document.documentElement.clientWidth > 600 ? "33.33%" : "20%"}` }}
								/> 
						</div>
						:
						<span></span>
					}
					</div>
				</Col>
				<Col lg={6} style={{ borderLeft: `${document.documentElement.clientWidth > 600 ? "solid 1px black" : ""}`, height: `${document.documentElement.clientWidth > 600 ? "100%" : "40%"}` }} >
					<div style={{ height: "70%" }}>
						<h1 className="prod-modal-title" >{featured[props.index] !== undefined ? featured[props.index].title : "...Loading"}</h1>
						<h1 className="prod-modal-price" >{`$${featured[props.index] !== undefined ? featured[props.index].variants[0].price : "...Loading"}`}</h1>
						<h5 className="prod-modal-description" >{description}</h5>
					</div>
					<div className="Product__info" style={{ padding: "10px" }}>
						<div style={{ marginBottom: "0px" }}>
							<select
								id="prodOptions"
								name={size}
								onChange={(e) => {
									setSize(e.target.value)
								}}
							>	
								{featured[props.index] === undefined ?
									"...Loading"
									:
									featured[props.index].variants.map((item, i) => {
										return (
											<option
											value={item.id.toString()}
											key={item.title + i}
										>{`${item.title}`}</option>
										)
									})
								}
							</select>
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
							<button
								className="prodBuy button"
								onClick={e => {
									changeSize(size, quantity)
									GAEvent()
								}}
							>
								ADD TO CART
							</button>
						</div>
					</div>
				</Col>      
			</Row> 
        </Container>
    )
}
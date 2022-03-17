import React, { useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap'
import { useShopify } from "../hooks";

import "../Styles/productModal.css"

export default (props) => {

    const {
        products,
		product,
		fetchProduct,
		openCart,
		checkoutState,
		addVariant,
	} = useShopify()

    // const id = props.match.params.productId
    const id = products[props.index] !== undefined ? products[props.index].id : "...Loading"
    const defaultSize = products[props.index] !== undefined ? products[props.index].variants[0].id.toString() : "...Loading"
    const [size, setSize] = useState("")
	const [quantity, setQuantity] = useState(1)
    const description = products[props.index] !== undefined ? products[props.index].description.split(".") : "...Loading"

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

    return (
        <Container className="product-modal-background" >
			<Row>
				<Col lg={6} style={{ borderBottom: `${document.documentElement.clientWidth < 600 ? "solid 1px black" : ""}`, height: "100%", background: "red" }}>
					<img 
						src={products[props.index] !== undefined ? products[props.index].images[0].src : "...Loading"}
						alt={`${products[props.index] !== undefined ? products[props.index].images[0].src : "...Loading"} product image`}
						className="prod-modal-product-image"
						/> 
				</Col>
				<Col lg={6} style={{ borderLeft: `${document.documentElement.clientWidth > 600 ? "solid 1px black" : ""}`, height: "100%", background: "red" }}>
					<h1 className="prod-modal-title" >{products[props.index] !== undefined ? products[props.index].title : "...Loading"}</h1>
					<h1 className="prod-modal-price" >{`$${products[props.index] !== undefined ? products[props.index].variants[0].price : "...Loading"}`}</h1>
					<h5 className="prod-modal-description" >{description}</h5>
					<div className="Product__info">
						<div>
							<select
								id="prodOptions"
								name={size}
								onChange={(e) => {
									setSize(e.target.value)
								}}
							>	
								{products[props.index] === undefined ?
									"...Loading"
									:
									products[props.index].variants.map((item, i) => {
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
					</div>
					<div style={{ width: "100%", textAlign: "center"}}>
						<button
							className="prodBuy button"
							onClick={(e) => changeSize(size, quantity)}
						>
							ADD TO CART
						</button>
					</div>
				</Col>      
			</Row> 
			{/* 
            <h6>{defaultSize}</h6>
			<h6>{products[props.index] !== undefined ? products[props.index].title : "...Loading"}</h6>
			<div className="Product-wrapper2">
				<div className="Images">
				<div className="Product__info">
					<div>
						<label htmlFor={"prodOptions"}>Size</label>
						<select
							id="prodOptions"
							name={size}
							onChange={(e) => {
								setSize(e.target.value)
							}}
						>	
							{products[props.index] === undefined ?
								"...Loading"
								:
								products[props.index].variants.map((item, i) => {
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
						<label>Quantity</label>
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

					<h3 className="Product__price">
						${products[props.index] === undefined ? "...Loading" : products[props.index].variants[0].price}
					</h3>
					<button
						className="prodBuy button"
						onClick={(e) => changeSize(size, quantity)}
					>
						Add to Cart
					</button>
					
					</div>
				</div>
			</div> */}
        </Container>
    )
}
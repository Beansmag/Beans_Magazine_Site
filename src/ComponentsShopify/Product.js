import React, { useState } from "react"
import { Container, Col, Row } from "react-bootstrap"
import { useShopify } from "../hooks"
import Navbar from '../Components/Navigation/Navbar'

export default (props) => {
	const { products, fetchProduct } = useShopify()
	const [hover, setHover] = useState(false)

	function handleClick(e, product_id) {
		e.preventDefault()
		const id = product_id
		fetchProduct(id).then((res) => {
			props.history.push(`/commissary/${res.id}`)
		})
	}

	return (
		<div>
		<Navbar />
		<Container className="Product-wrapper">
			{products &&
				products.map((product, i) => {
					const image = product.images[0]
						const dynamicImage = () => {
							const id = product.id
							if (hover === id) {
							return	<img
										src={product.images[1] ? product.images[1].src : product.images[0].src}
										alt={`${product.title} product shot`}
										onPointerOver={() => setHover(product.id)}
										onPointerOut={() => setHover("out")}
										className="image" 
							  		/>
							} else {
							  if (hover === "out") { 
							  		return <img
									  src={product.images[0].src}
									  alt={`${product.title} product shot`} 
									  onPointerOver={() => setHover(product.id)}
									  onPointerOut={() => setHover("out")}
									  className="image" 
									/>
							}} return <img
											src={product.images[0].src}
											alt={`${product.title} product shot`}
											onPointerOver={() => setHover(product.id)}
											onPointerOut={() => setHover("out")}
											className="image" 
						  			/>
						  }
					return (
						<div 
							className="Product" 
							key={product.id + i}
							// onClick={(e) => handleClick(e, product.id)}
						>
							{image ? (
									<div className="product-image">
										{dynamicImage()}
									</div>
								) : null}
							<Row>
								<Col >
									<h2 className="prod-title-item" >ITEM #</h2>
								</Col>
								<Col>
									<h2 className="prod-title-price">PRICE</h2>								
								</Col>
							</Row>
							<Row>
								<Col >
									<h4 className="Product__title">{product.title}</h4>
								</Col>
								<Col >
									<p className="product_list_price">${product.variants[0].price}</p>						
								</Col>
							</Row>
							<button
								className="Product__buy button"
								onClick={(e) => handleClick(e, product.id)}
							>
								{product.availableForSale ? "View Product" : "Sold Out"}
							</button>
						</div>
					)
				})}
		</Container>
	</div>
	)
}
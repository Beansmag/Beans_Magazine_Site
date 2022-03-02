import React, { useState, useEffect } from "react"
import { useShopify } from "../hooks"

import ProductModal from "./ProductModal"

export default (props) => {
	const { products, fetchProduct } = useShopify()
	const [translate, setTranslate] = useState(0)
	const [index, setIndex] = useState(null)
	const [imgHeight, setImgHeight] = useState()
	const [prodModal, setProdModal] = useState(false)

	useEffect(() => {
		//Sets the initial value of index which is half the length of amount of products
		const indexStart = Math.trunc(products.length / 2) - 1 
		if (products[1] !== undefined) {
			setIndex(indexStart)
			setImgHeight(Math.floor(Math.random() * 10))
		}
	},[products])

	function clickLeft() {
		if (index <= 0) {
			setTranslate(translate)
			setIndex(0)
		} else {
			setIndex(index - 1)
			setTranslate(translate + 5)
		}
	}

	function clickRight() {
		const amount = products.length - 1
		if (index >= amount) {
			setTranslate(translate)
			setIndex(amount)
		} else {
			setIndex(index + 1)
			setTranslate(translate - 5)
		}
	}

	function handleClick(e, product_id) {
		e.preventDefault()
		const id = product_id
		fetchProduct(id).then((res) => {
			props.history.push(`/${res.id}`)
		})
	}

	return (
		<div>
			<div style={{ position: "fixed", zIndex: "9" }}>
				<button onClick={() => clickLeft()}>
					Left
				</button>
				<button onClick={() => clickRight()}>
					Right
				</button>
			</div>
			<div style={{ position: "fixed", zIndex: "9", marginTop: "20px" }}>
				<h1>{products[index] !== undefined ? products[index].title : "...Loading"}</h1>
			</div>
			<div style={{ position: "fixed", zIndex: "9", marginTop: "60px" }}>
				<h1>{products[index] !== undefined ? products[index].variants[0].price : "...Loading"}</h1>
			</div>
			<div style={{ position: "fixed", zIndex: "9", marginTop: "90px" }}>
				{/* <button onClick={(e) => handleClick(e, products[index].id)}>View item of clothing</button> */}
				<button onClick={() => setProdModal(!prodModal)}>View item of clothing</button>
			</div>
			<div style={{ position: "fixed", zIndex: "9", marginTop: "200px", transform: `${prodModal ? "translateX(0vw)" : "translateX(100vw)"}` }}>
				<ProductModal index={index} />
			</div>
			<div className="Product-wrapper" style={{width: "500vw", transform: `translateX(${-38 + translate}%)` }} >
					{products &&
					products.map((product, i) => {
						const image = product.images[0]
						return (
							<div className='home-prod-row' key={i} style={{ width: `${100 / products.length}`}}>
									{image ? (
										<img src={image.src} alt={`${product.title} product shot`} className="home-prod-img"
											style={{ marginTop: `${ Math.floor(Math.random() * 10)}0px` }}
										/>
									) : null}
							</div>
						)
					})
					}
			</div>
		</div>
	)
}













			{/* {products &&
				products.map((product, i) => {
					const image = product.images[0]
					return (
						<div className="Product" key={product.id + i}>
							{image ? (
								<img src={image.src} alt={`${product.title} product shot`} />
							) : null}
							<div>
								<h4 className="Product__title">{product.title}</h4>
								<p className="Product__price">${product.variants[0].price}</p>
							</div>
							<button
								className="Product__buy button"
								onClick={(e) => handleClick(e, product.id)}
							>
								View Details
							</button>
						</div>
					)
				})} */}